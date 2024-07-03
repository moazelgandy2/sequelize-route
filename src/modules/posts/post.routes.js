import { Router } from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "./post.controller.js";

const postRouter = Router();

postRouter.post("/", addPost);
postRouter.get("/", getPosts);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.get("/:id", getPost);

export default postRouter;
