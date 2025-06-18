'use client';

// 完整导航栏实现（包含JWT状态管理、动态菜单、退出逻辑）
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';


type JWTUser = {
  userId: number;
  email: string;
  isAdmin: boolean;
};

export default function Navbar() {
  const menuTimer = useRef<NodeJS.Timeout | null>(null);
  
  const [user, setUser] = useState<JWTUser | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JWTUser>(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('redirectUrl');
    setUser(null);
    window.location.href = '/login';
  };

  const menuItems = useMemo(() => {
    return [
      !user && { label: '登录', href: typeof window !== 'undefined' ? `/login?redirect=${encodeURIComponent(window.location.pathname)}` : '/login' },
      user?.isAdmin && { label: '用户管理', href: '/users' },
      user && { label: '退出登录', onClick: handleLogout }
    ].filter((item): item is { label: string; href: string; onClick?: never } | { label: string; onClick: () => void; href?: never } => 
          !!item && (!!item.href !== !!item.onClick));
  }, [user]);

  return (
    <nav className="flex items-center justify-between navbar p-4 text-white shadow">
      <Link href="/" className="text-xl italic">CaiZheng的技术站</Link>
      
      <div className="flex gap-10 font-chinese">
        <Link href="/resume" className="nav-link">关于我</Link>
        <Link href="/download" className="nav-link">下载中心</Link>
      </div>

      <div className="relative">
        <div 
            className="relative group"
            onMouseEnter={() => { 
              if (menuTimer.current) clearTimeout(menuTimer.current);
              if (menuItems.length > 0) setShowMenu(true); 
            }}
            onMouseLeave={() => { 
              menuTimer.current = setTimeout(() => setShowMenu(false), 200); 
            }}
          >
          <button
            className="p-2 hover:bg-gray-800 rounded-full"
          >
            <FiUser className="w-6 h-6" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-blue-50 border border-blue-100 rounded-xl shadow-2xl divide-y divide-blue-50 py-1" onMouseEnter={() => {
  if (menuTimer.current) clearTimeout(menuTimer.current);
}} 
onMouseLeave={() => {
  menuTimer.current = setTimeout(() => setShowMenu(false), 200);
}}>
              {menuItems.map((item, index) => (
                item?.href ? (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 bg-transparent text-sm text-gray-700 hover:bg-blue-100"
                    onClick={() => setShowMenu(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      item?.onClick?.();
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 bg-transparent text-sm text-gray-700 hover:bg-blue-100"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


