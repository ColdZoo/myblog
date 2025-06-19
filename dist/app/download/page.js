"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var head_1 = require("next/head");
var DownloadPage = function () {
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <head_1.default>
        <title>软件下载 - Adam&#39;s Blog</title>
      </head_1.default>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">软件下载</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">开发工具</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-800">代码编辑器</h3>
              <p className="text-sm text-gray-600">轻量级跨平台代码编辑器，支持多种语言高亮</p>
              <a href="#" className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                下载 v1.2.0
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">系统工具</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-800">文件管理器</h3>
              <p className="text-sm text-gray-600">高效文件管理工具，支持批量操作和云同步</p>
              <a href="#" className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                下载 v3.1.5
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = DownloadPage;
