$( document ).ready(function() {
  'use strict';

  var counter = 1;



  var maxPages = 1;

  var requestFromFlickr = function() {
    var data = {
      method: 'flickr.interestingness.getList',
      api_key: '38ebaada8366e437d637ddfb76023f44',
      page: counter,
      format: 'json'
    };
    $.ajax('https://api.flickr.com/services/rest/', { data: data, dataType: 'jsonp', jsonp: 'jsoncallback' })
      .then(function(data, status, xhr) {
        counter += 1;
        maxPages = data.photos.pages;

        displayPhotos(data, status, xhr);
      }, function(xhr, status, error){

      });
  };

  var displayPhotos = function (data, status, xhr) {
    var photoArray = data.photos.photo;
    photoArray.forEach(function (photo, index) {

      var nextDiv = $('<div/>', {
        'class': 'photo_square'
      });

      $(nextDiv).appendTo('div.container');

      var imgUrl = 'https://farm' + photo.farm +
        '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret +
        '.jpg';

      var nextImg =  $('<img>', { src : imgUrl,
        alt: "View on Flickr",
        size: "100%"});

      $(nextImg).appendTo(nextDiv);

      $(nextImg).wrap($('<a></a>', {href: imgUrl}));
    });
  };

  var checkScrolling = function () {
    $(window).scroll(function() {
      if($(window).scrollTop() +
        $(window).height() === $(document).height()) {
          if (counter <= maxPages) {
            requestFromFlickr();
          }
      }
    });
  };

  requestFromFlickr();
  checkScrolling();


});

