const { MeshInstance } = require('@graphql-mesh/runtime');
const { stitchSchemas } = require('@graphql-tools/stitch');

let meshInstance = null;
const cachedSources = {};

async function updateMeshInstance(sourceConfig) {
  cachedSources[sourceConfig.name] = sourceConfig;

  const combinedSchema = await stitchSchemas({
    subschemas: await Promise.all(Object.values(cachedSources).map(async (source) => {
      const schema = await new MeshInstance({
        sources: [source],
      }).start();
      return schema.schema;
    })),
  });

  if (meshInstance) {
    await meshInstance.stop();
  }

  meshInstance = new MeshInstance({ schema: combinedSchema });
  await meshInstance.start();

  console.log(`Mesh instance updated with source: ${sourceConfig.name}`);
}

async function removeSourceFromMesh(sourceName) {
  delete cachedSources[sourceName];

  const combinedSchema = await stitchSchemas({
    subschemas: await Promise.all(Object.values(cachedSources).map(async (source) => {
      const schema = await new MeshInstance({
        sources: [source],
      }).start();
      return schema.schema;
    })),
  });

  if (meshInstance) {
    await meshInstance.stop();
  }

  meshInstance = new MeshInstance({ schema: combinedSchema });
  await meshInstance.start();

  console.log(`Source ${sourceName} deleted from Mesh instance.`);
}

module.exports = {
  updateMeshInstance,
  removeSourceFromMesh,
};
