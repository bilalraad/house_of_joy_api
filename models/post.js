const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Like, Activity }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.hasMany(Like, { foreignKey: "postId", as: "post" });
      this.hasMany(Activity, { foreignKey: "postId", as: "post&activity" });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Post.init(
    {
      postId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      imagesUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "ImagesUrl must not be empty " },
          notEmpty: { msg: "ImageUrl have at least on imageUrl" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description must not be empty " },
          notEmpty: { msg: "Description have at least on imageUrl" },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Category must not be empty " },
          notEmpty: { msg: "Category have at least on imageUrl" },
        },
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
      hooks: {
        afterDestroy: async function (post) {
          const { Like, Comment, Activity } = require("../models");
          const postsLikes = await Like.findAll({
            where: { postId: post.postId },
          });
          const postsComments = await Comment.findAll({
            where: { postId: post.postId },
          });
          const postActivities = await Activity.findAll({
            where: { postId: post.postId },
          });
          for (let like in postsLikes) {
            like.destroy();
          }
          for (let comment in postsComments) {
            comment.destroy();
          }

          for (let activity in postActivities) {
            activity.destroy();
          }
        },
      },
    }
  );
  return Post;
};
