var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IsSnowflake, ValidateSnowflake } from '../helpers/validators.js';
import ResDef from "../helpers/response.js";
import { fetchUser } from "../helpers/user.js";
import { fetchImg } from "../helpers/image.js";
export default function (app) {
    app.get("/avatar/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (!IsSnowflake(id)) {
            return ValidateSnowflake(id, res);
        }
        const user = yield fetchUser(id);
        if (user === null) {
            return ResDef(res, {
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
    app.get("/avatar/:id/:size", (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            return ResDef(res, {
                status: 500,
                error: {
                    name: "Invalid ID",
                    message: "Invalid ID"
                }
            });
        }
        const img = yield fetchImg(id, size);
        res
            .status(200)
            .type(".webp")
            .send(img);
    }));
}
