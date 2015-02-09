// Compiler directive for UglifyJS.  See Corrplot.const.js for more info.
if (typeof DEBUG === 'undefined') {
  DEBUG = true;
}


// Corrplot-GLOBAL CONSTANTS
//
// These constants are exposed to all Corrplot modules.


// GLOBAL is a reference to the global Object.
var Fn = Function, GLOBAL = new Fn('return this')();


// Corrplot-GLOBAL METHODS
//
// The methods here are exposed to all Corrplot modules.  Because all of the
// source files are wrapped within a closure at build time, they are not
// exposed globally in the distributable binaries.


/**
 * A no-op function.  Useful for passing around as a default callback.
 */
function noop() {
}


/**
 * Init wrapper for the core module.
 * @param {Object} The Object that the Corrplot gets attached to in
 * Corrplot.init.js.  If the Corrplot was not loaded with an AMD loader such as
 * require.js, this is the global Object.
 */
function initCorrplotCore(context) {


  // It is recommended to use strict mode to help make mistakes easier to find.
  'use strict';


  // PRIVATE MODULE CONSTANTS
  //


  // An example of a CONSTANT variable;
  var CORE_CONSTANT = true;


  // PRIVATE MODULE METHODS
  //
  // These do not get attached to a prototype.  They are private utility
  // functions.


  /**
   *  An example of a private method.  Feel free to remove this.
   *  @param {number} aNumber This is a parameter description.
   *  @returns {number} This is a return value description.
   */
  function corePrivateMethod(aNumber) {
    return aNumber;
  }


  /**
   * This is the constructor for the Corrplot Object.  Please rename it to
   * whatever your Corrplot's name is.  Note that the constructor is also being
   * attached to the context that the Corrplot was loaded in.
   * @param {Object} opt_config Contains any properties that should be used to
   * configure this instance of the Corrplot.
   * @constructor
   */
  var Corrplot = context.Corrplot = function (opt_config) {

    opt_config = opt_config || {};

    // INSTANCE PROPERTY SETUP
    //
    // Your Corrplot likely has some instance-specific properties.  The value of
    // these properties can depend on any number of things, such as properties
    // passed in via opt_config or global state.  Whatever the case, the values
    // should be set in this constructor.

    // Instance variables that have a leading underscore mean that they should
    // not be modified outside of the Corrplot.  They can be freely modified
    // internally, however.  If an instance variable will likely be accessed
    // outside of the Corrplot, consider making a public getter function for it.
    this._readOnlyVar = 'read only';

    // Instance variables that do not have an underscore prepended are
    // considered to be part of the Corrplot's public API.  External code may
    // change the value of these variables freely.
    this.readAndWrite = 'read and write';

    return this;
  };


  // Corrplot PROTOTYPE METHODS
  //
  // These methods define the public API.


  /**
   * An example of a protoype method.
   * @return {string}
   */
  Corrplot.prototype.getReadOnlyVar = function () {
    return this._readOnlyVar;
  };


  /**
   * This is an example of a chainable method.  That means that the return
   * value of this function is the Corrplot instance itself (`this`).  This lets
   * you do chained method calls like this:
   *
   * var myCorrplot = new Corrplot();
   * myCorrplot
   *   .chainableMethod()
   *   .chainableMethod();
   *
   * @return {Corrplot}
   */
  Corrplot.prototype.chainableMethod = function () {
    return this;
  };


  // DEBUG CODE
  //
  // With compiler directives, you can wrap code in a conditional check to
  // ensure that it does not get included in the compiled binaries.  This is
  // useful for exposing certain properties and methods that are needed during
  // development and testing, but should be private in the compiled binaries.


  if (DEBUG) {
    GLOBAL.corePrivateMethod = corePrivateMethod;
  }

}
