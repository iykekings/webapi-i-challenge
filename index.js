const express = require('express');
const server = express();
const Users = require('./data/db');
const cors = require('cors');
const PORT = 3000;

server.use(express.json());
server.use(cors());
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
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
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
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

//create user
server.post('/api/users', (req, res) => {
  const user = req.body;
  if (user.name && user.bio) {
    Users.insert(user)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

//delete user
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  let user;
  Users.findById(id)
    .then(data => {
      user = data;
    })
    .catch(error => {
      user = {};
    });
  Users.remove(id)
    .then(data => {
      if (data === 0) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

// update user
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  if (newUser.name && newUser.bio) {
    Users.update(id, newUser)
      .then(data => {
        if (data === 0) {
          res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        } else {
          Users.findById(id)
            .then(data => {
              res.status(201).json(data);
            })
            .catch(error => {
              res
                .status(404)
                .json({ message: "Couldn't retrieve the updated user" });
            });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The user information could not be modified.' });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost/api/users/${PORT}`);
});
