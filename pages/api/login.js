import clientPromise from "../../database/cloudConn";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  clientPromise.catch((error) => console.log(error));
  const client = await clientPromise;
  const db = client.db("DevilDatabase");
  switch (req.method) {
    case "POST":
      try {
        const { email, password } = req.body;
        db.collection("LuciferCollection")
          .findOne({ email: email })
          .then((item) => {
            if (item && item.password === password) {
              res.status(200).send(item);
            }
            else{
              res.status(404).send({message:"user not found"});
            }
          });
      } catch (error) {
        console.log(error);
      }
      break;
  }
};
