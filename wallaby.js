module.exports = (wallaby) => {
  return {
    env: {
      type: 'node'
    },
    testFramework: 'mocha',
    files: [
      'src/server.js'
    ],
    tests: [
      'test/test-server.js'
    ],
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    debug: true,
    workers: {
      recycle: true
    }
  }
}
