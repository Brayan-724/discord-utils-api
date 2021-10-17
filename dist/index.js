var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dotenv from "dotenv";
import Path from "path";
// import Discord from "discord.js"
import Express from "express";
import Http from "http";
import Fetch from "node-fetch";
if (process.env.NODE_ENV !== "production") {
    Dotenv.config({ path: Path.join(process.cwd(), ".env") });
}
// Initialize Discord
// const client: Discord.Client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS ] });
// Initialize Server
const app = Express();
const server = Http.createServer(app);
const PORT = parseInt(process.env.PORT, 10) || 1406;
//* Endpoints
app.get("/avatar/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!IsSnowflake(id)) {
        return ValidateSnowflake(id, res);
    }
    const user = yield fetchUser(id);
    if (user === null) {
        return ResError(res, {
            status: 500,
            error: {
                name: "Invalid ID",
                message: "Invalid ID"
            }
        });
    }
    res.status(200).send({
        status: 200,
        done: true,
        data: `https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp`
    });
}));
app.get("/avatar/:id/:size", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = req.params.id;
    if (!IsSnowflake(id)) {
        return ValidateSnowflake(id, res);
    }
    let size = 64;
    if (typeof ((_b = (_a = req.params.size) === null || _a === void 0 ? void 0 : _a.match) === null || _b === void 0 ? void 0 : _b.call(_a, /^[0-9]+$/)) === "object") {
        const n = parseInt(req.params.size);
        if (n % 2 === 0 && n !== 0) {
            size = n;
        }
    }
    const user = yield fetchUser(id);
    if (user === null) {
        return ResError(res, {
            status: 500,
            error: {
                name: "Invalid ID",
                message: "Invalid ID"
            }
        });
    }
    const response = yield Fetch(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp?size=${size}`);
    res
        .status(200)
        .type(".webp")
        .send(yield response.buffer());
}));
function fetchUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield Fetch(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`
            }
        });
        if (!response.ok)
            return null;
        return (yield response.json());
    });
}
//* Response Validation Functions
function ValidateSnowflake(id, res) {
    if (typeof id !== "string")
        return ResError(res, {
            status: 400,
            error: {
                name: "No ID",
                message: `There's not ID in \"${id}\"`
            }
        });
    if (id.match(/^[0-9]{16,18}$/) === null) {
        return ResError(res, {
            status: 400,
            error: {
                name: "Invalid ID",
                message: "Invalid ID format."
            }
        });
    }
    return;
}
//* Validation Functions
function IsSnowflake(id) {
    if (typeof id !== "string")
        return false;
    if (id.match(/^[0-9]{16,18}$/) === null) {
        return false;
    }
    return true;
}
function ResError(res, options) {
    res
        .status(options.status)
        .send({
        status: options.status,
        done: false,
        data: null,
        error: {
            name: options.error.name,
            message: options.error.message
        }
    });
}
// Run Discord
// client
//   .login(process.env.TOKEN)
//   .then(() => {
//     console.log("Client logged!");
//   });
// Run server
server.listen(PORT, () => {
    console.log("Listening on ", PORT);
});
