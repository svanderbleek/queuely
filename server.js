const http = require('http');
const url = require('url');
const Queue = require('async-queue');

const queue = Queue.new();


const server = http.createServer((request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    handle(request.url, body, response);
  });
});

function handle(path, body, response) {
  if(path.match(/enqueue/)) {
    queue.emit('enqueue', response, body);
  } else if(path.match(/dequeue/)) {
    queue.emit('dequeue', response);
  } else if(path.match(/info/)) {
    queue.emit('info', response);
  }
}

server.listen(666);
