const express = require('express');
const router = express.Router();
const Folder = require('../models/FolderSchema');
const Resource = require('../models/Resource');
const path = require('path');
const fs = require('fs'); // Add this line

// Create a new folder
router.post('/createfolder', async (req, res) => {
    const newFolder = new Folder(req.body);
    try {
        const savedFolder = await newFolder.save();
        res.status(201).json(savedFolder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get folders by semester
router.get('/show/:semester', async (req, res) => {
    try {
        const folders = await Folder.find({ semester: req.params.semester });
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json(error);
    }
});
// routes/folderRoutes.js
// Delete a folder and its resources
router.delete('/deletefolder/:folderId', async (req, res) => {
    try {
        // Find the folder
        const folderToDelete = await Folder.findById(req.params.folderId);
        
        if (!folderToDelete) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        // Find all resources associated with the folder
        const resources = await Resource.find({ folderId: folderToDelete._id });

        // Delete files from the server
        const deleteFilePromises = resources.map(resource => {
            const filePath = path.join(__dirname, '../', resource.url); 
            return fs.promises.unlink(filePath).catch(err => {
                console.error(`Failed to delete file: ${filePath}`, err);
            });
        });

        // Wait for all file deletions to complete
        await Promise.all(deleteFilePromises);

        // Delete all resources associated with the folder
        await Resource.deleteMany({ folderId: folderToDelete._id });

        // Delete the folder
        await Folder.findByIdAndDelete(req.params.folderId);
        
        res.status(200).json({ message: 'Folder and associated resources deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
