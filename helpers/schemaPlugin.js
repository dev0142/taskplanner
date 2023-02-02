export default function(schema) {

    var updateTimestemps = function(next){
      var self = this;
  
  
      if(!self.createdAt) {
        self.createdDate = new Date();
        //or self.update({},{ $set: { createdDate : new Date(), updatedDate: new Date() } });
      } else {
        self.updatedDate= new Date();
        //or self.update({},{ $set: {updatedDate: new Date() } });
      }
      next();
    };
  
    schema.
      pre('save', updateTimestemps ).
      pre('update', updateTimestemps ).
      pre('findOneAndUpdate', updateTimestemps);
  };