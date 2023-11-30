const express = require("express");
const {notFound,errorHandler} = require("./middlewares/errorHandler");
const DBconnect = require("./utils/dbConnection");
const app = express();
const cors = require("cors");

require('dotenv').config();

const myport = process.env.PORT;

app.use(express.json());

app.use(cors());
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

app.use(notFound);
app.use(errorHandler);

DBconnect().then(() => {
    app.listen(myport, () => {
        console.log(`listening for requests on  ${myport}`);
    })
})