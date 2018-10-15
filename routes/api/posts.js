const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

// Get posts route
router.get('/', (req, res) => {
  const errors = {};
  errors.noposts = 'There are no posts!';
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      if (posts.length < 1) {
        res.status(404).json(errors);
      }
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json(errors);
    });
});

// Get post route
router.get('/:id', (req, res) => {
  const errors = {};
  errors.nopost = 'Post is not found with that ID';
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(404).json(errors);
      }
      res.json(post);
    })
    .catch(err => {
      res.status(404).json(errors);
    });
});

// Create post route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar
    });

    newPost.save().then(post => res.json(post));
  }
);

//Delete post route
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    errors.notauthorized = 'User is not authorized!';

    Post.findById(req.params.id)
      .then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json(errors);
        }

        // Delete post
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ nopost: 'Post is not found' }));
  }
);

module.exports = router;
