;
(function (win) {

  win.templates = win.templates || {};

  templates.main = `
    <div class="main">
      <div class="menu">
        <div class="menu-top">
          <div class="menu-top-left">
            <input type="button" class="add-new-item" value="Add new"/>
          </div>
          <div class="menu-top-right">
            <input type="button" class="change-css-template" value="Change template">
          </div>
        </div>
        <div class="menu-bottom">
          <div class="menu-bottom-left">
            <input type="button" class="sort-by-duedate" value="Sort by finish date">
            <input type="button" class="sort-by-importancy" value="Sort by importancy">
            <input type="button" class="sort-by-creation" value="Sort by creation">
          </div>

          <div class="menu-bottom-right">
            <input type="button" class="filter-by-state" value="Filter completed"/>
          </div>
        </div>

      </div>

      <div class="todo-list-continer"></div>
    </div>

  `;
})(window);
