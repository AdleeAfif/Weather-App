const express = require("express");
const path = require("path");
const { router } = require("./routers");
const { PORT } = require("./config/secret");

const app = express();

app.use(express.json()); //!important: For request body

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Weather app is running on port ${PORT}`);
});
