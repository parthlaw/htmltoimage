const path = require("path");
const wkhtmltopdf = require("wkhtmltopdf");
require("wkhtmltopdf").command = path.resolve(__dirname, "binary/wkhtmltopdf");
const wkhtmltoimage = require("wkhtmltoimage");
require("wkhtmltoimage").command = path.resolve(
  __dirname,
  "binary/wkhtmltoimage"
);
var rd;
const fs = require("fs");
const template = `<h1>Test</h1>`;
const streamToBuffer = (streamObjectToRead) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    streamObjectToRead
      .on("data", (chunk) => chunks.push(chunks))
      .on("end", () => resolve(Buffer.concat(chunks)))
      .on("error", (err) => reject({ err, type: "In Stream" }));
  });
};

const htmlimage = async () => {
  const html = `<h1>Hi..This is Test</h1>`;
  const responsePipe = wkhtmltoimage.generate(template);
  const imgBuffer = await streamToBuffer(responsePipe);
  console.log(imgBuffer);
};
htmlimage();
// console.log(img);
// fs.readFile("./out.jpg", (err, data) => {
//   if (err) throw err; // Fail if the file can't be read.
//   console.log(data);
// });
