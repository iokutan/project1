;
(function (win) {

  win.templates = win.templates || {};

  templates.todoList = `
          <ul class="todo-list">
            {{#each todoList}}
              <li class="body">
              <div>
              <p>Due Date: {{duedate}} </p>
              <p>Finished: {{#timeago this}}{{/timeago}}</p>
              <p>
                <div class="stars">{{#blitz importance}}{{/blitz}}</div>
              </p>
              <p>Finished: {{#checkbox this}}{{/checkbox}}</p>
              </div>
              <div>
              <p><strong>Titel: {{fname}} </strong></p>
              <p>Description: {{description}} </p>
              </div>
              <div class="edit-line">
              <input type="button" class="remove-list-item" value="Delete" data-id="{{_id}}">
              <input type="button" class="edit-list-item" value="Edit" data-id="{{_id}}">
              </div>
              </li>
              <li class="edit-form">
                <h2>Edit item</h2>
                <form id="todo-form-{{_id}}" class="add-form">
                  <input type="hidden" name="_id" value="{{_id}}">
                  <input type="text" placeholder="First name" value="{{fname}}" name="fname">
                  <input type="date" placeholder="Due date" value="{{duedate}}" name="duedate">
                  <input type="hidden"  value="{{importance}}" class="importance" name="importance">
                  <div class="stars">
                    {{#blitz importance}}
                    {{/blitz}}
                  </div>
                  <textarea placeholder="Description" rows="5" cols"30" name="description">{{description}}
                  </textarea>
                </form>
              </li>
            {{/each}}
          </ul>
  `;
})(window);
