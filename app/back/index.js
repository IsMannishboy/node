const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/models');
const postrouter = require("./routes/Posts")
const UserRouter = require("./routes/Users")
const clientRouter = require("./routes/ClientRouter")
const viewsDir = path.join(__dirname, "../front/front/dist");

app.use(express.json());
app.use(express.static(viewsDir));

app.use("/api/posts",postrouter)
app.use("/api/users",UserRouter)
app.use(clientRouter);
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
});
