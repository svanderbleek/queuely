const DB = require('db');
const Queue = require('db');
const Events = require('events');

module.exports = class AsyncQueue {
  constructor() {
    this.queue = new Queue(new DB());
    this.timeouts = {};
    this.events = new Events();
    this.events.on('enqueue', enqeue);
    this.events.on('dequeue', deqeue);
    this.events.on('processed', enqeue);
    this.events.on('timeout', timeout);
  }

  enqueue(message) {
    this.queue.enqueue(message);
  }

  dequeue() {
    messages = this.queue.dequeue();
    messages.forEach((message) => {
      timouts[message.id] = setTimeout(() => this.events.emit('timout'));
    });
    return messages;
  }

  processed(message) {
    clearTimeout(this.timeout[message.id]);
    delete this.timeouts[message.id];
    this.queue.processed(message);
  }

  timeout(message) {
    this.queue.timeout(message);
  }
};
