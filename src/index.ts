import { connect } from "mongoose";
import { app } from "./app";

const port = process.env.PORT;
const dbConnectionUrl = process.env.DB_CONNECTION_URL!

connect(dbConnectionUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("Auth service is starts in port ", port);
    });
  })
  .catch(() => console.log("unable to connect to the db"));
