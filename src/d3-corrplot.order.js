/**
 * Orders are similar to modules, only they do not use the same namespace as
 * the Core, but defined a sub-namespace of their own.
 * @param {Object} The Object that the Corrplot gets attached to in
 * Corrplot.init.js.  If the Corrplot was not loaded with an AMD loader such as
 * require.js, this is the global Object.
 */
function initCorrplotOrder(context) {
  'use strict';

  var Corrplot = context.Corrplot;

  Corrplot.Order = {
    Original: function (n) {
      if (Array.isArray(n)) n = n.length;
      if (typeof (n) === 'object') n = n.nodes.length;

      return d3.range(n);
    },

    Alphabetical: function (nodes, fn) {
      if (arguments.length == 1) fn = function (d) {
        return d;
      };

      return d3.range(nodes.length).sort(function (a, b) {
        return d3.ascending(fn(nodes[a]), fn(nodes[b]));
      });
    },

    AOE: function (matrix) {
      if (!Array.isArray(matrix)) matrix = matrix.matrix;

      var eigvec = numeric.eig(matrix).E.x;
      var alpha = d3.range(matrix.length).map(function (i) {
        var e1 = eigvec[i][0], e2 = eigvec[i][1];
        return Math.atan(e2 / e1) + (e1 > 0 ? 0 : Math.PI);
      });
      return d3.range(matrix.length).sort(function (a, b) {
        return alpha[a] - alpha[b];
      });
    },

    FPC: function (matrix) {
      if (!Array.isArray(matrix)) matrix = matrix.matrix;

      var eigvec = numeric.eig(matrix).E.x;
      var e1 = eigvec.map(function (d) {
        return d[0];
      });
      return d3.range(matrix.length).sort(function (a, b) {
        return e1[b] - e1[a];
      });
    }
  };
}