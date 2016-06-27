# loopback-type-definitions
Typescript definitions for loopback ⚠️ WORK IN PROGRESS ⚠️

## Usage

Eventually, these will/should be added to the [typings registry](https://github.com/typings/registry) and installed thus.

The current hacky solution is:

1. Use VS Code or a tool that recognizes typescript definitions in JavaScript projects
  1. [Create VS Code `jsconfig.json`](https://code.visualstudio.com/Docs/runtimes/nodejs)
2. Copy these `.d.ts` files into your project (e.g. in a directory named `/types`). VS Code will automatically include them as long as you didn't exclude that directory in step 1.i
2. Indicate that your variable is a certain type using [jsdoc annotations](http://usejsdoc.org/). *TODO: add link to strongblog post once it's up*:
  * see [example](#user-content-example) below

## Video explanation
[![Video demonstrating the process described on this page](https://img.youtube.com/vi/AIs_n-eZhsE/0.jpg)](https://www.youtube.com/watch?v=AIs_n-eZhsE)

## Example

`/models/Customer.json`
```js
/**
 * @param {Loopback.ModelConstructor} Customer
 * @return {Loopback.ModelConstructor}
 */
module.exports = function(Customer){
  //...
  return Customer;
};
```

`/server/model-config.js`
```js
/** 
 * @type {Loopback.ModelConfig}
 */
var conf;

conf = {
  'Customer' : {
    datasource : process.env.CUSTOMER_DATASOURCE
  }
};

module.exports = conf;
```

![model-config.js with type-hints](http://i.imgur.com/UZmGJM2.png)
