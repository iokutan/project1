;
(function (document, $) {
  // html selectors
  const MODAL = '#swal2-content';
  const APP_LIST_CONTAINER = '.todo-list-continer';


  const mainContainer = {};
  mainContainer.app = $('.app-container');
  mainContainer.isDesc = true;

  mainContainer.filterStates =
      { all: 'all', finished: 'finished', notFinished: 'notFinished'};
  mainContainer.currentfilterState = mainContainer.filterStates.finished;

  mainContainer.events = {
    'add-new-item' : () => mainContainer.openAddModal(),
    'sort-by-duedate': () => mainContainer.sortBy((a) => new Date(a.finishDate)),
    'sort-by-importancy': () => mainContainer.sortBy(a => a.importance),
    'sort-by-creation': () => mainContainer.sortBy((a) => new Date(a.created)),
    'filter-by-state': () => mainContainer.filterByState(),
    'change-css-template': () => mainContainer.changeCSS(),
    'remove-list-item': (e) => mainContainer.removeListContainer(e),
    'edit-list-item': (e) => mainContainer.editListItem(e),
    'change-state-item': (e) => mainContainer.changeStateItem(e)
  };

  mainContainer.render = async (list = null) => {
    if(!list) {
      list = await todoService.findAll();
      mainContainer.items = list.map(note => new NoteModel(note));
    }

    const listHtml = handlebar.renderList(list);
    mainContainer.app.find(APP_LIST_CONTAINER).html(listHtml);
  }

  mainContainer.init = async() => {
    mainContainer.app.html(handlebar.renderMain());
    mainContainer.registerListeners();
    await mainContainer.render();
  }

  mainContainer.add = async (item) => {
    if(mainContainer.validate(item)) {
      item.created = new Date();
      await todoService.save(item);
      mainContainer.render();
    } else {
      sweetalert.error('Please fill out all the fields!')
    }
  }

  mainContainer.validate = (item) => {
    var model = new NoteModel(item);
    return model.isValid();
  }

  mainContainer.sort = async (sortBy) => {
    mainContainer.items = mainContainer.items.sort(sortBy);
    mainContainer.render(mainContainer.items);
  }

  mainContainer.registerListeners = () => {
    mainContainer.listeners();
    mainContainer.setStarListeners();
  }

  mainContainer.setStarListeners = () => {
    $('body').unbind('click').click((e) => {
      const target = Array.from(e.target.classList);
      switch(target[0]) {
        case 'star':
          const value = $(e.target).data('id');
          const template = handlebar.renderStars(value);
          $(MODAL).find('form').find('.stars').html(template);
          $(MODAL).find('form .importance').val(value);
        break;
      }
    });
  }

  mainContainer.listeners = () => {
    mainContainer.app.click((e) => {
      const target = Array.from(e.target.classList);
      mainContainer.isDesc = !mainContainer.isDesc;

      if(target[0] && mainContainer.events[target[0]]) {
        mainContainer.events[target[0]](e);

        Object.keys(mainContainer.events)
              .forEach(item => $(`.${item}`).removeClass('active'));

        $(e.target).addClass('active');
      }
    });
  }

  mainContainer.changeCSS = () => {
    $('.main').toggleClass('dark');
  }

  mainContainer.sortBy = (sort) => {
    mainContainer.sort((a,b) => {
      const x = sort(a);
      const y = sort(b);
      return mainContainer.isDesc ? x - y : y - x;
    });
  }

  mainContainer.filterByState = () => {

    const data = mainContainer.items
                              .filter(a => mainContainer.isDesc ? a.isFinished : true);

    mainContainer
      .app
      .find(APP_LIST_CONTAINER)
      .html(handlebar.renderList(data));
  }

  mainContainer.openAddModal = () => {
    const form = handlebar.addForm();
    sweetalert.showContent(form).then(confirmationResult => {
      if(confirmationResult) {
        const elm = {};
        const data = $(MODAL).find('form').serializeArray();
        data.forEach(item => (elm[item.name] = item.value));

        elm['isFinished'] = elm['isFinished'] ? true : false;

        mainContainer.add(elm);
      }
    });
  }

  mainContainer.removeListContainer = async (e) => {
    sweetalert.confirm().then(async confirmResult => {
      if(confirmResult) {
        const idToDelete = $(e.target).data('id');
        await todoService.delete(idToDelete);
        mainContainer.render();
        sweetalert.success('item has been deleted!');
      }
    });
  }

  mainContainer.editListItem = (e) => {
    const form = $(e.target).parent().parent().next().html();

    sweetalert.showContent(form).then(async confirmationResult => {
      if(confirmationResult) {
        const elm = {};
        const data = $(MODAL).find('form').serializeArray();
        data.forEach(item => (elm[item.name] = item.value));

        elm['isFinished'] = elm['isFinished'] ? true : false;
        elm._id = $(e.target).data('id');

        if(mainContainer.validate(elm)) {
          await todoService.update(elm);
          await mainContainer.render();
        } else {
          sweetalert.error('Please fill out all the fields!')
        }
      }
    })
  }

  mainContainer.changeStateItem = async (e) => {
    const itemId = $(e.target).data('id');
    const item = await todoService.findOne(itemId);
    item.isFinished = !item['isFinished'];
    if(item.isFinished === true) {
      item.finishDate = new Date();
    }

    await todoService.update(item);
    await mainContainer.render();
  }

  mainContainer.init();

})(document, jQuery);
