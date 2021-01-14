const router = require("express").Router();
const { User } = require("../models");

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//create a new user
router.post("/", async (req, res) => {
  const { uuid, fullName, email, phoneNo, userName, imageUrl } = req.body;

  try {
    const user = await User.create({
      uuid,
      fullName,
      email,
      phoneNo,
      userName,
      imageUrl,
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get user by id
router.get("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//delete user by id
router.delete("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });
    await user.destroy();
    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
// update user by id (should provide all the values)
router.put("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { fullName, email, phoneNo, userName, imageUrl } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

    user.fullName = fullName;
    user.email = email;
    user.phoneNo = phoneNo;
    user.userName = userName;
    user.imageUrl = imageUrl;
    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
