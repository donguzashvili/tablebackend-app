const fs = require("fs");
const path = require("path");

const fileData = () => {
  const fileData = fs.readFileSync(path.join(process.cwd(), "db/db.json"));
  const data = JSON.parse(fileData);
  return data;
};

module.exports = { fileData };
