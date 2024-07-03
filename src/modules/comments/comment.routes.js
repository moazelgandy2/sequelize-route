import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComments,
  getUserWithPostsAndComments,
  updateComment,
} from "./comment.controller.js";

const commentRouter = Router();

commentRouter.get("/", getComments);
commentRouter.post("/", addComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);
commentRouter.get("/user/:id", getUserWithPostsAndComments);

export default commentRouter;
