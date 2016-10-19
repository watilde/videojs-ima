describe('Video.js IMA Plugin:', function() {
  var video;
  var player;

  before(function () {
    var fixture = document.createElement('div');
    var content = document.createElement('video');
    var source = document.createElement('source');
    content.preload = 'auto';
    content.controls = 'controls';
    content.className = 'video-js vjs-default-skin';
    source.src = 'http://rmcdn.2mdn.net/Demo/vast_inspector/android.mp4';
    source.type = 'video/mp4';
    video = document.createElement('video');
    video.id = 'video';
    content.appendChild(source);
    fixture.appendChild(content);
    fixture.appendChild(video);
    player = videojs(video);
  });

  context('the environment', function() {
    it('is sane', function() {
      assert.ok(true, 'true is ok');
    })
  });

  context('video plays on bad ad tag', function() {
    it ('should be error', function (done) {
      var options = {
        id: 'video',
        adTagUrl: 'http://this.site.does.not.exist.google.com'
      };
      player.ima(options);
      var playCount = 0;
      player.play = function() {
        playCount++;
      }
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
      setTimeout(function() {
        // Play called once by the plugin on error.
        assert.equal(playCount, 1);
        done()
      }, 5000);
    });
  });

  context('onAdError_', function() {
    it ('should trigger adserror with data from google.ima.AdError and google.ima.AdErrorEvent', function (done) {
      // stub view mode to throw on start
      google.ima.ViewMode.NORMAL = "throw-on-ads-manager-init";

      var options = {
        id: 'video',
        adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&' +
            'iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&' +
            'gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&' +
            'url=[referrer_url]&correlator=[timestamp]',
        autoPlayAdBreaks: true,
      };

      player.on("adserror", function(event){
        assert.deepEqual(
          Object.keys(Object(event.data)),
          ["AdError", "AdErrorEvent"],
          "event.data should have AdError and AdErrorEvent"
        );
        if (event.data) {
          assert.ok(event.data.AdError, "AdError should be defined");
          assert.ok(event.data.AdErrorEvent, "AdErrorEvent should be defined");
        }
        done()
      });

      player.ima(options);
      player.ima.requestAds();
      player.play();
    });
  });
});


/*



test('controls prefixed with id', function(){
  var options = {
    id: 'video',
    adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&' +
    'iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&' +
    'gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&' +
    'url=[referrer_url]&correlator=[timestamp]'
  };
  player.ima(options);
  player.ima.initializeAdDisplayContainer();
  player.ima.requestAds();

  ok(document.getElementById(options.id+'_ima-controls-div'), 'Controls should be generated with ID prefix');
  strictEqual(document.getElementById('ima-controls-div'), null, 'Controls without ID prefix should not be generated');
});

test('ad plays on good ad tag', function() {
  var options = {
    id: 'video',
    adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&' +
        'iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&' +
        'gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&' +
        'url=[referrer_url]&correlator=[timestamp]'
  }
  player.ima(options);
  var contentPauseCount = 0;
  player.ima.onContentPauseRequested_ = function() {
    contentPauseCount++;
  }
  player.ima.initializeAdDisplayContainer();
  player.ima.requestAds();
  player.play();
  stop();
  setTimeout(function() {
    equal(contentPauseCount, 1);
    start();
  }, 5000);
});

test('video continues after ad was skipped', function() {
  var options = {
    id: 'video',
    adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&' +
        'iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&' +
        'gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&' +
        'url=[referrer_url]&correlator=[timestamp]'
  }

  //addEventListener only works when the adManager is available, thus using it in the ready-callback
  var readyForPrerollCallback = function() {
    player.ima.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, function() {
      var adManager = this;
      adManager.skip();
    })
    //we overwrote the normal ready-callback, thus calling start now
    player.ima.startFromReadyCallback();
  };

  player.ima(options, readyForPrerollCallback);

  var contentResumeCount = 0;
  player.ima.onContentResumeRequested_ = function() {
    contentResumeCount++;
  }
  var adCompleteCount = 0;
  player.ima.onAdComplete_ = function() {
    adCompleteCount++;
  }

  player.ima.initializeAdDisplayContainer();
  player.ima.requestAds();
  player.play();
  stop();

  setTimeout(function() {
    equal(contentResumeCount, 1, 'content resumed');
    equal(adCompleteCount, 1 , 'adComplete was called');
    start();
  }, 10000);
});


module("Events", { setup: setup });

test('onAdsLoaderError_ should trigger adserror with data from google.ima.AdError and google.ima.AdErrorEvent', function() {
  var options = {
    id: 'video',
    adTagUrl: ''
  };

  player.on("adserror", function(event){
    deepEqual(Object.keys(Object(event.data)), ["AdError", "AdErrorEvent"], "event.data should have AdError and AdErrorEvent");

    if (event.data) {
      ok(event.data.AdError, "AdError should be defined");
      ok(event.data.AdErrorEvent, "AdErrorEvent should be defined");
    }

    start();
  });

  player.ima(options);
  player.ima.requestAds();

  stop();
});


*/
