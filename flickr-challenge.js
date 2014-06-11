$( document ).ready(function() {

var url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=38ebaada8366e437d637ddfb76023f44&format=json";

$.ajax(url, { dataType: 'jsonp', jsonp: 'jsoncallback' })
.then(function (data, status, xhr) {
  console.log(status);
  console.log(data.photos.photo[0]);

var currentPhoto = data.photos.photo[0];

var imgUrl = 'https://farm' + currentPhoto.farm + 
  '.staticflickr.com/' + currentPhoto.server + 
  '/' + currentPhoto.id + '_' + currentPhoto.secret +
  '.jpg';
 
var spam =  $('<img>', { src : imgUrl });

$(spam).insertAfter('h1');


}, function(xhr, status, error){
  console.log('You have created some error Now');
  console.log(error);
});

});


