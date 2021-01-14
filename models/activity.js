//Activity model is equvilate to norification
// and the user id indicates the id of the post owner
//not the one who did the activity

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate({ User, Post }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsTo(Post, { foreignKey: "postId", as: "post&activity" });
    }
  }
  Activity.init(
    {
      activityId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      isLike: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "activities",
      modelName: "Activity",
    }
  );
  return Activity;
};
