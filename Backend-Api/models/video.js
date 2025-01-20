/// Schema for videos

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    youtubeUrl: { type: String, required: true },
    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference 
       
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);


