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
      if (bodyObject.assignee && bodyObject.assigneeName) {
        bodyObject.status = "In Progress";
        bodyObject.assignee=new ObjectId(bodyObject.assignee);
      }
      const newTask = new task(bodyObject);
      db.collection("MorningStarTask")
        .insertOne(newTask)
        .then(() => {
          res.status(200).json(newTask);
        });
      break;
    case "GET":
      const { userId } = req.query;
      if (userId && userId !== "Admin") {
        const employee = await db
          .collection("LuciferCollection")
          .findOne({ email: userId });
        if (employee) {
          console.log(employee._id)
          const allAssignedTasks = await db
            .collection("MorningStarTask")
            .find({"assignee": employee._id.valueOf() })
            .toArray();
          console.log(allAssignedTasks);
          res.status(200).send({
            allAssignedTasks: allAssignedTasks,
          });
        }
      } else {
        const allTasks = await db
          .collection("MorningStarTask")
          .find({})
          .toArray();

        res.status(200).json({
          allTasks: allTasks,
        });
      }
      break;
    case "DELETE":
      const id = req.body;
      const myquery = { _id: new ObjectId(id) };
      await db
        .collection("MorningStarTask")
        .deleteOne(myquery)
        .then(() => {
          res.status(200).json("deleted");
        })
        .catch((err) => console.log(err));
      break;
  }
};
