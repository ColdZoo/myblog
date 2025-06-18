import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const fetchUsers = async () => {
  const response = await fetch('/api/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) throw new Error('获取用户列表失败');
  return await response.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('登录失败');
  return res.json();
};

// 原有 fetchUsers 函数保留，新增以下函数

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export const createUser = async (user: { username: string; email: string; password: string }) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('创建用户失败');
  return res.json() as Promise<User>;
};

export const deleteUser = async (userId: string) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('删除用户失败');
};