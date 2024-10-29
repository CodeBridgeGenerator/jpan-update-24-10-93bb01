const { PelulusStage2 } = require('./pelulusStage2.class');
const createModel = require('../../models/pelulusStage2.model');
const hooks = require('./pelulusStage2.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/pelulusStage2', new PelulusStage2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pelulusStage2');

  // Get the schema of the collections 
  app.get("/pelulusStage2Schema", function (request, response) {
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