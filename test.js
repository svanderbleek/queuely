assert = require('assert');
AsyncQueue = require('./async-queue');
http = require('http');

// util

function body(response) {
  return response.output[0].split('\n').slice(-1)[0];
}

Array.prototype.last = function() {
  return this.slice(-1)[0];
};

const queue = new AsyncQueue();

const message = {a: 1};

// enqueue

const enqueueResponse = new http.ServerResponse({method: ''});

queue.emit('enqueue', message, response);

assert('1' === body(response));

// dequeue

const dequeueResponse = new http.ServerResponse({method: ''});

queue.emit('dequeue', message, response);

assert(JSON.stringify(message) === body(response));
