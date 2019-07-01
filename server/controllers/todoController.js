const todoService = require('../services/todoService');

  class ToDoController {
    static create (req, res) {
      console.log(req.body);
      todoService
        .create(req.db, req.body)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json(err));
    }

    static delete (req, res) {
      todoService
        .delete(req.db, req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    }

    static update (req, res) {
      todoService
        .update(req.db, req.params.id, req.body)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    }

    static findOne (req, res) {
      todoService
        .findOne(req.db, req.params.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json(err));
    }

    static findAll (req, res) {

      todoService
        .findAll(req.db)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    }
}

module.exports = ToDoController;
