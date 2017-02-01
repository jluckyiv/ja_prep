var url = 'https://rawgit.com/jluckyiv/ja_prep/master/dist/bundle.js?';
var source = url + Math.random();
var id = 'ja_prep';
var body = document.getElementsByTagName('body')[0];

// Remove old script
var oldScript = document.getElementById(id);
if (oldScript) { body.removeChild(oldScript); }

// Append new script
var script = document.createElement('script');
script.id = 'ja_prep';
script.src = source;
body.appendChild(script);
