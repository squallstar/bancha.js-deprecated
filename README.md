# Bancha.js

This is a port of [Bancha CMS](https://github.com/squallstar/bancha) for **Node.js**. Currently under development, not for use yet.

# How to run the server

```
npm install bancha --save
```

```javascript
var bancha = require('bancha');

bancha().start(function () {
  console.log('Yipee!');
});
```

## Default options

Usage: `bancha(options).start(fn)`

```javascript
bancha({

  host: "localhost",

  port: 80,

  database: {
    // This can be any connection string supported by Sequelize
    url: "sqlite://db.sqlite"
  },

  // By default, __dirname of the bootstrap script will be used
  app_path: 'path/to/dir/'
})
```