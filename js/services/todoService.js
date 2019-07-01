let todoService;
;
(function (win, $) {

  class ToDoService {

    static getBaseUrl(){
      return 'http://localhost:3000/todo';
    }

    static async save(item) {
      if(item) {
        const response = await fetch(ToDoService.getBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(item)
        })
        return await response.json();
      }
    }

    static saveAll(items) {
      if(items && typeof items === 'object') {
        const converted = storage.convertToString(items)
        localStorage.setItem(storage.name, converted);
      }
    }

    static async update(elm) {
      if(elm && elm._id) {
        const response = await fetch(`${ToDoService.getBaseUrl()}/${elm._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(elm)
        })
        return await response.json();
      }
    }

    static async delete(id) {
      if(id) {
        const response = await fetch(`${ToDoService.getBaseUrl()}/${id}`, { method: 'DELETE'});
        return await response.json();
      }
    }

    static async findAll(){
      try {
        const response = await fetch(ToDoService.getBaseUrl());
        return await response.json();
      } catch (error) {
        throw error;
      }
    }

    static async findOne (id) {
      const response = await fetch(`${ToDoService.getBaseUrl()}/${id}`);
      return await response.json();
    }
  }

  todoService = ToDoService;
})(window, jQuery);
