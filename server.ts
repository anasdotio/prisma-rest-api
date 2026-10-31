import express from "express";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello, World!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});