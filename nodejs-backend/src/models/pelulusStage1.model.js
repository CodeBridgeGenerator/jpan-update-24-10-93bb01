
    module.exports = function (app) {
        const modelName = 'pelulus_stage1';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: Schema.Types.ObjectId, ref: "users" },
order: { type: Number, required: false, max: 1000000 },
tajukLatihan: { type: Schema.Types.ObjectId, ref: "stage1" },
status: { type: String, required: false , enum: ["Pending","Approved","Rejected"] },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };