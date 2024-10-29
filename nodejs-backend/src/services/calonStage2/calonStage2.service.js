const { CalonStage2 } = require('./calonStage2.class');
const createModel = require('../../models/calonStage2.model');
const hooks = require('./calonStage2.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/calonStage2', new CalonStage2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('calonStage2');

  // Get the schema of the collections 
  app.get("/calonStage2Schema", function (request, response) {
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