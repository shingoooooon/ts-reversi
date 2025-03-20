import express from "express";
import morgan from "morgan";
import "express-async-errors";

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