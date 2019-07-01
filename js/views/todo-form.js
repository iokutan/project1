;
(function (win) {

  win.templates = win.templates || {};

  templates.todoForm = `
    <h2>Add new item</h2>
    <form class="add-form">
      <input type="text" placeholder="Titel" name="fname">
      <input type="date" placeholder="Due date" name="duedate">
      <input type="hidden" class="importance" name="importance">
      <div class="stars"> {{#blitz importance}} {{/blitz}} </div>
      <textarea placeholder="Description" rows="5" cols"30" name="description"></textarea>
    </form>
  `;
})(window);
