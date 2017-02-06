app.service('GifGetter',function($http){

  var publicAPIkey='dc6zaTOxFJmzC';
  var giphyUrl='http://api.giphy.com/v1/gifs/';

//get random gif
  this.randomGif=function(){
    return $http({
      url: giphyUrl + 'random?api_key=' + publicAPIkey,
      type:'GET'
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log('error');
    });
  };

//get searched gif function
this.collection=[];

this.searchGif=function(query){
  return $http({
    url: giphyUrl + 'search?q='+query+'&api_key=' + publicAPIkey,
    type:'GET',
    params:{"rating":'g',"limit":50}
  }).then(function(response){
    return response.data.data;
    collection=response.data.data;
  }).catch(function(err){
    console.log('error');
  });
};


this.favcount=function(){
  return $http({
          method:'GET',
          url:'/favscount',
          // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response){
          return response;
          console.log('got a response from the server favscount', response);
        }).catch(function(err){
          console.log('error');
        });
};




});
