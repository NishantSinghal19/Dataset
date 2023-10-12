const fs = require('fs');
const datasetFile = 'dataset.json';

function readDataset() {
  try {
    const data = fs.readFileSync(datasetFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeDataset(dataset) {
  try {
    fs.writeFileSync(datasetFile, JSON.stringify(dataset, null, 2));
  } catch (err) {
    console.error('Error writing dataset to file:', err);
  }
}

module.exports = {
  readDataset,
  writeDataset,
};
