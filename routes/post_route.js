const router = require("express").Router();
const { Post, User } = require("../models");

// create post by user
router.post("/", async (req, res) => {
  const { ownerUuid, imagesUrl, description, category } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: ownerUuid } });

    const post = await Post.create({
      userId: user.id,
      imagesUrl,
      description,
      category,
    });

    return res.json(post).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ["user", "likes", "comments", "activities"],
    });

    return res.json(posts).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// get Posts By user id
router.get("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const user = await User.findOne({ where: { uuid } });

  try {
    const userPosts = await Post.findAll({
      where: {
        userId: user.id,
      },
      include: "user",
    });

    return res.json(userPosts).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// delete Post By postId
router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  try {
    const post = await Post.findOne({ where: { postId } });
    await post.destroy();
    return res.json({ message: "Post deleted!" }).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
