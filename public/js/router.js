define(function(require) {

  var ContactView = require('views/contact')

  var Router = Backbone.Router.extend({
    currentView: null,

    initialize: function() {
      _.bindAll(this) 
      var path = window.location.pathname;
      var page = path.substring(path.lastIndexOf('/') + 1);
      this.activePage(page)
      if (page === 'contact')
        this.contact()
      if (page === '')
        this.index()

    },

    routes: {
      //"": "index",
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
    },

    contact: function() {
      var view = new ContactView({el: $('.contact')} )
      $('#app').html(view.render().el)
      document.title = 'Contact'
    },

    activePage: function(page) {
      if (page === '') 
        var hrefString = "a[href='/']"
      else
        var hrefString = "a[href='/" + page + "']"
      var el = $(hrefString, '.navbar');
      if (el.parent().hasClass('active')) return
      else {
        $('.navbar li.active').removeClass('active')
        var parent = el.parent() 
        parent.addClass('active')
      }
    }
  });

  return new Router();
});
