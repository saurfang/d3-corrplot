/**
 * Orders are similar to modules, only they do not use the same namespace as 
 * the Core, but defined a sub-namespace of their own.
 * @param {Object} The Object that the Corrplot gets attached to in
 * Corrplot.init.js.  If the Corrplot was not loaded with an AMD loader such as
 * require.js, this is the global Object.
 */
function initCorrplotOrder (context) {
  'use strict';

  var Corrplot = context.Corrplot;

  /*
   * The submodule constructor
   * @param {Object} opt_config Contains any properties that should be used to
   * configure this instance of the Corrplot.
   * @constructor
   */
  var submodule = Corrplot.Order = function(opt_config) {
    
    // defines a temporary variable, 
    // living only as long as the constructor runs.
    var constructorVariable = "Constructor Variable";
    
    // set an instance variable
    // will be available after constructor has run. 
    this.instanceVariable = null;

    // an optional call to the private method
    // at the end of the construction process
    this._privateMethod(constructorVariable);
  };

  // Corrplot PROTOTYPE EXTENSIONS
  /**
   * A public method of the submodule
   * @param {object} a variable to be set to the instance variable
   * @returns {object} the final value of the instance variable
   */
  submodule.prototype.publicMethod = function(value){
    if (value !== undefined) {
      this._privateMethod(value);
    }

    return this.instanceVariable;
  };

  submodule.prototype.Original = function(n) {
    if(Array.isArray(n)) n = n.length;
    if(typeof (n) === 'object') n = n.nodes.length;

    return d3.range(n);
  };

  submodule.prototype.Alphabetical = function(nodes, fn) {
    if(arguments.length == 1) fn = function(d) { return d; };

    return d3.range(nodes.length).sort(function (a, b) {
      return d3.ascending(fn(nodes[a]), fn(nodes[b]));
    });
  };

  submodule.prototype.AOE = function(matrix) {
    if(!Array.isArray(matrix)) matrix = matrix.matrix;

    var eigvec = numeric.eig(matrix).E.x;
    var alpha = d3.range(matrix.length).map(function (i) {
      var e1 = eigvec[i][0], e2 = eigvec[i][1];
      return Math.atan(e2 / e1) + (e1 > 0 ? 0 : Math.PI);
    });
    return d3.range(matrix.length).sort(function (a, b) {
      return alpha[a] - alpha[b];
    });
  };

  submodule.prototype.FPC = function(matrix) {
    if(!Array.isArray(matrix)) matrix = matrix.matrix;

    var eigvec = numeric.eig(matrix).E.x;
    var e1 = eigvec.map(function(d) { return d[0]; });
    return d3.range(matrix.length).sort(function (a, b) {
      return e1[b] - e1[a];
    });
  };

  /** 
   * a private instance method
   * @param {object} a variable to be set to the instance variable
   * @returns {object} the final value of the instance variable
   */
  submodule.prototype._privateMethod = function(value){
    return this.instanceVariable = value;
  };
}