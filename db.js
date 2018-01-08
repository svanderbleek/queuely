module.exports = class Database {
  constructor() {
    this.store = {};
    this.lastId = 0;
  }

  genId() {
    return ++this.lastId;
  }

  write(state) {
    state.id = genId();
    this.store[id] = state;
  }

  update(state) {
    this.store[state.id] = state;
  }

  delete(id) {
    delete this.store[id];
  }

  query(predicate) {
    return Object.values(this.store).filter(predicate);
  }
};
