# ja_prep
prepping ja calendars

## Creating the dev bookmarklet for WebPack build
```javascript
javascript:(function(){
    document.getElementsByTagName('body')[0]
    .appendChild(document.createElement('script'))
    .src='https://cdn.jsdelivr.net/gh/jluckyiv/ja_prep@master/dist/bundle.js?'+Math.random();
}());
```

## Creating the production bookmarklet for WebPack build
```javascript
javascript:(function(){
    document.getElementsByTagName('body')[0]
    .appendChild(document.createElement('script'))
    .src='https://cdn.jsdelivr.net/gh/jluckyiv/ja_prep@7badb987/dist/bundle.js?'+Math.random();
}());
```

## Creating the bookmarklet with Elm

```javascript
javascript:(function() {
  var elmDiv = document.createElement("div");
  elmDiv.id="elm";

  var elmJs = document.createElement("script");
  elmJs.src="https://cdn.jsdelivr.net/gh/jluckyiv/ja_prep@master/elm.js"+Math.random();
  elmJs.onload=function() {
     var node = document.getElementById('elm');
     Elm.App.embed(node);
  };

  document.body.appendChild(elmDiv);
  document.body.appendChild(elmJs);
})()
```
