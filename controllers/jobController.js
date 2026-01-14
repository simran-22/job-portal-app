const Job = require('../models/jobSchema')


// Create jobs
const createJob = async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({
        success: false, message: 'Only recruiters can post jobs'
      });
    }

    // extract allowed fields
    const { title, description, company, location, salary, type } = req.body;
    // 3️⃣ Basic validation
    if (!title || !description || !company) {
      return res.status(400).json({
        success: false,
        message: 'Title, description and company are required'
      });
    }

    //create job with postedBy from token
    const newjob = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      type,
      postedBy: req.user.userId
    });
    // 5️⃣ Success response
    res.status(201).json(newjob)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

// Update Job (only recruiter who posted it)

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false, message: "Job not found"
      })
    }
    // sirf recruiter aur wahi recruiter jo job post kiya hai
    if (req.user.role !== "recruiter" || job.postedBy.toString() !== req.user.userID) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, job: updateJob });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Delete Job (only recruiter who posted it)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false, message: "Job not found"
      })
    }
    if (req.user.role !== "recruiter" || job.postedBy.toString() !== req.user.userId) { return res.status(403).json({ success: false, message: "Not authorized" }); }
    await job.deleteOne(); res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = { createJob, updateJob, deleteJob };