const express = require('express');
const db = require('../db');


const router = express.Router();

router.post('/', async (req, res) => {

    const postInfo = req.body;
  
   try {

        if (postInfo.title && postInfo.contents) {
              const newPost = await db.insert(postInfo);
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
        ({error: 'The posts information could not be retrieved'})
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

    const postInfo = req.body;
    const id = req.params.id;
    const post = await db.findById(id);

    try {

        if (post) {
            if (postInfo.title && postInfo.contents) {
                const editedPost = await db.update(id, postInfo)
                res.status(200).json(editedPost)
            } else {
                res.status(400).json({message: 'Please provide title and contents for the post'})
            }
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
    } catch {
        res.status(500).json({errorMessage: 'The post information could not be updated'})
    }

})

router.post('/:id/comments', async (req,res) => {


    try {

    const id = req.params.id;
    const comment = {post_id: id, text: '', ...req.body}
    const post = await db.findById(id);
  
    console.log(req.params)
    // comments = [...comments, comment]

        if (post) {
            if (comment.text !== '') {
                const newComment = await db.insertComment(comment)
                res.status(201).json(newComment)
            } else {
                res.status(400).json({message: 'Please enter text for the comment'})
            }
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({errorMessage: 'There was an error saving your comment to the database'})
    }

});

router.get('/:id/comments', async (req, res) => {
    try {
        const comment = await db.findCommentById(req.params.id);

        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
    } catch {
        res.status(500).json({error: 'The comment information could not be retrieved'})
    }
})


module.exports = router;