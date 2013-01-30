require.config({
  paths: {
    jQuery: 'libs/jquery',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    'Backbone.Validation': 'libs/backbone.validation',
    text: 'libs/text',
    templates: '../templates',
    transition: 'libs/bootstrap/js/bootstrap-transition',
    carousel:   'libs/bootstrap/js/bootstrap-carousel',
    utilities: 'libs/utilities'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    //'jQuery': { exports: ['$'] },
    'Backbone.Validation': ['Backbone'],
    'transition': ['jQuery'],
    'carousel': ['transition'],
    'utilities': ['jQuery', 'Backbone', 'Backbone.Validation'],
    'app': ['Backbone', 'carousel', 'Backbone.Validation', 'utilities']
  }
});

require(['app'], function(app) {
  app.initialize();
});
