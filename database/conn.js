import mongoose from 'mongoose';


const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log("connection successful to db");
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.mongodburlCloud, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return handler(req, res);
};

export default connectDB;