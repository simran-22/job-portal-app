const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const jobController = require('../controllers/jobController');


router.get('/', authMiddleware,jobController,createJob );



module.exports = router;

