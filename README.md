# Bancha.js

## WIP

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