var url =  'https://rawgit.com/jluckyiv/ja_prep/master/elm.js?'
var source = url + Math.random();
var divId = 'elm';
var scriptId = 'elm-script';
var body = document.getElementsByTagName('body')[0];

// Remove old script and elm div
var oldScript = document.getElementById(scriptId);
if (oldScript) { body.removeChild(oldScript); }
var oldDiv = document.getElementById(divId)
if (oldDiv) { body.removeChild(oldDiv); }

// Add new script and elm div
var div = document.createElement('div');
div.id = divId;
var script = document.createElement('script');
script.id = scriptId;
script.src = source;
script.onload=function() {
  var node = document.getElementById(divId);
  Elm.App.embed(node);
};
body.appendChild(div);
body.appendChild(script);
