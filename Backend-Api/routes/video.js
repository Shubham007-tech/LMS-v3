const express = require('express');
const Video = require('../models/video'); //  video model
const protect = require('../middleware/authMiddleware'); // authentication middleware
const router = express.Router();

// Create a new video (POST)
router.post('/', protect, async (req, res) => {
    const { title, description, youtubeUrl , category} = req.body;
    try {
        const video = new Video({ title, description, youtubeUrl ,category });
        await video.save();
        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create video' });
    }
});



// Bulk upload videos (POST) 
router.post('/bulk',  async (req, res) => {
    const videos = req.body.videos;
    if (!Array.isArray(videos) || videos.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of videos' });
    }

    try {
        const savedVideos = await Video.insertMany(videos);
        res.status(201).json({ message: 'Videos uploaded successfully', videos: savedVideos });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload videos' });
    }
});




// Read all videos with optional search (GET)
router.get('/', async (req, res) => {
    const { search } = req.query; 
    try {
        const query = search ? { title: new RegExp(search, 'i') } : {}; // Regex (case-insensitive) search
        const videos = await Video.find(query).populate('category'); 
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});






// Read a single video (GET) - Public Route
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

// Update a video (PUT) - Protected Route
router.put('/:id', protect, async (req, res) => {
    const { title, description, youtubeUrl , category} = req.body;
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { title, description, youtubeUrl ,category },
            { new: true }
        );
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update video' });
    }
});




// Delete a video (DELETE) - Protected Route
router.delete('/:id',  async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json({ message: 'Video deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete video' });
    }
});





module.exports = router;
