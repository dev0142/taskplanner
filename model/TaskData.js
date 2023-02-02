const mongoose = require("mongoose");
import SchemaPlugin from "../helpers/schemaPlugin";
const castObjectId = mongoose.ObjectId.cast();
mongoose.ObjectId.cast((v) => (v === "" ? v : castObjectId(v)));

const TaskData = new mongoose.Schema({
  taskName: {
    type: String,
    requires: true,
  },
  taskDesc: {
    type: String,
    required: true,
  },
  taskCreatedDate: {
    type: String,
    required: true,
  },
  taskDueDate: {
    type: String,
    required: true,
  },
  assignee: {
    type: mongoose.ObjectId,
    default: "",
  },
  assigneeName: {
    type: String,
  },
  status: {
    type: String,
    default: "To do",
  },
  systemTaskCreatedDate: {
    type: Date,
    default: Date.now,
  },
  systemTaskDueDate: {
    type: Date,
    required: true,
  },
  systemTaskUpdatedDate: {
    type: Date,
    default: Date.now,
  },
});

TaskData.plugin(SchemaPlugin);
mongoose.models = {};
const task = mongoose.model("task", TaskData);
module.exports = task;
