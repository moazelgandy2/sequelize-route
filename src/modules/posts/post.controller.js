import User from "../../../db/model/user.model.js";
import Comment from "../../../db/model/comment.model.js";
import Post from "../../../db/model/post.model.js";

const getPosts = async (req, res) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: ["userName"],
    },
  });

  res.status(200).json({
    posts,
  });
};

const addPost = async (req, res) => {
  const { title, content, userId } = req.body;

  const user = await User.findOne({ where: { id: userId, loggedIn: true } });
  if (!user) {
    return res.status(404).json({
      message: `User not found or not logged in`,
    });
  }
  try {
    const post = await Post.create({
      title,
      content,
      UserId: user.dataValues.id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.findOne({ where: { id } });
  if (!post) {
    return res.status(404).json({
      message: `Post not found`,
    });
  }

  const userId = post.dataValues.UserId;

  const user = await User.findOne({ where: { id: userId, loggedIn: true } });
  if (!user) {
    return res.status(404).json({
      message: `User not found or not logged in`,
    });
  }

  try {
    await post.update({
      title,
      content,
      include: {
        model: User,
        attributes: ["userName"],
      },
    });

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id } });
  if (!post) {
    return res.status(404).json({
      message: `Post not found`,
    });
  }

  const userId = post.dataValues.UserId;

  const user = await User.findOne({ where: { id: userId, loggedIn: true } });
  if (!user) {
    return res.status(404).json({
      message: `User not found or not logged in`,
    });
  }

  try {
    await post.destroy();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOne({
    where: { id },
    include: [
      {
        model: User,
        attributes: ["userName", "email"],
      },
      {
        model: Comment,
        attributes: ["content", "UserId"],
        include: {
          model: User,
          attributes: ["userName", "email"],
        },
      },
    ],
  });

  if (!post) {
    return res.status(404).json({
      message: `Post not found`,
    });
  }

  res.status(200).json({
    post,
  });
};

export { addPost, getPosts, updatePost, deletePost, getPost };
