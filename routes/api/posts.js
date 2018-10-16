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

// Add like route
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check if user has already liked the post
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json({
            alreadylike: 'User already liked this post'
          });
        }
        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopost: 'Post is not found' }));
  }
);

// Add unlike route
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check if user has already liked the post
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res.status(400).json({
            notliked: 'You have not yet liked the post!'
          });
        }

        // Get remove index
        const removeIndex = post.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);

        // Remove like
        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopost: 'Post is not found' }));
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
