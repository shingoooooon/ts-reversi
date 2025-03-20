import express from "express";
import morgan from "morgan";
import "express-async-errors";
import mysql from "mysql2/promise";

const PORT = 3000;
const app = express();

app.use(morgan("dev"));
app.use(express.static("static", { extensions: ["html"] }));

app.get("/api/hello", async (req, res) => {
    res.json({ message: "Hello Express" });
});

app.get("/api/error", async (req, res) => {
    throw new Error("test error");
});

app.post("/api/games", async (req, res) => {
    const startedAt = new Date();
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "reversi",
        password: "password",
        database: "reversi",
    });

    try {
        await connection.beginTransaction();

        await connection.execute(
            "INSERT INTO games (started_at) VALUES (?)",
            [startedAt]
        );

        await connection.commit();
    } finally {
        connection.end();
    }
});

app.use(ErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});

function ErrorHandler(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    console.error("Unexpected error occurred", err);
    res.status(500).json({ message: "Internal Server Error" });
}