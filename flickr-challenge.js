$( document ).ready(function() {


var counter = 1;
var url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=38ebaada8366e437d637ddfb76023f44&page=" + 
  counter + "&format=json";


var requestFromFlickr = function(url) {
$.ajax(url, { dataType: 'jsonp', jsonp: 'jsoncallback' })
.then(function(data, status, xhr) {
  displayPhotos(data, status, xhr); }, function(xhr, status, error){
  console.log('You have created some error Now');
  console.log(error);
});

};
var displayPhotos = function (data, status, xhr) {
  console.log(status);
  console.log(data.photos.photo[0]);

  var currentRow = data.photos.photo;

  currentRow.forEach(function (photo, index) {

    var nextDiv = $('<div/>', {
      'class': 'photo_square'
    });
    console.log('Creating the number ' + index + ' photo div');

    $(nextDiv).appendTo('div.container');
    console.log('Appending #'+ index + ' to container');

    var imgUrl = 'https://farm' + photo.farm +
      '.staticflickr.com/' + photo.server +
      '/' + photo.id + '_' + photo.secret +
      '.jpg';
    console.log('Building #' + index + ' image url');

    var nextImg =  $('<img>', { src : imgUrl,
      alt: "View on Flickr",
      size: "100%"});
    console.log('Adding #' + index + ' img tag');

    $(nextImg).appendTo('div.photo_square:last-child');
    console.log('Appending #' + index + ' to its div');

    $(nextImg).wrap($('<a></a>', {href: imgUrl}));
    console.log('Wrapping #' + index + ' with an a tag');

  });


};

requestFromFlickr(url);

});


