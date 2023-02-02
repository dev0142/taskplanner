import clientPromise from "../../database/cloudConn";
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
  }
};
