# ja_prep
prepping ja calendars

## Creating the bookmarklet for WebPack build
```javascript
javascript:(function(){
    document.getElementsByTagName('body')[0]
    .appendChild(document.createElement('script'))
    .src='https://rawgit.com/jluckyiv/ja_prep/master/bundle.js'+Math.random();
}());
```
## Creating the bookmarklet with Elm

```javascript
javascript:(function() {
  var elmDiv = document.createElement("div");
  elmDiv.id="elm";

  var elmJs = document.createElement("script");
  elmJs.src="https://rawgit.com/jluckyiv/ja_prep/master/elm.js";
  elmJs.onload=function() {
     var node = document.getElementById('elm');
     Elm.App.embed(node);
  };

  document.body.appendChild(elmDiv);
  document.body.appendChild(elmJs);
})()
```
