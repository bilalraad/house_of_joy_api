const router = require("express").Router();
const { Comment, Post, User } = require("../models");

// create comment by user
router.post("/", async (req, res) => {
  const { userId, postId, commentBody } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userId } });
    const post = await Post.findOne({ where: { postId: postId } });

    const newcomment = await Comment.create({
      userId: user.id,
      postId: post.id,
      comment: commentBody,
    });

    return res.json(newcomment).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//update commment by id
router.put("/:commentId", async (req, res) => {
  const postId = req.params.commentId;
  const { commentBody } = req.data;
  try {
    const comment = await Comment.findOne({
      where: {
        postId,
      },
    });

    comment.comment = commentBody;

    return res.json(comment).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// delete comment By commentId
router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  console.log(commentId);
  try {
    const comment = await Comment.findOne({ where: { commentId } });
    await comment.destroy();
    return res.json({ message: "comment deleted!" }).status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
