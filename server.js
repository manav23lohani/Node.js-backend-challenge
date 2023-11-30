const express = require("express");
const {notFound,errorHandler} = require("./middlewares/errorHandler");
const DBconnect = require("./utils/dbConnection");
const app = express();
const cors = require("cors");
const PORT = 5001;

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

app.use(notFound);
app.use(errorHandler);

DBconnect().then(() => {
    app.listen(PORT, () => {
        console.log(`listening for requests on  ${PORT}`);
    })
})