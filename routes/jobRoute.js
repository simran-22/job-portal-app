const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

// Create Job (only recruiter)
router.post('/', authMiddleware, createJob);

// Get All Jobs
router.get('/', getAllJobs);

// Get Job by ID
router.get('/:id', getJobById);

// Update Job (only recruiter who posted it)
router.put('/:id', authMiddleware, updateJob)

// Delete Job (only recruiter who posted it)
router.delete('/:id', authMiddleware, deleteJob)

module.exports = router;
