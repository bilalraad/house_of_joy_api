const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Activity }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId", as: "posts" });
      this.hasMany(Activity, { foreignKey: "userId", as: "user" });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "email must not be empty" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username must not be null" },
          // notEmpty: { msg: "role must not be empty" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "ImageUrl must not be null" },
          // notEmpty: { msg: "role must not be empty" },
        },
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone number must not be null" },
          notEmpty: { msg: "Phone number must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      hooks: {
        afterDestroy: async function (user, _, __) {
          const { Post } = require("../models");

          const userPosts = await Post.findAll({ where: { userId: user.id } });
          if (userPosts)
            for (let post in userPosts) {
              console.log(post);
              post.destroy();
            }
        },
      },
    }
  );
  return User;
};
