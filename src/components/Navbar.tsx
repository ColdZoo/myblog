'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md fixed top-0 w-full z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex">
            <div className="flex-shrink-0 flex items-center h-full">
              <Link href="/" className="text-white text-lg font-bold">蔡政的博客</Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-8 sm:flex">
              <div className="space-x-4">
                <Link
                  href="/resume"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  个人简历
                </Link>
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