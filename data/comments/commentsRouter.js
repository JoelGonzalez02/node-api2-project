const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req,res) => {


    try {

    const id = req.params.id;
    const comment = {post_id: id, ...req.body}
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

router.get('/', async (req, res) => {
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


