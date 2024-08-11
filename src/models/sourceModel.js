const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  config: Object,
});

const SourceModel = mongoose.model('mesh_sources', sourceSchema);

module.exports = SourceModel;
