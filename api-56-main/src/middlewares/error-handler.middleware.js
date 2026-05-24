const fs = require('fs');

module.exports = (error, req, res, next) => {
  let code = error.code ?? 500;
  let detail = error.detail ?? error.details ?? null;
  let message = error.message ?? "Server error ....";
  let status = error.status ?? "SERVER_ERROR";

  // continuous development 
  
  // mongoose (ODM) => 11000
  if (code > 599) {
    code = 500;
  }

  // file uploads remove 
  if(req.file) {
    if(fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
  }
  res.status(code).json({
    error: detail, // {name: "Name must include 2 characters"}
    message: message,
    status: status,
  });
};