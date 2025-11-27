// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import dotenv from "dotenv";
// import bookmarkRouter from "./routes/bookmark.route";
// import connectDB from "./config/connectDB";
// import userRouter from "./routes/user.route";

// dotenv.config();

// const app = express();

// const corsOptions = {
//   origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// };

// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(morgan("combined"));
// app.use(helmet({
//   crossOriginOpenerPolicy: false,
//   crossOriginResourcePolicy: false,
// }));

// app.get("/", (_req, res) => {
//   res.json({ message: "Server is running" });
// });

// app.use("/api/user", userRouter);
// app.use("/api/bookmarks", bookmarkRouter);

// const PORT = process.env.PORT || 8080;

// connectDB().then(() => {
//   app.listen(PORT, () => console.log("Server listening on", PORT));
// });











// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import dotenv from "dotenv";
// import bookmarkRouter from "./routes/bookmark.route";
// import connectDB from "./config/connectDB";
// import userRouter from "./routes/user.route";

// dotenv.config();

// const app = express();
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(express.json());
// app.use(morgan("combined"));
// app.use(helmet({ crossOriginResourcePolicy: false }));

// // Ensure DB connection once and cache it across invocations
// let dbConnected = false;
// async function ensureDB() {
//   if (dbConnected) return;
//   await connectDB();
//   dbConnected = true;
// }

// // Middleware to ensure DB is ready before handling requests
// app.use(async (_req, _res, next) => {
//   try {
//     await ensureDB();
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// app.get("/", (_req, res) => {
//   res.json({ message: "Server is running" });
// });

// app.use("/api/user", userRouter);
// app.use("/api/bookmarks", bookmarkRouter);

// // ✅ Development vs Vercel compatibility
// if (process.env.NODE_ENV !== "production") {
//   // Local dev: start server
//   const PORT = process.env.PORT || 8080;
//   connectDB().then(() => {
//     app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
//   });
// }

// // Vercel: export app (no listen)
// export default app;





// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import dotenv from "dotenv";
// import bookmarkRouter from "./routes/bookmark.route";
// import connectDB from "./config/connectDB";
// import userRouter from "./routes/user.route";

// dotenv.config();

// const app = express();
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true, allowedHeaders: ["Content-Type", "Authorization"]}));
// app.use(express.json());
// app.use(morgan("combined"));
// app.use(helmet({ crossOriginResourcePolicy: false }));

// app.get("/", (_req, res) => {
//   res.json({ message: "Server is running" });
// });

// app.use("/api/user", userRouter);
// app.use("/api/bookmarks", bookmarkRouter);
               

// const PORT = process.env.PORT || 8080;

// connectDB().then(() => {
//   app.listen(PORT, () => console.log("Server listening on", PORT));
// });







import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import bookmarkRouter from "./routes/bookmark.route";
import connectDB from "./config/connectDB";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Ensure DB connection once and cache it across invocations
let dbConnected = false;
async function ensureDB() {
  if (dbConnected) return;
  await connectDB();
  dbConnected = true;
}

// Middleware to ensure DB is ready before handling requests
app.use(async (req, _res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/user", userRouter);
app.use("/api/bookmarks", bookmarkRouter);

// Export the app for Vercel instead of calling app.listen
export default app;
