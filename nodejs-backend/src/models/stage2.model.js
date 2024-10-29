
    module.exports = function (app) {
        const modelName = 'stage2';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            nomborRujukan: { type:  String , required: true },
tajukLatihan: { type:  String , required: true },
status: { type:  String , required: true },
stage1: { type: Schema.Types.ObjectId, ref: "stage1" },
completed: { type: Boolean, required: false, default: false },

            
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