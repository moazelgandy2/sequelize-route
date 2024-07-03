import express from "express";

import db from "./db/connect.js";
import userRouter from "./src/modules/users/user.routes.js";
import postRouter from "./src/modules/posts/post.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
