const express = require("express");

const { sequelize } = require("./models");
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/users", require("./routes/user_route"));
app.use("/posts", require("./routes/post_route"));

app.listen(port, async () => {
  console.log(`Server up on http://localhost:${port}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
