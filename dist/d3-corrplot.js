/*! d3-corrplot - v0.0.1 - 2015-03-01 - Jeremy Kahn */
;(function (global) {

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

// Your Corrplot may have many modules.  How you organize the modules is up to
// you, but generally speaking it's best if each module addresses a specific
// concern.  No module should need to know about the implementation details of
// any other module.

// Note:  You must name this function something unique.  If you end up
// copy/pasting this file, the last function defined will clobber the previous
// one.
function initCorrplotChart(context) {

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
  function modulePrivateMethod() {
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

  d3.chart('corrplot', {
    initialize: function () {
      var chart = this;

      //initialize variables with default values
      this._loadDefaults(chart);

      var corrplotBase = this.base
          .attr('height', this.w + this.margin.top + this.margin.bottom)
          .attr('width', this.w + this.margin.left + this.margin.right)
          .style('margin-left', -this.margin.left + 'px')
          .append('g')
          .classed('corrplot', true)
          .attr('transform', 'translate (' + this.margin.left + ',' + this.margin.top + ')');

      //var corrplotBackground = corrplotBase.append('rect')
      //    .attr('class', 'background')
      //    .attr('width', this.w)
      //    .attr('height', this.w);

      this.layer('rows', corrplotBase, {
        dataBind: function (data) {
          var chart = this.chart(),
              matrix = data.matrix,
              order = data.order;

          //initialize x domain use order
          if (order === undefined) {
            order = d3.range(data.nodes.length);
          }
          chart.x.domain(order);

          //initialize coordinates
          matrix = matrix.map(function (row, i) {
            return row.map(function (cell, j) {
              return {x: j, y: i, z: cell};
            });
          });

          // return a data bound selection for the passed in data.
          return this.selectAll('.row')
              .data(matrix);
        },
        insert: function () {
          var chart = this.chart();

          // setup the elements that were just created
          return this.append('g')
              .classed('row', true);
        },

        // setup an enter event for the data as it comes in:
        events: {
          'merge': function () {
            var chart = this.chart();

            return this
                .attr('transform', function (d, i) {
                  return 'translate(0,' + chart.x(i) + ')';
                })
                .each(row);
          },

          'exit': function () {
            this.remove();
          }
        }
      });

      function row(row) {
        var cells = d3.select(this).selectAll('.cell').data(row);
        //comes the new ones
        cells
            .enter().append('path')
            .attr('class', 'cell')
            .on('mouseover', chart._mouseover)
            .on('mouseout', chart._mouseout);

        //goes the old
        cells
            .exit()
            .remove();

        //everyone needs to readjust their sizes
        cells
            .attr('transform', function (d) {
              var halfWidth = chart.x.rangeBand() / 2;
              return 'translate(' + (chart.x(d.x) + halfWidth) + ',' + halfWidth + ')';
            })
            .attr('fill', chart.c)
          //.attr('width', chart.x.rangeBand())
          //.attr('height', chart.x.rangeBand())
            .attr('d', function (d) {
              return chart._shape(d, chart.x.rangeBand());
            });
      }

      this.layer('rows-header', corrplotBase.append('g'), {
        dataBind: function (data) {
          var chart = this.chart(),
              nodes = data.nodes;

          nodes.forEach(function (node, i) {
            node.index = i;
          });

          return this.selectAll('.row-header')
              .data(nodes);
        },
        insert: function () {
          var chart = this.chart();

          return this
              .append('text')
              .classed('row-header', true);
        },
        events: {
          'merge': function () {
            var chart = this.chart();

            return this
                .attr('transform', function (d, i) {
                  return 'translate(0,' + chart.x(i) + ')';
                })
                .attr('x', -6)
                .attr('y', chart.x.rangeBand() / 2)
                .attr('dy', '.32em')
                .attr('text-anchor', 'end')
                .text(function (d) {
                  return d.name;
                })
          },

          'exit': function () {
            this.remove();
          }
        }
      });

      this.layer('cols-header', corrplotBase.append('g'), {
        dataBind: function (data) {
          var chart = this.chart(),
              nodes = data.nodes;

          return this.selectAll('.col-header')
              .data(nodes);
        },
        insert: function () {
          var chart = this.chart();

          return this
              .append('text')
              .classed('col-header', true);
        },
        events: {
          'merge': function () {
            var chart = this.chart();

            //FIXME: Implement shift in x/y when rotation is not -90
            return this
                .attr('transform', function (d, i) {
                  return 'translate(' + chart.x(i) + ')rotate(' + chart.colRotation + ')';
                })
                .attr('x', 6)
                .attr('y', chart.x.rangeBand() / 2)
                .attr('dy', '.32em')
                .attr('text-anchor', 'start')
                .text(function (d) {
                  return d.name;
                })
          },

          'exit': function () {
            this.remove();
          }
        }
      });

      //this.layer('cols-grid', corrplotBase.append('g'), {
      //  dataBind: function (data) {
      //    var chart = this.chart(),
      //        nodes = data.nodes;
      //
      //    return this.selectAll('.col-grid')
      //        .data(nodes);
      //  },
      //  insert: function () {
      //    var chart = this.chart();
      //
      //    return this
      //        .append('line')
      //        .classed('col-grid', true);
      //  },
      //  events: {
      //    'merge': function () {
      //      var chart = this.chart();
      //
      //      return this
      //          .attr('transform', function (d, i) {
      //            return 'translate(' + chart.x(i) + ')rotate(-90)';
      //          })
      //          .attr('x1', -chart.w);
      //    },
      //
      //    'exit': function () {
      //      this.remove();
      //    }
      //  }
      //});
    },

    _loadDefaults: function () {
      this.x = d3.scale.ordinal();
      this.width(720);

      var c = d3.scale.linear()
          .domain([-1, 0, 1])
          .range(['#ef8a62', '#f7f7f7', '#67a9cf']);
      this.color(function (d) {
        return c(d.z);
      });

      this.duration(0);
      this.margin({top: 80, right: 0, bottom: 10, left: 80});
      this.rotatecols(-90);

      this.shape(function (d, width) {
        return Corrplot.Shape.Square(width);
      });

      //TODO: Implement default tips
      this.mouseover(function () {
      });
      this.mouseout(function () {
      });
    },

    // configures the width/height of the chart.
    // when called without arguments, returns the
    // current width/height.
    width: function (newWidth) {
      if (arguments.length === 0) {
        return this.w;
      }
      this.w = newWidth;

      //update x range
      this.x = this.x.rangeBands([0, newWidth]);

      //redraw to refelct the size change
      this.reDraw();

      return this;
    },

    // configures the margin of the chart.
    // when called without arguments, returns the
    // current margin.
    margin: function (newMargin) {
      if (arguments.length === 0) {
        return this.margin;
      }
      this.margin = newMargin;
      return this;
    },

    // configures the rotation of the column headers.
    // when called without arguments, returns the
    // current rotation.
    rotatecols: function (newRotation) {
      if (arguments.length === 0) {
        return this.colRotation;
      }
      this.colRotation = newRotation;
      return this;
    },

    // configures the color scale of the elements in the chart.
    // when called without arguments, returns the
    // current color scale.
    color: function (newColor) {
      if (arguments.length === 0) {
        return this.c;
      }
      this.c = newColor;
      return this;
    },

    // configures the animation duration
    // when called without arguments, returns the
    // current animation duration.
    duration: function (newDuration) {
      if (arguments.length == 0) {
        return this.d;
      }
      this.d = newDuration;
      return this;
    },

    // configures the animation duration
    // when called without arguments, returns the
    // current animation duration.
    mouseover: function (newMouseover) {
      if (arguments.length == 0) {
        return this._mouseover;
      }
      this._mouseover = newMouseover;
      return this;
    },

    // configures the animation duration
    // when called without arguments, returns the
    // current animation duration.
    mouseout: function (newMouseout) {
      if (arguments.length == 0) {
        return this._mouseout;
      }
      this._mouseout = newMouseout;
      return this;
    },

    // configures the order of rows/columns in the chart.
    // when called without arguments, returns the
    // current order.
    // when called with arguments after the first time,
    // rows and columns are shifted with animation
    order: function (newOrder) {
      if (arguments.length == 0) {
        return this.x.domain();
      }

      if (this.x.domain().length === 0) {
        this.x.domain(newOrder);
      } else {
        this.x.domain(newOrder);

        var x = this.x,
            width = this.w,
            duration = this.d,
            colRotation = this.colRotation,
            t = this.base.transition().duration(duration);

        t.selectAll('.row')
            .delay(function (d, i) {
              return x(i) / width * duration;
            })
            .attr('transform', function (d, i) {
              return 'translate(0,' + x(i) + ')';
            })
            .selectAll('.cell')
            .delay(function (d) {
              return x(d.x) / width * duration;
            })
            .attr('transform', function (d) {
              var halfWidth = x.rangeBand() / 2;
              return 'translate(' + (x(d.x) + halfWidth) + ',' + halfWidth + ')';
            });

        t.selectAll('.row-header')
            .delay(function (d, i) {
              return x(i) / width * duration;
            })
            .attr('transform', function (d, i) {
              return 'translate(0,' + x(i) + ')';
            });

        t.selectAll('.col-header')
            .delay(function (d, i) {
              return x(i) / width * duration;
            })
            .attr('transform', function (d, i) {
              return 'translate(' + x(i) + ')rotate(' + colRotation + ')';
            });
      }

      return this;
    },

    shape: function (newShape) {
      if (arguments.length == 0) {
        return this._shape;
      }

      if (this._shape === undefined) {
        this._shape = newShape;
      } else {
        this._shape = newShape;

        var x = this.x,
            duration = this.d,
            t = this.base.transition().duration(duration);

        t.selectAll('.cell')
            .attr('d', function (d) {
              return newShape(d, x.rangeBand());
            });
      }

      return this;
    },

    // draw and save the data for future redraw
    drawAndSave: function (data) {
      this._data = data;
      this.draw(data);
      return this;
    },
    reDraw: function () {
      if (this._data) {
        this.base
            .attr('height', this.w + this.margin.top + this.margin.bottom)
            .attr('width', this.w + this.margin.left + this.margin.right);

        return this.draw(this._data);
      }
      return this;
    }
  });


  if (DEBUG) {
    // DEBUG CODE
    //
    // Each module can have its own debugging section.  They all get compiled
    // out of the binary.
  }

}

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
          scale = width / 2,
          line = d3.svg.line()
              .x(function (d) {
                return d.x * scale;
              })
              .y(function (d) {
                return d.y * scale;
              });

      return line(d3.range(0, 180).map(function (i) {
        var theta = i * Math.PI / 90;
        return {'x': Math.cos(theta + delta / 2), 'y': Math.cos(theta - delta / 2)}
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
/**
 * Submodules are similar to modules, only they do not use the same namespace as 
 * the Core, but defined a sub-namespace of their own.
 * @param {Object} The Object that the Corrplot gets attached to in
 * Corrplot.init.js.  If the Corrplot was not loaded with an AMD loader such as
 * require.js, this is the global Object.
 */
function initCorrplotSubmodule (context) {
  'use strict';

  var Corrplot = context.Corrplot;

  /*
   * The submodule constructor
   * @param {Object} opt_config Contains any properties that should be used to
   * configure this instance of the Corrplot.
   * @constructor
   */
  var submodule = Corrplot.Submodule = function(opt_config) {
    
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

  /** 
   * a private instance method
   * @param {object} a variable to be set to the instance variable
   * @returns {object} the final value of the instance variable
   */
  submodule.prototype._privateMethod = function(value){
    return this.instanceVariable = value;
  };
}
/*global initCorrplotCore initCorrplotModule initCorrplotSubmodule */
var initCorrplot = function (context) {

  initCorrplotCore(context);
  initCorrplotShape(context);
  initCorrplotChart(context);
  initCorrplotModule(context);
  initCorrplotSubmodule(context);
  initCorrplotOrder(context);
  // Add a similar line as above for each module that you have.  If you have a
  // module named "Awesome Module," it should live in the file
  // "src/Corrplot.awesome-module.js" with a wrapper function named
  // "initAwesomeModule".  That function should then be invoked here with:
  //
  // initAwesomeModule(context);

  return context.Corrplot;
};


if (typeof define === 'function' && define.amd) {
  // Expose Corrplot as an AMD module if it's loaded with RequireJS or
  // similar.
  define(function () {
    return initCorrplot({});
  });
} else {
  // Load Corrplot normally (creating a Corrplot global) if not using an AMD
  // loader.
  initCorrplot(this);
}

} (this));
