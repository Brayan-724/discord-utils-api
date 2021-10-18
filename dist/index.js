import Dotenv from "dotenv";
import Path from "path";
import Express from "express";
import Http from "http";
import AvatarRoute from "./routes/avatar.js";
if (process.env.NODE_ENV !== "production") {
    Dotenv.config({ path: Path.join(process.cwd(), ".env") });
}
// Initialize Server
const app = Express();
const server = Http.createServer(app);
const PORT = parseInt(process.env.PORT, 10) || 1406;
//* Endpoints
AvatarRoute(app);
// Run server
server.listen(PORT, () => {
    console.log("Listening on ", PORT);
});
