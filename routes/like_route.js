const router = require("express").Router();
const { Like, Post, User } = require("../models");

// create comment by user
router.post("/", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userId } });
    const post = await Post.findOne({ where: { postId: postId } });
    const newLike = await Like.create({
      userId: user.id,
      postId: post.id,
    });

    return res.json(newLike).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// delete like By likeId
router.delete("/:likeId", async (req, res) => {
  const likeId = req.params.likeId;
  console.log(likeId);
  try {
    const like = await Like.findOne({ where: { commentId } });
    await like.destroy();
    return res.json({ message: "Like deleted!" }).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
