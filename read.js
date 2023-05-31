const fs = require('fs');
const XLSX = require('xlsx');

function readTextFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function convertToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([{ TextContent: data }]);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelFilePath = 'output.xlsx';
  XLSX.writeFile(workbook, excelFilePath);
  console.log(`Text file converted to Excel: ${excelFilePath}`);
}

const textFilePath = 'input.txt';
readTextFile(textFilePath)
  .then(data => {
    convertToExcel(data);
  })
  .catch(err => {
    console.error(`Error reading the text file: ${err}`);
  });
