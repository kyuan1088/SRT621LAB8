/* eslint-disable no-undef */
const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

// specific routes depending on the type of files for this project
http
  .createServer((req, res) => {
    let url = req.url;
    if (url.indexOf(".html") !== -1) {
      res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/html",
      });
      customReadFile(`./views${url}`, res);
    } else if (url.indexOf(".js") !== -1) {
      res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/javascript",
      });
      customReadFile(`./public/js${url}`, res);
    } else if (url.indexOf(".css") !== -1) {
      res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/css",
      });
      customReadFile(`./public/css${url}`, res);
    } else if (url.indexOf(".jpg") !== -1) {
      res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "image/jpeg",
      });
      customReadFile(`./public/images${url}`, res);
    } else {
      sendErrorResponse(res);
    }
  })
  .listen(port);

// error handling function, display file not found on error code
const sendErrorResponse = (res) => {
  res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  res.write("<h1>File Not Found!</h1>");
  res.end();
};

// read file fuction using the fs module
const customReadFile = (file_path, res) => {
  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (error, data) => {
      if (error) {
        console.log(error);
        sendErrorResponse(res);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    sendErrorResponse(res);
  }
};

console.log(`The server has started and is listening on port number: ${port}`);
