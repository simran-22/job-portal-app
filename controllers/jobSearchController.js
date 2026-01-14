const job = require('../models/jobSchema');

// get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Success case response
    return res.status(200).json({
      success: true,
      job
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


module.exports = { getAllJobs, getJobById };
