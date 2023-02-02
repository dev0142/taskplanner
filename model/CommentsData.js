const mongoose = require("mongoose");
const CommentsData = new mongoose.Schema({
  commentBy: {
    type: String,
    requires: true,
  },
  commentDate: {
    type: Date,
    default:Date.now
  },
  commentBody: {
    type: String,
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    default:""
  },
});

mongoose.models = {};
const comments = mongoose.model("comments", CommentsData);
module.exports = comments;
