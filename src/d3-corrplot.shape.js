/**
 * Orders are similar to modules, only they do not use the same namespace as
 * the Core, but defined a sub-namespace of their own.
 * @param {Object} The Object that the Corrplot gets attached to in
 * Corrplot.init.js.  If the Corrplot was not loaded with an AMD loader such as
 * require.js, this is the global Object.
 */
function initCorrplotShape(context) {
  'use strict';

  var Corrplot = context.Corrplot;

  Corrplot.Shape = {
    Square: function (width) {
      return 'M -' + width / 2 + ',' + '-' + width / 2 + ' h ' + width + ' v ' + width + ' h -' + width + ' Z';
    },
    Circle: function (r) {
      return 'M -' + r + ',0 ' +
          'a ' + r + ',' + r + ' 0 1,0 ' + r * 2 + ',0 ' +
          'a ' + r + ',' + r + ' 0 1,0 -' + r * 2 + ',0';
    },
    Ellipse: function (rho, width, segments) {
      if (arguments.length === 2) segments = 180;

      var delta = Math.acos(rho),
          scale = width / 2;

      // http://www.jstor.org/stable/2684435
      return d3.svg.line()(d3.range(0, 180).map(function (i) {
        var theta = i * Math.PI / 90;
        return [Math.cos(theta + delta / 2) * scale, Math.cos(theta - delta / 2) * scale];
      }));
    }
  };

  if (d3.superformula !== undefined) {
    Corrplot.Shape = {
      Square: function (width, segments) {
        if (arguments.length === 1) segments = 180;

        return d3.superformula().type('square').size(width * width).segments(segments)();
      },
      Circle: function (r, segments) {
        if (arguments.length === 1) segments = 180;

        return d3.superformula().type('circle').size(r * r * 2).segments(segments)();
      },
      Ellipse: Corrplot.Shape.Ellipse
    };
  }
}