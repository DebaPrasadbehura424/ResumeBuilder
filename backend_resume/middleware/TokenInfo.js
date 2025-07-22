const jwt = require("jsonwebtoken");

// for generating email using email , we can take user id also
function generateToken(email) {
  const payload = { email }; // it should be an object ok
  const SECRET_KEY = process.env.SECRET_KEY;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, SECRET_KEY, options);
}
function verify(token) {
  const SECRET_KEY = process.env.SECRET_KEY;
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, verify };
