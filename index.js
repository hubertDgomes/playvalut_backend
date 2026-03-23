import express from "express";
import dbConnector from "./config/dbConnector.js";
import router from "./routes/allRouters.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())


app.get("/" , (req , res)=> {
    res.send("The server is running")
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api", router)

dbConnector()
app.listen(3000, ()=> {
    console.log("The server is running.")
})