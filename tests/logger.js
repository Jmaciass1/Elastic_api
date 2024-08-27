const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "logs.txt");

function log(message) {
  const timestamp = new Date().toISOString();
  fs.appendFile(logFilePath, `[${timestamp}] ${message}\n`, (err) => {
    if (err) {
      console.error("Error al escribir en el archivo de logs:", err.message);
    }
  });
}

module.exports = { log };
