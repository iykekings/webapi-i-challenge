const server = require('express')();
const Users = require('./data/db');
const PORT = 3000;

//fetch all users from db
server.get('/api/users', (reg, res) => {
  Users.find()
    .then(data => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res.status(404).json('There are no users');
      }
    })
    .catch(err => {
      res.status(500).json(`Error fetching posts: ${err}`);
    });
});

//fetch single user with id

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json('No user with that id');
      }
    })
    .catch(err => {
      res.status(500).json('Error when fetching user');
    });
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost/api/users/${PORT}`);
});
