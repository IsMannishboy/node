const express = require('express');

const app = express();
const path = require("path");const db = require('./db/models');
const postrouter = require("./routes/Posts")
const UserRouter = require("./routes/Users")
const clientRouter = require("./routes/ClientRouter")
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/posts",postrouter)
app.use("/api/users",UserRouter)
app.use("/",clientRouter)
const frontPath = path.join(__dirname, "../front/front/dist");
app.use(express.static(frontPath));db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
});
