const Job = require('../models/jobSchema')

const createJob = async (req, res) => {
  try {
    if (req.user.role === 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Only recruiters can post jobs'
      })
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
module.exports = { createJob };