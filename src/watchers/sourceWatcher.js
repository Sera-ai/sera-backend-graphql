const SourceModel = require('../models/sourceModel');
const { updateMeshInstance, removeSourceFromMesh } = require('../services/meshService');
const { getSourceById } = require('../services/sourceService');

function watchSourceChanges() {
  SourceModel.watch().on('change', async (change) => {
    if (change.operationType === 'insert' || change.operationType === 'update') {
      const updatedDoc = await getSourceById(change.documentKey._id);
      await updateMeshInstance(updatedDoc);
    } else if (change.operationType === 'delete') {
      await removeSourceFromMesh(change.documentKey._id);
    }
  });
}

module.exports = {
  watchSourceChanges,
};
