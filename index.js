const { connectToDatabase } = require('./src/utils/db');
const { getAllSources } = require('./src/services/sourceService');
const { updateMeshInstance } = require('./src/services/meshService');
const { watchSourceChanges } = require('./src/watchers/sourceWatcher');

(async () => {
  await connectToDatabase();

  const initialSources = await getAllSources();
  await Promise.all(initialSources.map(updateMeshInstance));

  watchSourceChanges();

  console.log('GraphQL Mesh instance started');
})();
