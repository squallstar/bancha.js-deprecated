# Bancha.js

This is a port of [Bancha CMS](https://github.com/squallstar/bancha) for **Node.js**. Currently under development, not for use yet.

```
npm install bancha --save
```

```javascript
var bancha = require('bancha');

bancha({
  host: 'localhost'
  port: 80
})
.start(function () {
  console.log('Server started');
});
```