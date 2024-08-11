const SourceModel = require('../models/sourceModel');

async function getSourceById(sourceId) {
  return await SourceModel.findById(sourceId);
}

async function getAllSources() {
  return await SourceModel.find({});
}

module.exports = {
  getSourceById,
  getAllSources,
};
