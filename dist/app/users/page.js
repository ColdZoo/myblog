"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserManagement;
var react_1 = require("react");
var api_1 = require("@/lib/api");
function UserManagement() {
    var _this = this;
    var _a = (0, react_1.useState)([]), users = _a[0], setUsers = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)({ username: '', email: '', password: '' }), newUser = _d[0], setNewUser = _d[1];
    // 加载用户列表
    (0, react_1.useEffect)(function () {
        var loadUsers = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, api_1.fetchUsers)()];
                    case 1:
                        data = _b.sent();
                        setUsers(data);
                        setError(null);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        setError('获取用户失败，请重试');
                        return [3 /*break*/, 3];
                    case 3:
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        loadUsers();
    }, []);
    // 新增用户
    var handleCreateUser = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!newUser.username || !newUser.email || !newUser.password)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_1.createUser)(newUser)];
                case 2:
                    data = _b.sent();
                    setUsers(__spreadArray(__spreadArray([], users, true), [data], false));
                    setNewUser({ username: '', email: '', password: '' });
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    setError('创建用户失败，请检查输入');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // 删除用户
    var handleDeleteUser = function (userId) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!window.confirm('确定删除该用户？'))
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_1.deleteUser)(userId)];
                case 2:
                    _b.sent();
                    setUsers(users.filter(function (user) { return user.id !== userId; }));
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    setError('删除用户失败，请重试');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (loading)
        return <div className="p-8 text-center">加载中...</div>;
    if (error)
        return <div className="p-8 text-red-500">{error}</div>;
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-2xl font-bold mb-6">用户管理</h1>

      {/* 新增用户表单 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">新增用户</h2>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <input type="text" placeholder="用户名" value={newUser.username} onChange={function (e) { return setNewUser(function (prev) { return (__assign(__assign({}, prev), { username: e.target.value })); }); }} className="w-full p-2 border rounded" required/>
          <input type="email" placeholder="邮箱" value={newUser.email} onChange={function (e) { return setNewUser(function (prev) { return (__assign(__assign({}, prev), { email: e.target.value })); }); }} className="w-full p-2 border rounded" required/>
          <input type="password" placeholder="密码" value={newUser.password} onChange={function (e) { return setNewUser(function (prev) { return (__assign(__assign({}, prev), { password: e.target.value })); }); }} className="w-full p-2 border rounded" required/>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            添加用户
          </button>
        </form>
      </div>

      {/* 用户列表 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 border-b-2 border-gray-300 text-left">用户ID</th>
              <th className="p-3 border-b-2 border-gray-300 text-left">用户名</th>
              <th className="p-3 border-b-2 border-gray-300 text-left">邮箱</th>
              <th className="p-3 border-b-2 border-gray-300 text-left">密码Hash</th>
              <th className="p-3 border-b-2 border-gray-300 text-left">创建时间</th>
              <th className="p-3 border-b-2 border-gray-300 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(function (user) { return (<tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">{user.id}</td>
                <td className="p-3 border-b border-gray-200">{user.username}</td>
                <td className="p-3 border-b border-gray-200">{user.email}</td>
                <td className="p-3 border-b border-gray-200">{user.passwordHash}</td>
                <td className="p-3 border-b border-gray-200">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="p-3 border-b border-gray-200">
                  <button onClick={function () { return handleDeleteUser(user.id); }} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    删除用户
                  </button>
                </td>
              </tr>); })}
          </tbody>
        </table>
      </div>
    </div>);
}
