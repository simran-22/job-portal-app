const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  // 2️⃣ Check proper format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Invalid token format",
    });
  };



  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  // console.log("ENV SECRET ", process.env.JWT_SECRET);
  // console.log("TOKEN ", token);
  // console.log("HEADER 👉", authHeader);

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invailid Token",
    });
  }
};
module.exports = authmiddleware;
