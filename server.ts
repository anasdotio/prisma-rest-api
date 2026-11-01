import "dotenv/config";
import express from "express";
import morgan from "morgan";
import postRouter from './src/routes/post.route.js'
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use('/api/posts' , postRouter);

app.get("/api/health", (req, res) => {
  return res.status(200).json({ status : "ok" , message : "Server is running"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})