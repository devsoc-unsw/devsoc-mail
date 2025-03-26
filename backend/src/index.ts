import dotenv from "dotenv";
import express from "express";
import authRoutes from './routes/auth.routes';
import mailRoutes from './routes/mail.routes';
// import { dbConnect, dbDisconnect } from "./db";
import { errorMiddleware } from "./middleware";

dotenv.config();

// server startup
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Devsoc-mail server is running at http://localhost:${port}`);
})

// database connection
// dbConnect();

// routes & middleware
app.use('', authRoutes);
app.use('', mailRoutes);
app.use(errorMiddleware);

// closing the server
process.on("SIGINT", async () => {    
    console.log('Shutting down server.');
    // dbDisconnect();
    process.exit();
});
