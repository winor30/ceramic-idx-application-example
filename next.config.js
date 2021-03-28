module.exports = {
  webpack: config => {
    config.node = {
      console: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }

    return config;
  },

};
