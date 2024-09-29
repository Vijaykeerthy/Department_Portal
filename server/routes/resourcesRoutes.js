// routes/resourceRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the file system module
const Resource = require('../models/Resource');

const router = express.Router();

// Define the path for the resources directory
const resourcesDir = 'Resources/';

// Check if the resources directory exists; if not, create it
if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir, { recursive: true }); // Create the directory
}

// Configure Multer for file storage
const crypto = require('crypto'); // Import crypto module for generating unique identifiers

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, resourcesDir); // Use the defined resources directory
    },
    filename: (req, file, cb) => {
        // Create a unique identifier using current timestamp and a random string
        const uniqueId = crypto.randomBytes(8).toString('hex'); // Generates a random hex string
        const customFileName = `${uniqueId}_${Date.now()}.pdf`; // Custom naming convention

        cb(null, customFileName); // Use the custom filename
    }
});


const upload = multer({ storage });

// Route to get resources based on folder ID
router.get('/:folderId', async (req, res) => {
    try {
        const resources = await Resource.find({ folderId: req.params.folderId });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to upload a new resource
router.post('/upload', upload.single('file'), async (req, res) => {
    const { name, folderId, semesterNumber } = req.body;

    const newResource = new Resource({
        name,
        url: req.file.path, // Store the file path in the database
        folderId,
        semesterNumber,
    });

    try {
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE resource by ID and file
router.delete('/deleteresource/:id', async (req, res) => {
    try {
        const resourceId = req.params.id;
        
        // Find the resource to delete
        const deletedResource = await Resource.findById(resourceId);
        
        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Construct the file path
        const filePath = path.join(__dirname, '../', deletedResource.url); 
        
        // Delete the file from the server
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${filePath}`, err);
                // You might want to handle this error but still proceed to delete the resource
            }
        });

        // Delete resource from the database
        await Resource.findByIdAndDelete(resourceId);

        res.status(200).json({ message: 'Resource and associated file deleted successfully', deletedResource });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting resource', error });
    }
});

module.exports = router;
