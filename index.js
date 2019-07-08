const server = require('express')();
const Users = require('./data/db');
const PORT = 3000;

server.get('/api/users', (reg, res) => {
  res.json('Working');
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost/api/users/${PORT}`);
});
