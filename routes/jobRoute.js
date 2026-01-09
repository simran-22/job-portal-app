const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const { createJob } = require('../controllers/jobController');


router.get('/', authMiddleware, createJob);



module.exports = router;

