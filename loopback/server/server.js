'use strict';

// Imports
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var childProcess = require('child_process');

// Custom
var logging = require('../../common/logging.js');

app.start = function () {
  // Start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');

    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('%sLoopback api explorer at %s%s', logging.lb, baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  if (require.main === module)
    // Start express
    app.start();
});

// Run our Logic server
function runScript(scriptPath, callback) {
    
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

// Now we can run a script and invoke a callback when complete, e.g.
runScript('./logic/server.js', function (err) {
    if (err)
      throw err;
    
    console.log('%sLogic server is no longer running', logging.lg);
});