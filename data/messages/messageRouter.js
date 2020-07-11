const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const newComment = await db.insertComment({...req.body, comment_id: req.params.id})

        if (newComment) {
            res.status(201).json(newComment);
        } else if (req.body !== req.body) {
            res.status(400).json({message: 'Please provide text for the comment'})
        } else if (req.params.id !== req.params.id) {
            res.status(404).json(message: 'The post with the specified ID does not exist')
        } 
    } catch {
        res.status(500).json({error: 'There was an error saving your comment to the database'})
    }
})



