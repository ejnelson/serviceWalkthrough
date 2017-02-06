var app=angular.module('myApp',['ngRoute']);

  app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
      templateUrl:'views/pages/home.html',
      // template:'<div>dafdafsdfasdffasdfasdffsdafasdfasdfasdf</div>',
      controller: 'GifController as vm'
    }).when('/favs',{
      templateUrl:'views/pages/favs.html',
      controller:'FavsController as favCtrl'
    });
    $locationProvider.html5Mode(true);
  });



app.controller('FavsController',function($http,GifGetter){
    var favCtrl=this;
    GifGetter.favcount().then(function(res){
      favCtrl.favcount=res.data.rows[0].count;

    });
    console.log('favs controller loaded');
    favCtrl.favlist=[];
    $http({
              method:'GET',
              url:'/favs',
              // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(response){
              favCtrl.favlist=response.data;
              console.log('got a response from the server get', response.data);
            }).catch(function(err){
              console.log('error');
            });
});

app.controller('GifController',function(GifGetter,$http){
    console.log('connected');

    var vm=this;
    vm.searchQuery='';
    vm.giflist=[];
    vm.favlist=[];

    vm.favcount=0;

    GifGetter.favcount().then(function(res){
      vm.favcount=res.data.rows[0].count;

    });



    vm.rando=function(){
      for(var i =0;i<50;i++){
        GifGetter.randomGif().then(function(res){
          // console.log(res.data.data);
          // vm.randomGifUrl=res.data.data.image_url;
          vm.giflist.push(res.data.data)
        });
      }
    }

    vm.searcho=function(query){
      GifGetter.searchGif(query).then(function(res){

        vm.giflist=res;
        // console.log(vm.giflist);
      });
    }

    vm.fav=function(gifcomment,gifurl){

      console.log(gifcomment+' '+gifurl);
      var datas={comment:gifcomment,url:gifurl}
      $http({
                method:'POST',
                url:'/favs',
                data:datas
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              }).then(function(response){
                console.log('got a response from the server ', response);
              }).catch(function(err){
                console.log('error');
              });

      GifGetter.favcount().then(function(res){
        vm.favcount=res.data.rows[0].count;

      });
    }


});
