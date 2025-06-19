"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var head_1 = require("next/head");
var ResumePage = function () {
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <head_1.default>
        <title>个人简历 - Adams Blog</title>
      </head_1.default>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">个人简历</h1>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">教育背景</h2>
          <p className="text-gray-600">XX大学 计算机科学与技术专业 | 2018-2022</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">工作经历</h2>
          <p className="text-gray-600">XX科技 前端开发工程师 | 2022-至今</p>
        </div>
      </div>
    </div>);
};
exports.default = ResumePage;
