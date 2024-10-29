
    module.exports = function (app) {
        const modelName = 'stage1';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            nomborRujukan: { type:  String , required: true, maxLength: null },
tajukLatihan: { type:  String , required: true },
dokumen: { type:  [Schema.Types.ObjectId], ref: "document_storages" , maxLength: null },
kategori: { type: Schema.Types.ObjectId, ref: "kategori" },
status: { type:  String , required: true },
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