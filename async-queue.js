const DB = require('db');
const Queue = require('db');
const Events = require('events');

module.exports = class AsyncQueue extends Events {
  constructor() {
    this.queue = new Queue(new DB());
    this.timeouts = {};
    this.on('enqueue', enqeue);
    this.on('dequeue', deqeue);
    this.on('processed', enqeue);
    this.on('timeout', timeout);
  }

  enqueue(response, body) {
    const id = this.queue.enqueue(message);
    response.write(JSON.stringify(id));
    response.end();
  }

  dequeue(response) {
    messages = this.queue.dequeue();
    messages.forEach((message) => {
      timeouts[message.id] = setTimeout(function() {
        this.clearTimeout(message);
        this.queue.timeout(message);
      });
    });
    response.write(JSON.stringify(messages));
    response.end();
  }

  processed(message) {
    this.clearTimeout(message);
    this.queue.processed(message);
    response.end();
  }

  clearTimeout(message) {
    clearTimeout(this.timeout[message.id]);
    delete this.timeouts[message.id];
  }
};
