// It is recmommended to use strict mode to help make mistakes easier to find.
'use strict';


// LIBRARY-GLOBAL CONSTANTS
//
// These constants are exposed to all library modules.


// GLOBAL is a reference to the global Object.
var Fn = Function, GLOBAL = Fn('return this')();


// LIBRARY-GLOBAL METHODS
//
// The methods here are exposed to all library modules.  Because all of the
// source files are wrapped within a closure at build time, they are not
// exposed globally in the distributable binaries.


// Compile-time define for UglifyJS.
if (typeof DEBUG === 'undefined') {
  var DEBUG = true;
}


/**
 * A no-op function.  Useful for passing around as a default callback.
 */
function noop () { }


/**
 * @param {Object} The Object that the library gets attached to in
 * library.init.js.  If the library was not loaded with an AMD loader such as
 * require.js, this is the global Object.
 */
function libraryCore (context) {


  // PRIVATE MODULE CONSTANTS
  //


  // An example of a CONSTANT variable;
  var CORE_CONSTANT = true;


  // PRIVATE MODULE METHODS
  //
  // These do not get attached to the prototype of the method.  They are
  // private utility functions.


  /**
   *  An example of a private method.  Feel free to remove this.
   *  @param {number} aNumber This is a parameter description.
   *  @returns {number} This is a return value description.
   */
  function corePrivateMethod (aNumber) {
    return aNumber;
  }


  /**
   * This is the constructor for the library function.  Please rename it to
   * whatever your library's name is.
   * @param {Object} opt_config Contains any properties that should be used to
   * configure this instance of the library.
   * @constructor
   */
  function Library (opt_config) {

    opt_config = opt_config || {};

    // INSTANCE PROPERTY SETUP
    //
    // Your library likely has some instance-specific properties.  The value of
    // these properties can depend on any number of things, such as properties
    // passed in via opt_config or global state.  Whatever the case, the value
    // should be set in this constructor.

    // Instance variables that have an underscore prepended mean that should
    // not be modified outside of the library.  They can be freely modified by
    // library methods, however.  If an instance variable will likely be
    // accessed outside of the library, consider making a public getter
    // function for it.
    this._readOnlyVar = 'read only';

    // Instance variables that do not have an underscore prepended are
    // considered to be part of the library's public API.  External code may
    // change the value of these variables freely.
    this.readAndWrite = 'read and write';

    return this;
  }


  // LIBRARY PROTOTYPE METHODS
  //
  // These methods define the public API.


  /**
   * An example of a protoype method.
   * @return {string}
   */
  Library.prototype.getReadOnlyVar = function () {
    return this._readOnlyVar;
  };


  /**
   * This is an example of a chainable method.  That means that the return
   * value of this function is the library instance itself.  Chaining lets you
   * do chained method calls like this:
   *
   * var myLibrary = new Library();
   * myLibrary
   *   .chainableMethod()
   *   .chainableMethod();
   *
   * @return {Library}
   */
  Library.prototye.chainableMethod = function () {
    return this;
  };

}