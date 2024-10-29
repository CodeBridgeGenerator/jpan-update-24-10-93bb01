const { PelulusStage1 } = require('./pelulusStage1.class');
const createModel = require('../../models/pelulusStage1.model');
const hooks = require('./pelulusStage1.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/pelulusStage1', new PelulusStage1(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pelulusStage1');

  // Get the schema of the collections 
  app.get("/pelulusStage1Schema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};