import mongoose from "mongoose";

interface IProps {
  mongo_url: string;
  options?: mongoose.ConnectOptions;
}

const db = ({ mongo_url, options }: IProps) => {
  return mongoose
    .connect(mongo_url, options)
    .then(() => {
      console.log("Connection successful to MONGODB");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default db;
