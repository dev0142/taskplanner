import clientPromise from "../../database/cloudConn";
import task from "../../model/TaskData";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  clientPromise.catch((error) => console.log(error));
  const client = await clientPromise;
  const db = client.db("DevilDatabase");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      const newTask = new task(bodyObject);
      db.collection("MorningStarTask")
        .insertOne(newTask)
        .then(() => {
          res.status(200).json(newTask);
        });
      break;
    case "GET":
      const task = await db
        .collection("MorningStarTask")
        .findOne({ _id: new ObjectId(req.query.task_id) });
      console.log(task);
      if (task) {
        res.status(200).json(task);
      }
      break;
    case "DELETE":
      const id = req.body;
      const myquery = { _id: new ObjectId(id) };
      await db
        .collection("MorningStarTask")
        .deleteOne(myquery)
        .then((res) => {
          res.status(200).json("deleted");
        })
        .catch((err) => console.log(err));
      break;
    case "PUT":
      const { source } = req.query;
      if (source === "statusChange") {
        const updatedStatus = req.body;
        const luciferQuery = { _id: new ObjectId(req.query.task_id) };
        await db
          .collection("MorningStarTask")
          .updateOne(luciferQuery, { $set: { status: updatedStatus } })
          .then(() => {
            res.status(200).json("updated successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (source === "assigneeChange") {
        const { assignee, assigneeName } = req.body;
        const luciferQuery = { _id: new ObjectId(req.query.task_id) };
        await db
          .collection("MorningStarTask")
          .updateOne(luciferQuery, {
            $set: { assignee: new ObjectId(assignee), assigneeName: assigneeName },
          })
          .then(() => {
            res.status(200).json("updated successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      }
  }
};
