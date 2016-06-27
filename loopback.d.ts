declare namespace Loopback {
  export interface ModelConstructor {
//Event stuff//
    /**
     * @see https://docs.strongloop.com/display/public/APIC/Basic+model+object#Basicmodelobject-Events
     */
    on(event:'attached'|'dataSourceAttached'|'set', listener: Function);

//Find stuff//
    /**
     * Override this to customize core find behavior
     * 
     * @see https://apidocs.strongloop.com/loopback/#persistedmodel-find
     */
    find(filter : {
      fields : string|Object|Array<string>,
      limit : Number,
      order : String,
      skip : Number,
      where : Object
    }, callback: Loopback.findCallback) : PromiseLike<Array<Object>>;
//Remote method stuff//

    /**
     * The `loopback.Model.extend()` method calls this when you create a model that extends another model.
     * Add any setup or configuration code you want executed when the model is created.
     * See  [Setting up a custom model](http://docs.strongloop.com/display/LB/Extending+built-in+models#Extendingbuilt-inmodels-Settingupacustommodel).
     */
     setup(): void;

    /**
     * Check if the given access token can invoke the specified method.
     *
     * @param {Object} token The access token.
     * @param {*} modelId The model ID.
     * @param {Object} sharedMethod The method in question.
     * @param {Object} ctx The remote invocation context.
     * @callback {Function} callback The callback function.
     * @param {String|Error} err The error object.
     * @param {Boolean} allowed True if the request is allowed; false otherwise.
     */
     checkAccess(token: Object, modelId: any, sharedMethod: Object, ctx: Object, callback: (err:String|Error, allowed:boolean)=>void): void;

    /**
     * Get the `Application` object to which the Model is attached.
     *
     * @callback {Function} callback Callback function called with `(err, app)` arguments.
     * @param {Error} err Error object; see [Error object](http://docs.strongloop.com/display/LB/Error+object).
     * @param {Application} app Attached application object.
     * @end
     */
     getApp(callback: any /* jsdoc error */): void;

    /**
     * Enable remote invocation for the specified method.
     * See [Remote methods](http://docs.strongloop.com/display/LB/Remote+methods) for more information.
     *
     * Static method example:
     * ```js
     * Model.myMethod();
     * Model.remoteMethod('myMethod');
     * ```
     *
     * @param {String} name The name of the method.
     * @param {Loopback.RemoteMethodOptions} options The remoting options.
     * See [Remote methods - Options](http://docs.strongloop.com/display/LB/Remote+methods#Remotemethods-Options).
     */
     remoteMethod(name: String, options: Loopback.RemoteMethodOptions): void;

    /**
     * Disable remote invocation for the method with the given name.
     *
     * @param {String} name The name of the method.
     * @param {Boolean} isStatic Is the method static (eg. `MyModel.myMethod`)? Pass
     * `false` if the method defined on the prototype (eg.
     * `MyModel.prototype.myMethod`).
     */
     disableRemoteMethod(name: String, isStatic: Boolean): void;

    /**
    * Enabled deeply-nested queries of related models via REST API.
    *
    * @param {String} relationName Name of the nested relation.
    * @options {Object} [options] It is optional. See below.
    * @param {String} pathName The HTTP path (relative to the model) at which your remote method is exposed.
    * @param {String} filterMethod The filter name.
    * @param {String} paramName The argument name that the remote method accepts.
    * @param {String} getterName The getter name.
    * @param {Boolean} hooks Whether to inherit before/after hooks.
    * @callback {Function} filterCallback The Optional filter function.
    * @param {Object} SharedMethod object. See [here](https://apidocs.strongloop.com/strong-remoting/#sharedmethod).
    * @param {Object} RelationDefinition object which includes relation `type`, `ModelConstructor` of `modelFrom`, `modelTo`, `keyFrom`, `keyTo` and more relation definitions.
     */
     nestRemoting(relationName: String, options: any /* jsdoc error */, filterCallback: any /* jsdoc error */): void;



//Validatable stuff//

    /**
     * Validate presence of one or more specified properties.
     * Requires a model to include a property to be considered valid; fails when validated field is blank.
     *
     * For example, validate presence of title
     * ```
     * Post.validatesPresenceOf('title');
     * ```
     * Validate that model has first, last, and age properties:
     * ```
     * User.validatesPresenceOf('first', 'last', 'age');
     * ```
     * Example with custom message
     * ```
     * Post.validatesPresenceOf('title', {message: 'Cannot be blank'});
     * ```
     *
     * @param {String} propertyName  One or more property names.
     * @options {Object} errMsg Optional custom error message.  Default is "can't be blank"
     * @property {String} message Error message to use instead of default.
     */
    validatesPresenceOf(propertyName: String): void;

    /**
     * Validate absence of one or more specified properties.
     * A model should not include a property to be considered valid; fails when validated field not blank.
     *
     * For example, validate absence of reserved
     * ```
     * Post.validatesAbsenceOf('reserved', { unless: 'special' });
     * ```
     * @param {String} propertyName  One or more property names.
     * @options {Object} errMsg Optional custom error message.  Default is "can't be set"
     * @property {String} message Error message to use instead of default.
     */
    validatesAbsenceOf(propertyName: String): void;

    /**
     * Validate length. Require a property length to be within a specified range.
     * Three kinds of validations: min, max, is.
     *
     * Default error messages:
     *
     * - min: too short
     * - max: too long
     * - is:  length is wrong
     *
     * Example: length validations
     * ```
     * User.validatesLengthOf('password', {min: 7});
     * User.validatesLengthOf('email', {max: 100});
     * User.validatesLengthOf('state', {is: 2});
     * User.validatesLengthOf('nick', {min: 3, max: 15});
     * ```
     * Example: length validations with custom error messages
     * ```
     * User.validatesLengthOf('password', {min: 7, message: {min: 'too weak'}});
     * User.validatesLengthOf('state', {is: 2, message: {is: 'is not valid state name'}});
     * ```
     * @param {String} propertyName  Property name to validate.
     * @options {Object} Options See below.
     * @property {Number} is Value that property must equal to validate.
     * @property {Number} min Value that property must be less than to be valid.
     * @property {Number} max Value that property must be less than to be valid.
     * @property {Object} message Optional Object with string properties for custom error message for each validation: is, min, or max
     */
    validatesLengthOf(propertyName: String): void;

    /**
     * Validate numericality.  Requires a value for property to be either an integer or number.
     *
     * Example
     * ```
     * User.validatesNumericalityOf('age', { message: { number: '...' }});
     * User.validatesNumericalityOf('age', {int: true, message: { int: '...' }});
     * ```
     *
     * @param {String} propertyName  Property name to validate.
     * @options {Object} Options See below.
     * @property {Boolean} int If true, then property must be an integer to be valid.
     * @property {Object} message Optional object with string properties for 'int' for integer validation.  Default error messages:
     *
     * - number: is not a number
     * - int: is not an integer
     */
    validatesNumericalityOf(propertyName: String): void;

    /**
     * Validate inclusion in set.  Require a value for property to be in the specified array.
     *
     * Example:
     * ```
     * User.validatesInclusionOf('gender', {in: ['male', 'female']});
     * User.validatesInclusionOf('role', {
     *     in: ['admin', 'moderator', 'user'], message: 'is not allowed'
     * });
     * ```
     *
     * @param {String} propertyName  Property name to validate.
     * @options {Object} Options
     * @property {Array} inArray Property must match one of the values in the array to be valid.
     * @property {String} message Optional error message if property is not valid.   Default error message: "is not included in the list".
     */
    validatesInclusionOf(propertyName: String): void;

    /**
     * Validate exclusion.  Require a property value not be in the specified array.
     *
     * Example: `Company.validatesExclusionOf('domain', {in: ['www', 'admin']});`
     *
     * @param {String} propertyName  Property name to validate.
     * @options {Object} Options
     * @property {Array} inArray Property must match one of the values in the array to be valid.
     * @property {String} message Optional error message if property is not valid.  Default error message: "is reserved".
     */
    validatesExclusionOf(propertyName: String): void;

    /**
     * Validate format. Require a model to include a property that matches the given format.
     *
     * Require a model to include a property that matches the given format.  Example:
     * `User.validatesFormat('name', {with: /\w+/});`
     *
     * @param {String} propertyName  Property name to validate.
     * @options {Object} Options
     * @property {RegExp} with Regular expression to validate format.
     * @property {String} message Optional error message if property is not valid.  Default error message: " is invalid".
     */
    validatesFormatOf(propertyName: String): void;

    /**
     * Validate using custom validation function.
     *
     * Example:
     *
     *     User.validate('name', customValidator, {message: 'Bad name'});
     *     function customValidator(err) {
     *         if (this.name === 'bad') err();
     *     });
     *     var user = new User({name: 'Peter'});
     *     user.isValid(); // true
     *     user.name = 'bad';
     *     user.isValid(); // false
     *
     * @param {String} propertyName  Property name to validate.
     * @param {Function} validatorFn Custom validation function.
     * @options {Object} Options See below.
     * @property {String} message Optional error message if property is not valid.  Default error message: " is invalid".
     */
    validate(propertyName: String, validatorFn: Function): void;

    /**
     * Validate using custom asynchronous validation function.
     *
     *
     * Example:
     *```js
     *     User.validateAsync('name', customValidator, {message: 'Bad name'});
     *     function customValidator(err, done) {
     *         process.nextTick(function () {
     *             if (this.name === 'bad') err();
     *             done();
     *         });
     *     });
     *     var user = new User({name: 'Peter'});
     *     user.isValid(); // false (because async validation setup)
     *     user.isValid(function (isValid) {
     *         isValid; // true
     *     })
     *     user.name = 'bad';
     *     user.isValid(); // false
     *     user.isValid(function (isValid) {
     *         isValid; // false
     *     })
     *```
     * @param {String} propertyName  Property name to validate.
     * @param {Function} validatorFn Custom validation function.
     * @options {Object} Options See below
     * @property {String} message Optional error message if property is not valid.  Default error message: " is invalid".
     */
    validateAsync(propertyName: String, validatorFn: Function): void;

    /**
     * Validate uniqueness. Ensure the value for property is unique in the collection of models.
     * Not available for all connectors. Currently supported with these connectors:
     *  - In Memory
     *  - Oracle
     *  - MongoDB
     *
     * ```
     * // The login must be unique across all User instances.
     * User.validatesUniquenessOf('login');
     *
     * // Assuming SiteUser.belongsTo(Site)
     * // The login must be unique within each Site.
     * SiteUser.validateUniquenessOf('login', { scopedTo: ['siteId'] });
     * ```
    
     * @param {String} propertyName  Property name to validate.
     * @options {Object} Options See below.
     * @property {RegExp} with Regular expression to validate format.
     * @property {Array.<String>} scopedTo List of properties defining the scope.
     * @property {String} message Optional error message if property is not valid.  Default error message: "is not unique".
     */
    validatesUniquenessOf(propertyName: String): void;
  }

  /**
   * A loopback find callback
   * typically returns an array of instances
   * pass no error if results good
   */
  interface findCallback { (error?: Error, result: Array<Object>) : void }

  interface RemoteMethodOptions {
    /**
     * Defines arguments that the remote method accepts. These arguments map to the static method you define. For the example above, you can see the function signature:
Person.greet(name, age, callback)...
`name` is the first argument, `age` is the second argument and callback is automatically provided by LoopBack (do not specify it in your `accepts` array). For more info, see Argument descriptions.
Default if not provided is the empty array, [].
{  ...
  accepts: [
   {arg: 'name', type: 'string'},
   {arg: 'age', type: 'number'},...],
  ... }
     */
    accepts: Array<Loopback.RemoteMethodArgument>;

    /**
     * Text description of the method, used by API documentation generators such as Swagger.
    You can put long strings in an array if needed (see note below).
    */
    description?: String|String[];	
 
    http: {
      /**
       * HTTP path (relative to the model) at which the method is exposed.
       * ```
       * http: {path: '/sayhi'}
       * ```
       */
      path?: String;
      /**
       * HTTP method (verb) at which the method is available.
       * ```
       * http: {path: '/sayhi', verb: 'get'}
       * ```
       * default = post
       */
      verb?: 'get' | 'post' | 'patch' | 'put' | 'del' | 'all';

      /**
       * status	Default HTTP status set when the callback is called without an error.
       * ```
       * {status: 201}
       * ```
       */
      status?: Number; 

      /**
       * errorStatus	Default HTTP status set when the callback is called with an error.
       * ```
       * {errorStatus: 400}
       * ```
       */
      errorStatus?: Number;
    }
    /**
     * 
     * Boolean. Whether the method is static (eg. `MyModel.myMethod`). Use `false` to define the method on the prototype (for example, `MyModel.prototype.myMethod`). Default is true.
     * default: true
     */ 
    isStatic?:	Boolean;

    /**
     *
Additional notes, used by API documentation generators like Swagger.
You can put long strings in an array if needed (see note below). 
      */
    notes? : String | String[];	

    /**
     * Describes the remote method's callback arguments; See Argument descriptions. The err argument is assumed; do not specify.
     * Default if not provided is the empty array,  [].
     * ```
     * returns: {arg: 'greeting', type: 'string'}`
     * ```
    */ 
    returns: Loopback.RemoteMethodArgument;
  }

  interface RemoteMethodArgument {
    /**
     * 	Argument name
     */
    arg:	String;
    /**
     * A text description of the argument. This is used by API documentation generators like Swagger.
You can split long descriptions into arrays of strings (lines) to keep line lengths manageable.
```
[
 "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
 "sed do eiusmod tempor incididunt ut labore et dolore",
 "magna aliqua."
] 
```
     */
    description:	String | String[];
    /**
     * http	Object or Function	For input arguments: a function or an object describing mapping from HTTP request to the argument value. See HTTP mapping of input arguments below.
     * http.target	
     * Map the callback argument value to the HTTP response object. The following values are supported.

* * status sets the res.statusCode to the provided value
* * header sets the http.header or arg named header to the value
     */
    http : Object;

    /**
     * 	True if argument is required; false otherwise.
     */
    required:	Boolean;

    /**
     * 	For callback arguments: set this property to true if your function has a single callback argument to use as the root object returned to remote caller. Otherwise the root object returned is a map (argument-name to argument-value).
     */
    root:	Boolean
    
    /**
     * 	Argument datatype; must be a Loopback type. Additionally, callback arguments allow a special type "file"; see below.
     */
    type: "any" | "Array" | "Boolean" | "Buffer" | "Date" | "GeoPoint" | "null" | "Number" | "Object" | "String";

    /**
     *	Default value that will be used to populate loopback-explorer input fields and swagger documentation. Note: This value will not be passed into remote methods function if argument is not present.
     */
    default:	String;
  }
}