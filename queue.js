module.exports = class Queue {
  constructor(db) {
    this.db = db;
  }

  enqueue(message) {
    return this.db.write({
      available: true,
      data: message
    });
  }

  dequeue() {
    available = this.db.query((message) => message.available);
    available.forEach((message) => {
      message.available = false;
      db.update(message);
    });
    return available;
  }

  processed(message) {
    this.db.delete(message.id);
  }

  timeout(message) {
    message.available = true;
    this.db.update(message);
  }
};
