$( document ).ready(function() {
  'use strict';

  var counter = 1;

  var setUrl = function (pageCount) {
    var url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=38ebaada8366e437d637ddfb76023f44&page=" +
    pageCount + "&format=json";
    return url;
  };

  var maxPages = 1;

  var requestFromFlickr = function(url) {
    $.ajax(setUrl(counter), { dataType: 'jsonp', jsonp: 'jsoncallback' })
      .then(function(data, status, xhr) {
        counter += 1;
        maxPages = data.photos.pages;

        displayPhotos(data, status, xhr);
      }, function(xhr, status, error){
        console.log('You have created some error Now');
        console.log(error);
      });
  };

  var getDocHeight = function() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
  };

  var displayPhotos = function (data, status, xhr) {
    var currentRow = data.photos.photo;
    currentRow.forEach(function (photo, index) {

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
      setUrl(counter);
    });
  };

  var checkScrolling = function () {
    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() === getDocHeight()) {
        if (counter <= maxPages) {
          requestFromFlickr(setUrl(counter));
        }
      }
    });
  };

  requestFromFlickr(setUrl(counter));
  checkScrolling();


});

