require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    text: '/js/libs/text',
    templates: '../templates',
    transition: '/js/libs/bootstrap/js/bootstrap-transition',
    carousel:   '/js/libs/bootstrap/js/bootstrap-carousel'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    'transition': ['jQuery'],
    'carousel': ['transition'],
    'app': ['Backbone', 'carousel']
  }
});

require(['app'], function(app) {
  app.initialize();
});
