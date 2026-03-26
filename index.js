import express from "express";
import dbConnector from "./config/dbConnector.js";
import router from "./routes/allRouters.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: "none", httpOnly: true },
  }),
);

const allowedOrigins = [
  "http://localhost:5173",
  "https://playvalult-client.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", router);

dbConnector();
app.listen(3000, () => {
  console.log("The server is running.");
});
