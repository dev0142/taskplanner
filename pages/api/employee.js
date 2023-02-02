import clientPromise from "../../database/cloudConn";
import employee from "../../model/EmployeeData";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  clientPromise.catch((error) => console.log(error));
  const client = await clientPromise;
  const db = client.db("DevilDatabase");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      bodyObject.password=bodyObject.email;
      const newEmployee = new employee(bodyObject);
      db.collection("LuciferCollection")
        .insertOne(newEmployee)
        .then(() => {
          res.status(200).json(newEmployee);
        });
      break;
    case "GET":
      const allEmployees = await db
        .collection("LuciferCollection")
        .find({})
        .toArray();
      res.status(200).json(allEmployees);
      break;
    case "DELETE":
      const id = req.body;
      const myquery = { _id: new ObjectId(id) };
      await db
        .collection("LuciferCollection")
        .deleteOne(myquery)
        .then(async () => {
          await db
            .collection("MorningStarTask")
            .updateMany(
              { assignee: new ObjectId(id) },
              { $set: { assignee: undefined ,assigneeName:undefined,status:"To do"} }
            )
            .then(() => {
              res.status(200).json("deleted");
            });
        })
        .catch((err) => console.log(err));
  }
};
