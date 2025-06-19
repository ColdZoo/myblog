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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
var server_1 = require("next/server");
var prisma_1 = require("@/lib/prisma");
var bcrypt_1 = require("bcrypt");
// 获取所有用户
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma_1.default.user.findMany({
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                isAdmin: true,
                                createdAt: true
                            }
                        })];
                case 1:
                    users = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json(users)];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: '获取用户失败' }, { status: 500 })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 创建新用户
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, name_1, password, hashedPassword, user, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    _a = _c.sent(), email = _a.email, name_1 = _a.name, password = _a.password;
                    return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                case 2:
                    hashedPassword = _c.sent();
                    return [4 /*yield*/, prisma_1.default.user.create({ data: { email: email, name: name_1, password: hashedPassword } })];
                case 3:
                    user = _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json(user, { status: 201 })];
                case 4:
                    _b = _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: '创建用户失败' }, { status: 400 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// 更新用户
function PUT(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, email, name_2, user, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    _a = _c.sent(), id = _a.id, email = _a.email, name_2 = _a.name;
                    return [4 /*yield*/, prisma_1.default.user.update({
                            where: { id: Number(id) },
                            data: { email: email, name: name_2 }
                        })];
                case 2:
                    user = _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json(user)];
                case 3:
                    _b = _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: '用户不存在或更新失败' }, { status: 404 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// 删除用户
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function () {
        var url, pathname, idStr, id, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    url = new URL(request.url);
                    pathname = url.pathname;
                    idStr = pathname.split('/').pop();
                    if (!idStr || isNaN(Number(idStr))) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: '无效的用户ID' }, { status: 400 })];
                    }
                    id = Number(idStr);
                    return [4 /*yield*/, prisma_1.default.user.delete({ where: { id: id } })];
                case 1:
                    _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: '用户删除成功' })];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: '用户不存在或删除失败' }, { status: 404 })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
