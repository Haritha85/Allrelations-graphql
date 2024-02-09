"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var datasource_1 = __importDefault(require("../datasource/datasource"));
var Users_entity_1 = require("../entities/Users.entity");
var service_1 = __importDefault(require("../Services/service"));
var router = express_1.default.Router();
// const userSer= new UserService();
router.get("/details", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepo, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepo = datasource_1.default.getRepository(Users_entity_1.Users);
                    return [4 /*yield*/, service_1.default.getAllUsers()];
                case 1:
                    users = _a.sent();
                    res.json(users);
                    return [2 /*return*/];
            }
        });
    });
});
router.get("/details/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = parseInt(req.params.id);
                    return [4 /*yield*/, service_1.default.getUserById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        res.status(404).send("User not found");
                    }
                    else {
                        res.json(user);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
router.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, isActive, age, todos, newUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, isActive = _a.isActive, age = _a.age, todos = _a.todos;
                    if (!firstName || !lastName || age === undefined) {
                        return [2 /*return*/, res.status(400).json({ message: "Incomplete data provided" })];
                    }
                    if (age < 0) {
                        return [2 /*return*/, res.status(400).json({ message: "provide appropriate data" })];
                    }
                    return [4 /*yield*/, service_1.default.createUser(firstName, lastName, isActive, age, todos)];
                case 1:
                    newUser = _b.sent();
                    res.json(newUser);
                    return [2 /*return*/];
            }
        });
    });
});
router.post("/addTodos/:userid", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, newTodos, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = parseInt(req.params.userid);
                    newTodos = req.body.newTodos;
                    console.log(newTodos);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, service_1.default.addTodosToUser(userId, newTodos)];
                case 2:
                    _a.sent();
                    res.status(200).json({ message: 'Todos added successfully' });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(500).json({ error: error_1.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.put("/update/:userid", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, updateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = parseInt(req.params.userid);
                    updateData = req.body;
                    if (!userId || !updateData) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid input" })];
                    }
                    return [4 /*yield*/, service_1.default.updateUser(userId, updateData)];
                case 1:
                    _a.sent();
                    res.json({ message: "updated successfully" });
                    return [2 /*return*/];
            }
        });
    });
});
router.put("/updatetodos/:userid", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, updateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = parseInt(req.params.userid);
                    updateData = req.body;
                    if (!userId || !updateData) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid input" })];
                    }
                    return [4 /*yield*/, service_1.default.updateTodoUser(userId, updateData)];
                case 1:
                    _a.sent();
                    res.json({ message: "updated successfully" });
                    return [2 /*return*/];
            }
        });
    });
});
router.delete("/deleteTodo/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = parseInt(req.params.id);
                    return [4 /*yield*/, service_1.default.deleteTodo(userId)];
                case 1:
                    _a.sent();
                    res.json({ message: "todo deleted successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error) {
                        return [2 /*return*/, res.status(500).json({ error: error_2.message })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.delete("/delete/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = parseInt(req.params.id);
                    return [4 /*yield*/, service_1.default.deleteUser(userId)];
                case 1:
                    _a.sent();
                    res.json({ message: "user deleted successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    if (error_3 instanceof Error) {
                        return [2 /*return*/, res.status(500).json({ error: error_3.message })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.get("/topmostTodosUser", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userWithTopmostTodos, userId, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, service_1.default.getUserWithTopmostTodos()];
                case 1:
                    userWithTopmostTodos = _a.sent();
                    if (userWithTopmostTodos) {
                        userId = userWithTopmostTodos.id;
                        res.json({ userId: userId });
                    }
                    else {
                        res.status(404).json({ message: "No user found" });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(500).json({ error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
