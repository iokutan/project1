;
(function (win) {

  win.handlebar = win.handlebar || {};
  handlebar.renderList = (data = null) => {
    const template = Handlebars.compile(templates.todoList);
    const context = { todoList: data};
    return template(context);
  }

  handlebar.addForm = () => {
    const template = Handlebars.compile(templates.todoForm);
    return template({});
  }

  handlebar.renderMain = (defaultCss = 'light') => {
    const template = Handlebars.compile(templates.main);
    return template({css: defaultCss});
  }

  handlebar.renderStars = (number) => {
    const html = `
        {{#blitz importance}}
                  {{/blitz}}
    `;
    const template = Handlebars.compile(html);
    return template({importance: number});
  }

  Handlebars.registerHelper('blitz', function(context, options) {
    const priority = Number(context || 1);
    const elm = new Array(5).fill(1);
    return elm.map(function(item, i) {
      if(i < priority) {
        return `<img src="./img/fill-star.png" data-id="${i+1}" class="star"/>`;
      }
      return `<img src="./img/no-fill-star.png" data-id="${i+1}" class="star"/>`;
    }).join("");
  });

  Handlebars.registerHelper('checkbox', function(context, options) {
    if(context && context['isFinished']) {
      return `<input type="checkbox" class="change-state-item" name="isFinished" data-id="${context._id}" checked />`;
    }
    return `<input type="checkbox" class="change-state-item" name="isFinished" data-id="${context._id}" />`;
  });

  Handlebars.registerHelper('timeago', function(context, options) {
    if(context && context['finishDate']) {
      return `${timeago.format(context['finishDate'], 'de') }`;
    }
    return `[]`;
  });
})(window);
