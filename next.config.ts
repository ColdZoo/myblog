const path = require('path');

const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../')
  }
};

// 正确配置
export default { experimental: { serverActions: {} } }
