'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
// 完整导航栏实现（包含JWT状态管理、动态菜单、退出逻辑）
var link_1 = require("next/link");
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var jwt_decode_1 = require("jwt-decode");
function Navbar() {
    var menuTimer = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(null), user = _a[0], setUser = _a[1];
    var _b = (0, react_1.useState)(false), showMenu = _b[0], setShowMenu = _b[1];
    (0, react_1.useEffect)(function () {
        var token = localStorage.getItem('token');
        if (token) {
            try {
                var decoded = (0, jwt_decode_1.jwtDecode)(token);
                setUser(decoded);
            }
            catch (_a) {
                localStorage.removeItem('token');
            }
        }
    }, []);
    var handleLogout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('redirectUrl');
        setUser(null);
        window.location.href = '/login';
    };
    var menuItems = (0, react_1.useMemo)(function () {
        return [
            !user && { label: '登录', href: typeof window !== 'undefined' ? "/login?redirect=".concat(encodeURIComponent(window.location.pathname)) : '/login' },
            (user === null || user === void 0 ? void 0 : user.isAdmin) && { label: '用户管理', href: '/users' },
            user && { label: '退出登录', onClick: handleLogout }
        ].filter(function (item) {
            return !!item && (!!item.href !== !!item.onClick);
        });
    }, [user]);
    return (<nav className="flex items-center justify-between navbar p-4 text-white shadow">
      <link_1.default href="/" className="text-xl italic">CaiZheng的技术站</link_1.default>
      
      <div className="flex gap-10 font-chinese">
        <link_1.default href="/resume" className="nav-link">关于我</link_1.default>
        <link_1.default href="/download" className="nav-link">下载中心</link_1.default>
      </div>

      <div className="relative">
        <div className="relative group" onMouseEnter={function () {
            if (menuTimer.current)
                clearTimeout(menuTimer.current);
            if (menuItems.length > 0)
                setShowMenu(true);
        }} onMouseLeave={function () {
            menuTimer.current = setTimeout(function () { return setShowMenu(false); }, 200);
        }}>
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <fi_1.FiUser className="w-6 h-6"/>
          </button>
          
          {showMenu && (<div className="absolute right-0 mt-3 w-48 bg-blue-50 border border-blue-100 rounded-xl shadow-2xl divide-y divide-blue-50 py-1" onMouseEnter={function () {
                if (menuTimer.current)
                    clearTimeout(menuTimer.current);
            }} onMouseLeave={function () {
                menuTimer.current = setTimeout(function () { return setShowMenu(false); }, 200);
            }}>
              {menuItems.map(function (item, index) { return ((item === null || item === void 0 ? void 0 : item.href) ? (<link_1.default key={index} href={item.href} className="block px-4 py-2 bg-transparent text-sm text-gray-700 hover:bg-blue-100" onClick={function () { return setShowMenu(false); }}>
                    {item.label}
                  </link_1.default>) : (<button key={index} onClick={function () {
                    var _a;
                    (_a = item === null || item === void 0 ? void 0 : item.onClick) === null || _a === void 0 ? void 0 : _a.call(item);
                    setShowMenu(false);
                }} className="block w-full text-left px-4 py-2 bg-transparent text-sm text-gray-700 hover:bg-blue-100">
                    {item.label}
                  </button>)); })}
            </div>)}
        </div>
      </div>
    </nav>);
}
