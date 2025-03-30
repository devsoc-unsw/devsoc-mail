import dotenv from "dotenv";
import express from "express";
import authRoutes from './routes/auth.routes';
import mailRoutes from './routes/mail.routes';
// import { dbConnect, dbDisconnect } from "./db";
import { PORT } from "../config.json"
import { errorMiddleware } from "./middleware";
import cors from "cors";

dotenv.config();

// server startup
const app = express();
const port = process.env.PORT || PORT;

app.listen(port, () => {
    console.log(`Devsoc-mail server is running at http://localhost:${port}`);
})

// database connection
// dbConnect();

// routes & middleware
app.use(express.json());
app.use(cors());
app.use('', authRoutes);
app.use('', mailRoutes);
app.use(errorMiddleware);

// closing the server
process.on("SIGINT", async () => {    
    console.log('Shutting down server.');
    // dbDisconnect();
    process.exit();
});
