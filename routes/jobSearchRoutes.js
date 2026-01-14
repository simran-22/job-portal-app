const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById } = require('../controllers/jobSearchController');



//  Get All Jobs
router.get('/', getAllJobs);

// // Get Job by ID
router.get('/:id', getJobById);

module.exports = router;