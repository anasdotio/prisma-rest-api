import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { prisma } from "./src/config/prisma.js";
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello, World!" });
});

app.post('/api/posts', async (req, res) => {
  const { title = "Untitled", content = "this is a default content" } = req.body;

  try {
  const post = await prisma.post.create({
      data: {
        title,
        content
      }
    })

    return res.status(201).json(post);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create post" });
  }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})