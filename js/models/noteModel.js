class NoteModel{
  constructor(item) {
    this._id = item._id;
    this.fname = item.fname;
    this.duedate = item.duedate;
    this.importance = item.importance;
    this.description = item.description;
    this.created = item.created;
    this.finishDate = item.finishDate;
    this.isFinished = item.isFinished;
  }

  isValid() {
    if(!this.fname || !this.duedate || !this.importance) {
      return false;
    }
    return true;
  }
}
