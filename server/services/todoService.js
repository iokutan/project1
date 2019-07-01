
  class ToDoService {
    static create (db, item) {
      return new Promise((resolve, reject) => {
        db.insert(item, (err, doc) => {
          if(err)
            reject(err);
          resolve(doc);
        });
      });
    }

    static delete (db, itemId) {
      return new Promise((resolve, reject) => {
        db.remove({ _id: itemId }, {}, (err, doc) => {
          if(err)
            reject(err);
          resolve(doc);
        });
      });
    }

    static update (db, itemId, item) {
      return new Promise((resolve, reject) => {
        db.update({ _id: itemId }, item, { upsert: true }, (err, doc) => {
          if(err)
            reject(err);
          resolve(doc);
        });
      });
    }

    static findOne (db, itemId) {
      return new Promise((resolve, reject) => {
        db.findOne({ _id: itemId }, (err, doc) => {
          if(err)
            reject(err);
          resolve(doc);
        });
      });
    }

    static findAll (db) {
      return new Promise((resolve, reject) => {
        return db.find({}, (err, doc) => {
          if(err)
            reject(err);
          resolve(doc);
        });
      });
    }
}

module.exports = ToDoService;
