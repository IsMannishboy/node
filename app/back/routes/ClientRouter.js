const clientRouter = require('express').Router();
const viewsDir = path.join(__dirname, "../../front/front/views");
clientRouter.get("/about", (req, res) => {
  res.sendFile(path.join(viewsDir, "about.html"));
});

clientRouter.get("/contact", (req, res) => {
  res.sendFile(path.join(viewsDir, "contact.html"));
});
clientRouter.get("/login", (req, res) => {
  res.sendFile(path.join(viewsDir, "contact.html"));
});
clientRouter.get("/register", (req, res) => {
  res.sendFile(path.join(viewsDir, "contact.html"));
});

module.exports = clientRouter;
