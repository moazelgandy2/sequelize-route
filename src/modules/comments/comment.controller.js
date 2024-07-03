import User from "../../../db/model/user.model.js";
import Post from "../../../db/model/post.model.js";
import Comment from "../../../db/model/comment.model.js";

const getComments = async (req, res) => {
  const comments = await Comment.findAll({
    include: [
      {
        model: Post,
        attributes: ["title"],
      },
      {
        model: User,
        attributes: ["userName"],
      },
    ],
  });

  res.status(200).json({
    comments,
  });
};

const addComment = async (req, res) => {
  const { content, postId, userId } = req.body;

  console.log(content, postId, userId);

  const user = await User.findOne({ where: { id: userId, loggedIn: true } });

  if (!user) {
    return res.status(404).json({
      message: `User not found or not logged in`,
    });
  }

  const post = await Post.findOne({ where: { id: postId } });

  if (!post) {
    return res.status(404).json({
      message: `Post not found`,
    });
  }

  try {
    const comment = await Comment.create({
      content,
      PostId: post.dataValues.id,
      UserId: user.dataValues.id,
    });

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const comment = await Comment.findOne({ where: { id } });
  if (!comment) {
    return res.status(404).json({
      message: `Comment not found`,
    });
  }

  const userId = comment.dataValues.UserId;

  const user = await User.findOne({ where: { id: userId, loggedIn: true } });
  if (!user) {
    return res.status(404).json({
      message: `User not found or not logged in`,
    });
  }

  try {
    const ree = await Comment.update(
      {
        content,
      },
      {
        where: { id },
      }
    );
    console.log(ree);

    res.status(200).json({
      message: "Comment updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const comment = await Comment.findOne({ where: { id } });
  if (!comment) {
    return res.status(404).json({
      message: `Comment not found`,
    });
  }

  const userId = comment.dataValues.UserId;

  const user = await User.findOne({ where: { id: userId, loggedIn: true } });
  if (!user) {
    return res.status(404).json({
      message: `User not found or not logged in`,
    });
  }

  try {
    await Comment.destroy({ where: { id } });

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUserWithPostsAndComments = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    include: [
      {
        model: Post,
        attributes: ["title"],
      },

      {
        model: Comment,
        attributes: ["content"],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: `User not found`,
    });
  }

  res.status(200).json({
    user,
  });
};

export { addComment, getComments, updateComment, deleteComment, getUserWithPostsAndComments };
