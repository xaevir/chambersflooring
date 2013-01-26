define(function(require) {

  //var Router = require('router')

  var Router = Backbone.Router.extend({
    currentView: null,

    routes: {
      "": "index",
    },

    changeView: function(view) {
      if ( null != this.currentView ) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },

    index: function() {
      this.carouselEl = $('#myCarousel')
      this.carouselEl.one('start-carousel', this.carousel) 
      this.carouselEl.on('slid', this.carousel) 
      this.carouselEl.on('slide', this.stop) 

      // kick it off
      this.carouselEl.carousel({
        interval: 10000
      })
    },
    carousel: function(){
        var notActive = $("#myCarousel .item").not('.active').find('img')
        notActive.css('top', '0px')

        this.animatedEl = $('.active img')
        this.animatedEl.animate({
          top: '-100px',
          }, 8000, function() {
        });
    },
    stop: function(){
      this.animatedEl.stop(true)
    }
  });

  return new Router();
});
