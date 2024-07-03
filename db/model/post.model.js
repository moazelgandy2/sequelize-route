import { DataTypes } from "sequelize";
import { sequelize } from "../connect.js";

import User from "./user.model.js";

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Post, { onDelete: "cascade", onUpdate: "cascade" });
Post.belongsTo(User);

export default Post;
