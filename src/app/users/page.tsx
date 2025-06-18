"use client"

import { useState, useEffect } from 'react';
import { fetchUsers, createUser, deleteUser } from '@/lib/api';

interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  // 加载用户列表
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch {
        setError('获取用户失败，请重试');

      }
      setLoading(false);
    };
    loadUsers();
  }, []);

  // 新增用户
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email || !newUser.password) return;

    try {
      const data = await createUser(newUser);
      setUsers([...users, data]);
      setNewUser({ username: '', email: '', password: '' });
    } catch {
      setError('创建用户失败，请检查输入');
    }
  };

  // 删除用户
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('确定删除该用户？')) return;

    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch {
      setError('删除用户失败，请重试');
    }
  };

  if (loading) return <div className="p-8 text-center">加载中...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-2xl font-bold mb-6">用户管理</h1>

      {/* 新增用户表单 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">新增用户</h2>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <input
            type="text"
            placeholder="用户名"
            value={newUser.username}
            onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="邮箱"
            value={newUser.email}
            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="密码"
            value={newUser.password}
            onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
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
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">{user.id}</td>
                <td className="p-3 border-b border-gray-200">{user.username}</td>
                <td className="p-3 border-b border-gray-200">{user.email}</td>
                <td className="p-3 border-b border-gray-200">{user.passwordHash}</td>
                <td className="p-3 border-b border-gray-200">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="p-3 border-b border-gray-200">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    删除用户
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}