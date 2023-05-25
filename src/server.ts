import express from "express";
import chessRoutes from "./routes/chessRoutes";
import connectDB from "./config/database";
import errorHandlerMiddleware from "./middlewares/errorHandler";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
void connectDB();

// Routes
app.use(chessRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
