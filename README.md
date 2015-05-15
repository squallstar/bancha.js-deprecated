# Bancha.js

This is a port of [Bancha CMS](https://github.com/squallstar/bancha) for **Node.js**. Currently under development, not for use yet.

# Basic usage

```
npm install bancha --save
```

```javascript
var bancha = require('bancha');

bancha().start(function () {
  console.log('Yipee!');
});
```

And then, just open your browser at [http://localhost](http://localhost) to finish the install.

## Default options

Usage: `bancha(options).start(fn)`

```javascript
bancha({

  host: 'localhost',

  port: 80,

  interface: '0.0.0.0',

  database: {
    // This can be any connection string supported by Sequelize
    url: "sqlite://db.sqlite"
  },

  // By default, __dirname of the bootstrap script will be used
  appPath: 'path/to/dir/',

  // Defaults to "admin".
  adminPath: 'path/to/admin/'
})
```