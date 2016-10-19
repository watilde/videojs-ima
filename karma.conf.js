module.exports = function(config) {
  config.set({
    singleRun: true,
    basePath: '.',
    frameworks: ['mocha', 'power-assert'],
    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 60000,
    files: [
      'node_modules/video.js/dist/video.js',
      'node_modules/video.js/dist/video-js.css',
      'node_modules/videojs-contrib-ads/src/videojs.ads.js',
      'node_modules/videojs-contrib-ads/src/videojs.ads.css',
      'http://s0.2mdn.net/instream/html5/ima3_debug.js',
      'src/videojs.ima.js',
      'src/videojs.ima.css',
      'test/**/*.js'
    ],
    preprocessors: {
      'test/**/*.js': ['espower']
    }
  })
}
