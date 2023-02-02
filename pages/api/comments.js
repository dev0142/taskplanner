import clientPromise from "../../database/cloudConn";
import comment from "../../model/CommentsData";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  clientPromise.catch((error) => console.log(error));
  const client = await clientPromise;
  const db = client.db("DevilDatabase");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      bodyObject.taskId = new ObjectId(bodyObject.taskId);
      const newComment = new comment(bodyObject);
      db.collection("EveningStarTask")
        .insertOne(newComment)
        .then(() => {
          res.status(200).json(newComment);
        });
      break;
    case "GET":
      let idTask = req.query.task;
      console.log(idTask);
      const comments = await db
        .collection("EveningStarTask")
        .find({ taskId: new ObjectId(idTask) })
        .toArray();
      console.log(comments);
      if (comments) {
        res.status(200).json(comments);
      }
      break;
    case "DELETE":
      const id = req.body;
      console.log(id);
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
  }
};
