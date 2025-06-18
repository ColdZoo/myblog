'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';

const decodeJWT = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

const Navbar = () => {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  }>({ id: 0, name: '', email: '', isAdmin: false });

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      const decoded = decodeJWT(jwt);
      if (decoded) setUser(decoded);
    }
  }, []);

  return (
    <nav className="bg-blue-600 shadow-md fixed top-0 w-full z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex">
            <div className="flex-shrink-0 flex items-center h-full">
              <Link href="/" className="text-white text-lg font-bold">蔡政的博客</Link>
            </div>
            {/* 登录用户信息显示 */}
            {user && (
              <div className="ml-auto relative">
                <button className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">
                  {user.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      sessionStorage.removeItem('jwt');
// 由于 setUser 期望的参数类型不是 null，将用户状态重置为初始值
setUser({ id: -1, name: '', email: '', isAdmin: false });
                      window.location.reload();
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                  >
                    登出
                  </button>
                </div>
              </div>
            )}
            <div className="hidden sm:-my-px sm:ml-8 sm:flex">
              <div className="space-x-4">
                <Link
                  href="/resume"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  个人简历
                </Link>
                {/* 管理员用户管理模块（仅管理员显示） */}
                {user?.isAdmin && (
                  <Link
                    href="/users"
                    className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    用户管理
                  </Link>
                )}
                <Link
                  href="/login"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  邮箱登录
                </Link>
                <Link
                  href="/download"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  软件下载
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


