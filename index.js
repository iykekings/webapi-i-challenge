const express = require('express');
const server = express();
const Users = require('./data/db');
const PORT = 3000;

server.use(express.json());
//fetch all users from db
server.get('/api/users', (req, res) => {
  Users.find()
    .then(data => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res.status(404).json('There are no users');
      }
    })
    .catch(err => {
      res.status(500).json(`Error while fetching posts: ${err}`);
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
      res.status(500).json('Error while fetching user');
    });
});

//create user
server.post('/api/users', (req, res) => {
  const user = req.body;
  Users.insert(user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json('Error while creating user');
    });
});

//delete user
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json('Error while deleting user');
    });
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost/api/users/${PORT}`);
});
