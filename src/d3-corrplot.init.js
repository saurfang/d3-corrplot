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
