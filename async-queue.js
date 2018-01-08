const DB = require('./db');
const Queue = require('./queue');
const Events = require('events');

module.exports = class AsyncQueue extends Events {
  constructor() {
    super();
    this.queue = new Queue(new DB());
    this.timeouts = {};
    this.on('enqueue', this.enqeue);
    this.on('dequeue', this.deqeue);
    this.on('processed', this.processed);
    this.on('timeout', this.timeout);
  }

  enqueue(response, body) {
    const id = this.queue.enqueue(JSON.parse(body));
    response.end(JSON.stringify(id));
  }

  dequeue(response) {
    messages = this.queue.dequeue();
    messages.forEach((message) => {
      timeouts[message.id] = setTimeout(this.timeout);
    });
    response.end(JSON.stringify(messages));
  }

  processed(message) {
    this.clearTimeout(message);
    this.queue.processed(message);
    response.end();
  }

  timeout(message) {
    this.clearTimeout(message);
    this.queue.timeout(message);
  }

  clearTimeout(message) {
    clearTimeout(this.timeout[message.id]);
    delete this.timeouts[message.id];
  }
};
