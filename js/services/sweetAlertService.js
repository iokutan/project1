;
(function (win, $) {

  win.sweetalert = win.sweetalert || {};
  sweetalert.config = {
    title: 'Succesfull',
    animation: false,
    position: 'top-end',
    type: 'success',
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'animated tada'
    }
  }

  sweetalert.success = (text) => {
    sweetalert.config.title = text;
    sweetalert.config.type = 'success';
    Swal.fire(sweetalert.config)
  }

  sweetalert.error = (text) => {
    sweetalert.config.title = text;
    sweetalert.config.type = 'error';
    Swal.fire(sweetalert.config)
  }

  sweetalert.error = (text) => {
    sweetalert.config.title = text;
    sweetalert.config.type = 'info';
    Swal.fire(sweetalert.config)
  }

  sweetalert.showContent = (html) => {
    return Swal.fire({
            html: html,
            showCloseButton: false,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              // check if form is valid
              // validity rules are defined in NoteModel class by isValid method
              const content = Swal.getContent();
              const elm = {};
              const serializedObject = $(content).find('form').serializeArray();
              serializedObject.forEach(item => (elm[item.name] = item.value));
              return new NoteModel(elm).isValid();
            }
          });
  }

  sweetalert.confirm = () => {
    return Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => result.value)
  }

})(window, jQuery);
