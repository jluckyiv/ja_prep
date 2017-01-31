var elmDiv = document.createElement("div");
elmDiv.id="elm";

var elmJs = document.createElement("script");
elmJs.src="https://rawgit.com/jluckyiv/ja_prep/master/elm.js"+Math.random();
elmJs.onload=function() {
  var node = document.getElementById('elm');
  Elm.App.embed(node);
};

document.body.appendChild(elmDiv);
document.body.appendChild(elmJs);
