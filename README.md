# ja_prep
prepping ja calendars

## Creating the bookmarklet
```javascript
javascript: (function () {var app = document.createElement('script');app.setAttribute('src', 'https://rawgit.com/jluckyiv/ja_prep/master/index.js');document.body.appendChild(app);var elmContainer = document.createElement('div');elmContainer.setAttribute('id', 'elm-container');var embed = document.createElement('script');embed.setAttribut('src', 'https://rawgit.com/jluckyiv/ja_prep/master/embed.js');elmContainer.appendChild(embed);}());
```
