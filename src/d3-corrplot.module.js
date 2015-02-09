// Your Corrplot may have many modules.  How you organize the modules is up to
// you, but generally speaking it's best if each module addresses a specific
// concern.  No module should need to know about the implementation details of
// any other module.

// Note:  You must name this function something unique.  If you end up
// copy/pasting this file, the last function defined will clobber the previous
// one.
function initCorrplotModule (context) {

  'use strict';

  var Corrplot = context.Corrplot;


  // A Corrplot module can do two things to the Corrplot Object:  It can extend
  // the prototype to add more methods, and it can add static properties.  This
  // is useful if your Corrplot needs helper methods.


  // PRIVATE MODULE CONSTANTS
  //


  var MODULE_CONSTANT = true;


  // PRIVATE MODULE METHODS
  //


  /**
   *  An example of a private method.  Feel free to remove this.
   */
  function modulePrivateMethod () {
    return;
  }


  // Corrplot STATIC PROPERTIES
  //


  /**
   * An example of a static Corrplot property.  This particular static property
   * is also an instantiable Object.
   * @constructor
   */
  Corrplot.CorrplotHelper = function () {
    return this;
  };


  // Corrplot PROTOTYPE EXTENSIONS
  //
  // A module can extend the prototype of the Corrplot Object.


  /**
   * An example of a prototype method.
   * @return {string}
   */
  Corrplot.prototype.alternateGetReadOnlyVar = function () {
    // Note that a module can access all of the Corrplot instance variables with
    // the `this` keyword.
    return this._readOnlyVar;
  };


  if (DEBUG) {
    // DEBUG CODE
    //
    // Each module can have its own debugging section.  They all get compiled
    // out of the binary.
  }

}
