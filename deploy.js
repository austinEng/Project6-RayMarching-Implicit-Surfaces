var colors = require('colors');
var path = require('path');
var git = require('simple-git')(__dirname);

git.status(function(err, status) {
  if (err) throw err;
  if (!status.isClean()) {
      console.error('Error: You have uncommitted changes! Please commit them first'.red);   
  } else {
    git.raw(['subtree', 'split', '--prefix', 'build', '-b', 'build'], function(err, result) {
      if (err) console.warn(err.toString().yellow);

      git.raw(['push', 'origin', 'build:gh-pages', '-f'], function(err, result) {
        if (err) console.error(err.toString().red);
      });
    })
  }
})