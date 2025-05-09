/** @type {import('next').NextConfig} */
const config = {
  webpack: (config) => {
    // 修改 cache 策略以優化大字串處理
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      },
      cacheDirectory: '.next/cache',
      store: 'pack',
      compression: false,
      serialize: {
        buffer: true  // 使用 Buffer 來處理大字串
      }
    };
    return config;
  }
};

export default config;
