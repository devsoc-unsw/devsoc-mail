import dotenv from "dotenv";
import express from "express";
import authRoutes from './routes/auth.routes';
import mailRoutes from './routes/mail.routes';
import otherRoutes from './routes/other.routes';
// import { dbConnect, dbDisconnect } from "./db";
import { PORT } from "../config.json"
import { errorMiddleware } from "./middleware";
import cors from "cors";
import { loadData, connectToDatabase} from "./dataStore";

dotenv.config();

// server startup
const app = express();
const port = process.env.PORT || PORT;

// database connection
// dbConnect();
//loadData();

async function startServer() {
    try {
        await connectToDatabase(); 
        await loadData();

        app.listen(port, () => {
            console.log(`Devsoc-mail server is running at http://localhost:${port}`);
        });
        
        // Routes & middleware
        app.use(express.json());
        app.use(cors());
        app.use('', otherRoutes);
        app.use('', authRoutes);
        app.use('', mailRoutes);
        app.use(errorMiddleware);

    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
}

startServer();

// closing the server
process.on("SIGINT", async () => {    
    console.log('Shutting down server.');
    // dbDisconnect();
    process.exit();
});
