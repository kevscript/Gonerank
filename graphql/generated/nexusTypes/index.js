const { getPrismaClientDmmf } = require('nexus-prisma/dist-cjs/helpers/prisma')
const ModelsGenerator = require('nexus-prisma/dist-cjs/generator/models/index')
const { Runtime } = require('nexus-prisma/dist-cjs/generator/runtime/settingsSingleton')

const gentimeSettings = {
  "output": {
    "directory": "/home/kevscript/dev/gonerank-2022/graphql/generated/nexusTypes",
    "name": "index"
  },
  "projectIdIntToGraphQL": "Int",
  "jsdocPropagationDefault": "guide",
  "docPropagation": {
    "GraphQLDocs": true,
    "JSDoc": true
  },
  "prismaClientImportId": "@prisma/client"
}

const dmmf = getPrismaClientDmmf({
  // JSON stringify the values to ensure proper escaping
  // Details: https://github.com/prisma/nexus-prisma/issues/143
  // TODO test that fails without this code
  require: () => require("@prisma/client"),
  importId: gentimeSettings.prismaClientImportId,
  importIdResolved: require.resolve("@prisma/client")
})

const models = ModelsGenerator.JS.createNexusTypeDefConfigurations(dmmf, {
  runtime: Runtime.settings,
  gentime: gentimeSettings,
})

module.exports = {
  $settings: Runtime.settings.change,
  ...models,
}