const express = require('express');
const db = require('../db');


const router = express.Router();

router.post('/', async (req, res) => {
  
   try {
        const newPost = await db.insert(req.body);

        if (newPost) {
            res.status(201).json(newPost)
        } else {
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        }
   } catch {
       res.status(500).json({error: 'There was an error saving the post to the database'})
   }
})


router.get('/', (req, res) => {
    db.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json
        ({error: 'The post information could not be retrieved'})
    })
})

router.get('/:id', async (req, res) => {
    try {
        const posts = await db.findById(req.params.id);

        if (posts.length > 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch {
        res.status(500).json({error: "The post information could not be retrieved."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await db.remove(req.params.id);

        if (deletedPost) {
            res.status(200).json(deletedPost);
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
    } catch {
        res.status(500).json({error: 'The post could not be removed'})
    }
})


router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await db.update(req.params.id, req.body);

        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else if (req.params.id !== req.params.id) {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        } else if (req.body !== req.body) {
            res.status(400).json({message: 'Please provide the title and content for the post'})
        }
    } catch {
        res.status(500).json({error: 'The post information could not be modified'})
    }
})


module.exports = router;