// Score controller

bubbleSmashApp.controller("ScoreController", function($scope, $state, shareDataService,$rootScope,$http) {
     console.log("Score data is :"+ shareDataService.dataObj);

// Making Score Global
    $scope.data = shareDataService.dataObj;

// Getting Identification Number from Mongo DB
$scope.iden = shareDataService.dataObj1;

    //console.log("Score data is :"+ data);
    
// Update score in DB

            $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/asedb/collections/demoase/' + $scope.iden._id.$oid  + '?apiKey=s2gDY_UX42GDk8QBsJSlGuQqrwXFGtxg',
                    data: JSON.stringify({
                        "$set": {
                            name : $scope.iden.name,
                            username : $scope.username,
                            password : $scope.password,
                            score: $scope.data
                        }
                    }),
                    contentType: "application/json"
                }).success(function () {
                        $scope.getTopScores();
                })

// Get Top Scores from DB

  $scope.getTopScores =function(){         
            $http({
                method: 'GET',
                url : 'https://api.mlab.com/api/1/databases/asedb/collections/demoase/?apiKey=s2gDY_UX42GDk8QBsJSlGuQqrwXFGtxg'
                }).success(function(data) {
                    var obj=angular.fromJson(data);
                    var count=0;
                var scores = [[]];
                 for(i=0;i<obj.length;i++)
                    {
                        scores.push({name:obj[i].name, score:obj[i].score});
                    }
                    var sortedScores = scores.sort(function(a, b){return b.score - a.score});
                    console.log(scores);
                    console.log(sortedScores);
                    var table = "<table class='scoresData'><tr><th class='column1'>Name</th><th class='column2'>Score</th></tr>";                    
                    for(var i=1;i<=5;i++){
                        table += "<tr><td class='column1'>"+sortedScores[i].name+"</td><td class='column2'>"+sortedScores[i].score+"</td></tr>";
                    }
                    table += "</table>";
                    document.getElementById("scoresDiv").innerHTML = table;
                })
           } 
// Going back to home page from Score page
    $scope.backToHome = function() {
    $state.go('home')
    }
// Going to Login Page from Score page    
    $scope.quit = function() {
        $state.go('login')
    }
});

// Update Profile controller

bubbleSmashApp.controller("UpdateProfileController", function($scope, $http, $state, $window,$cordovaOauth,$cordovaSplashscreen,shareDataService) {
    // Getting the identifictaion of Current user from MLab
    $scope.iden = shareDataService.dataObj1;   
    
    // Going to home page
     $scope.cancel = function() {
        $state.go('home')
    }
     
    // Updating User data 
    $scope.updateUserData = function(email, phoneNumber,password) {
            $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/asedb/collections/demoase/' + $scope.iden._id.$oid  + '?apiKey=s2gDY_UX42GDk8QBsJSlGuQqrwXFGtxg',
                    data: JSON.stringify({
                        "$set": {
                            name : $scope.iden.name,
                            username : $scope.iden.username,
                            password : password,
                            score: $scope.data,
                            email : email,
                            phoneNumber : phoneNumber   
                        }
                    }),
                    contentType: "application/json"
                }).success(function () {
                      $scope.updateStatus ="User updated successfully";
                })
    }
});

// Login controller
bubbleSmashApp.controller("LoginController", function($scope, $http, $state, $window,$cordovaOauth,shareDataService,$cordovaSplashscreen) {

// Navigating to Update Profile Page
    $scope.updateProfile = function() {
        $state.go('updateProfile')
    } 
   // Navigating to home page 
    $scope.gotoHome= function() {
        $state.go('home')
    } 
// Login functionlaity
    $scope.login = function(username, password) {
      $http({
        method: 'GET',
        url : 'https://api.mlab.com/api/1/databases/asedb/collections/demoase?apiKey=s2gDY_UX42GDk8QBsJSlGuQqrwXFGtxg'

      }).success(function(data) {
            var obj=angular.fromJson(data);
            var count=0;
            for(i=0;i<obj.length;i++)
            {
                if (angular.equals(obj[i].username, username)&&angular.equals(obj[i].password,password)) {
                    $scope.iden = obj[i];
                    shareDataService.dataObj1=$scope.iden;
                    $scope.iden = shareDataService.dataObj1;                    
                    $state.go('home')
                }
                else {
                     count++;
                }
            }
             if(count==obj.length){
                $scope.msg ="Login Unsuccessful";
             }
      })
    }
    // Navigating to regsiter page
    $scope.register = function(){
        $state.go('register')
    }
    // facebook login functionality
     $scope.faceBookLogin = function() {
          console.log("Inside facebook login");
        $cordovaOauth.facebook("1112137608839690", ["email"]).then(function(result) {             
            $state.go('home');
        }, function(error) {
            // error
            console.log(" error in facebook login"+error);
        });
    };
    // Guest User Login  
    $scope.guestLogin = function() {
          console.log("Inside guest Login");
          $state.go('home');  
    };
});
// Registration Controller
bubbleSmashApp.controller("RegisterController", function($scope, $http, $state, $window) {
   // Storing the data in database
     $scope.registerdata = function(name, username, password) {

       $http({
         method: 'POST',
         url : 'https://api.mlab.com/api/1/databases/asedb/collections/demoase?apiKey=s2gDY_UX42GDk8QBsJSlGuQqrwXFGtxg',
         data: JSON.stringify({
           name : name,
           username: username,
           password: password
         }),
         contentType: "application/json"
       }).success(function() {
         $scope.status ="User created successfully";
       }).error(function(data){
         $scope.status = "User Cannot be Created";
       })

     }
  // Navigating to login page    
    $scope.cancel = function(){
        $state.go('cancel')
    }
   
});
// Level Controller
bubbleSmashApp.controller("LevelController", function($scope, $http, $state, $window,$ionicScrollDelegate, $ionicSlideBoxDelegate) {
     $scope.easylevel = function(){
         console.log("start easylevel");
        $state.go('easylevel')
    }

    $scope.intermediatelevel = function() {
        $state.go('intermediatelevel')
    }

      $scope.settings = function() {
        $state.go('settings')
    }

    $scope.goToExpertLevel = function() {  
        console.log("Inside expert level");            
        $state.go('expertGame'); 
    }
    
    $scope.help = function() {
        $state.go('help')
    }
    
     $scope.rate = function() {
        $state.go('rate')
    }
     
     
  $ionicSlideBoxDelegate.update();
  $scope.onUserDetailContentScroll = onUserDetailContentScroll
  $scope.like = like

  function like(){
    $scope.liked = true
  }

  function onUserDetailContentScroll(){
    var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
    var scrollView = scrollDelegate.getScrollView();
    $scope.$broadcast('userDetailContent.scroll', scrollView);
  }
  
  
});
bubbleSmashApp.controller("EasyLevelController", function($scope, $state, $cordovaGeolocation, $ionicPlatform, $http, shareDataService,$window,$document,$rootScope) {
/*
    // Easy Level
    $scope.location='';
    navigator.geolocation.getCurrentPosition(function(pos) {
            var lat  = pos.coords.latitude;
            var long = pos.coords.longitude;
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyCH7iZTTwU80B-p1KGL4FUVJ2nvNs3cyvo'
             $http({
            method: 'GET',
            url : url
        }).success(function(data) {
             $scope.location =data.results[0].formatted_address.split(',')[0]+" "+data.results[0].formatted_address.split(',')[1];
        })  
    });  

    // Easy Level
    $scope.count = 0;
    setInterval(function(){ $state.go('scorepage') }, 50000);
    $scope.smashBubble1 = function(){
        $scope.count = $scope.count + 1;
        document.getElementById('bubble1').classList.remove('animation');
        document.getElementById("bubble1").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubble1').classList.add('animation');
            document.getElementById("bubble1").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }
    
    $scope.smashBubble2 = function(){
        $scope.count = $scope.count + 5;
        document.getElementById('bubble2').classList.remove('animation');
        document.getElementById("bubble2").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubble2').classList.add('animation');
            document.getElementById("bubble2").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }
    $scope.smashBubble3 = function(){
        $scope.count = $scope.count + 1;
        document.getElementById('bubble3').classList.remove('animation');
        document.getElementById("bubble3").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubble3').classList.add('animation');
            document.getElementById("bubble3").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }*/
    
    
    
    
    
    //rashmi changes- only one bubble on a screen at a time
    
    
        
    console.log("start game easy level");
 // Playing Audio File on bubble click

 $scope.playSprite = function(id) {
    
    var audioSprite = document.getElementById('audio');
var spriteData = {
    bubble: {
        start: 0,
        length: 1.1
    }
};
var currentSprite = {};
var onTimeUpdate = function() {
    if (this.currentTime >= currentSprite.start + currentSprite.length) {
        this.pause();
    }
};
audioSprite.addEventListener('timeupdate', onTimeUpdate, false);
    if (spriteData[id] && spriteData[id].length) {
        currentSprite = spriteData[id];
        audioSprite.currentTime = currentSprite.start;
        audioSprite.play();
    }
};
   
    /*$scope.play = function(sound) {
        $cordovaNativeAudio.play(sound);
    };*/    
    
    // shim layer with setTimeout fallback
$window.requestAnimFrame = (function(){
    
          console.log("start game");
    
  return  $window.requestAnimationFrame       || 
          $window.webkitRequestAnimationFrame || 
          $window.mozRequestAnimationFrame    || 
          $window.oRequestAnimationFrame      || 
          $window.msRequestAnimationFrame     || 
          function( callback ){
            $window.setTimeout(callback, 1000 / 60);
          };
})();
    


// namespace our game
var POP = {

    // set up some inital values
    WIDTH: 320, 
    HEIGHT:  480, 
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    offset: {top: 0, left: 0},
    // store all bubble, touches, particles etc
    entities: [],
    // the amount of game ticks until
    // we spawn a bubble
    nextBubble: 100,
    // for tracking player's progress
    score: {
        taps: 0,
        hit: 0,
        escaped: 0,
        accuracy: 0
    },
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    ua:  null,
    android: null,
    ios:  null,

   
    // this is where all entities will be moved
    // and checked for collisions etc
    update: function() {
        var i,
            checkCollision = false; // we only need to check for a collision
                                // if the user tapped on this game tick
 

        // decrease our nextBubble counter
        POP.nextBubble -= 1;
        // if the counter is less than zero
        if (POP.nextBubble < 0) {
            // put a new instance of bubble into our entities array
            POP.entities.push(new POP.Bubble());
            // reset the counter with a random value
            POP.nextBubble =(1 * 100 ) + 100;
            //POP.nextBubble = ( Math.random() * 100 ) + 100;
        }

        // spawn a new instance of Touch
        // if the user has tapped the screen
        if (POP.Input.tapped) {
            // keep track of taps; needed to 
            // calculate accuracy
            POP.score.taps += 1;
            // add a new touch
            POP.entities.push(new POP.Touch(POP.Input.x, POP.Input.y));
            // set tapped back to false
            // to avoid spawning a new touch
            // in the next cycle
            POP.Input.tapped = false;
            checkCollision = true;
        }

        // cycle through all entities and update as necessary
        for (i = 0; i < POP.entities.length; i += 1) {
            POP.entities[i].update();

            if (POP.entities[i].type === 'bubble' && checkCollision) {
                hit = POP.collides(POP.entities[i], 
                                    {x: POP.Input.x, y: POP.Input.y, r: 7});
                if (hit) {
                    // spawn an exposion
                    for (var n = 0; n < 5; n +=1 ) {
                        POP.entities.push(new POP.Particle(
                            POP.entities[i].x, 
                            POP.entities[i].y, 
                            2, 
                            // random opacity to spice it up a bit
                            'rgba(255,255,255,'+Math.random()*1+')'
                        )); 
                    }
                    POP.score.hit += 1;
$scope.playSprite();
                }
                
                var total=POP.score.hit+POP.score.escaped;
                
                if(total>5)
                {
                      console.log("total 5 games");
                    // $rootScope.$broadcast('score', POP);
                      shareDataService.dataObj=POP.score.hit;
                      $state.go('scorepage');  
                }
                
                
                POP.totalNumber=100;

                POP.entities[i].remove = hit;
            }

            // delete from array if remove property
            // flag is set to true
            if (POP.entities[i].remove) {
                POP.entities.splice(i, 1);
            }
        }

        // update wave offset
        // feel free to play with these values for
        // either slower or faster waves
        POP.wave.time = new Date().getTime() * 0.002;
        POP.wave.offset = Math.sin(POP.wave.time * 0.8) * 5;

        // calculate accuracy
        POP.score.accuracy = (POP.score.hit / POP.score.taps) * 100;
        POP.score.accuracy = isNaN(POP.score.accuracy) ?
            0 :
            ~~(POP.score.accuracy); // a handy way to round floats

    },


    // this is where we draw all the entities
    render: function() {

        var i;


        POP.Draw.rect(0, 0, POP.WIDTH, POP.HEIGHT, '#036');

        // display snazzy wave effect
        for (i = 0; i < POP.wave.total; i++) {

            POP.Draw.circle(
                        POP.wave.x + POP.wave.offset +  (i * POP.wave.r), 
                        POP.wave.y,
                        POP.wave.r, 
                        '#fff'); 
        }

            // cycle through all entities and render to canvas
            for (i = 0; i < POP.entities.length; i += 1) {
                POP.entities[i].render();
        }

        // display scores
        POP.Draw.text('Hit: ' + POP.score.hit, 20, 30, 14, '#fff');
        POP.Draw.text('Escaped: ' + POP.score.escaped, 20, 50, 14, '#fff');
        POP.Draw.text('Accuracy: ' + POP.score.accuracy + '%', 20, 70, 14, '#fff');

    },


    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function() {

        $window.requestAnimFrame( POP.loop );

        POP.update();
        POP.render();
    }


};
// checks if two entties are touching
POP.collides = function(a, b) {

        var distance_squared = ( ((a.x - b.x) * (a.x - b.x)) + 
                                ((a.y - b.y) * (a.y - b.y)));

        var radii_squared = (a.r + b.r) * (a.r + b.r);

        if (distance_squared < radii_squared) {
            return true;
        } else {
            return false;
        }
}


// abstracts various canvas operations into
// standalone functions
POP.Draw = {

    clear: function() {
        POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
    },


    rect: function(x, y, w, h, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        POP.ctx.closePath();
        POP.ctx.fill();
    },


    text: function(string, x, y, size, col) {
        POP.ctx.font = 'bold '+size+'px Monospace';
        POP.ctx.fillStyle = col;
        POP.ctx.fillText(string, x, y);
    }

};



POP.Input = {

    x: 0,
    y: 0,
    tapped :false,

    set: function(data) {
        this.x = (data.pageX - POP.offset.left) / POP.scale;
        this.y = (data.pageY - POP.offset.top) / POP.scale;
        this.tapped = true;

    }

};

POP.Touch = function(x, y) {

    this.type = 'touch';    // we'll need this later
    this.x = x;             // the x coordinate
    this.y = y;             // the y coordinate
    this.r = 5;             // the radius
    this.opacity = 1;       // inital opacity. the dot will fade out
    this.fade = 0.05;       // amount by which to fade on each game tick
    // this.remove = false;    // flag for removing this entity. POP.update
                            // will take care of this

    this.update = function() {
        // reduct the opacity accordingly
        this.opacity -= this.fade; 
        // if opacity if 0 or less, flag for removal
        this.remove = (this.opacity < 0) ? true : false;
    };

    this.render = function() {
        POP.Draw.circle(this.x, this.y, this.r, 'rgba(255,0,0,'+this.opacity+')');
    };

};

POP.Bubble = function() {

    this.type = 'bubble';
    this.r = (Math.random() * 20) + 10;
    this.speed = (Math.random() * 3) + 1;
 
    this.x = (Math.random() * (POP.WIDTH) - this.r);
    this.y = POP.HEIGHT + (Math.random() * 100) + 100;

    // the amount by which the bubble
    // will move from side to side
    this.waveSize = 5 + this.r;
    // we need to remember the original
    // x position for our sine wave calculation
    this.xConstant = this.x;

    this.remove = false;


    this.update = function() {

        // a sine wave is commonly a function of time
        var time = new Date().getTime() * 0.002;

        this.y -= this.speed;
        // the x coord to follow a sine wave
        this.x = this.waveSize * Math.sin(time) + this.xConstant;

        // if offscreen flag for removal
        if (this.y < -10) {
            POP.score.escaped += 1; // update score
            this.remove = true;
        }

    };

    this.render = function() {

        POP.Draw.circle(this.x, this.y, this.r, 'rgba(255,255,255,1)');
    };

};

POP.Particle = function(x, y,r, col) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;

    // determines whether particle will
    // travel to the right of left
    // 50% chance of either happening
    this.dir = (Math.random() * 2 > 1) ? 1 : -1;

    // random values so particles do no
    // travel at the same speeds
    this.vx = ~~(Math.random() * 4) * this.dir;
    this.vy = ~~(Math.random() * 7);

    this.remove = false;

    this.update = function() {

        // update coordinates
        this.x += this.vx;
        this.y += this.vy;

        // increase velocity so particle
        // accelerates off screen
        this.vx *= 0.99;
        this.vy *= 0.99;

        // adding this negative amount to the
        // y velocity exerts an upward pull on
        // the particle, as if drawn to the
        // surface
        this.vy -= 0.25;

        // offscreen
        if (this.y < 0) {
            this.remove = true;
        }

    };


    this.render = function() {
        POP.Draw.circle(this.x, this.y, this.r, this.col);
    };

};
    
    
POP.init = function() {
        console.log(" Inside init function Got canvas");
        // the proportion of width to height
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // these will change when the screen is resize
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;
        // this is our canvas element
        POP.canvas = $window.document.getElementsByTagName('canvas')[0];
        
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;
        // the canvas context allows us to 
        // interact with the canvas api
        POP.ctx = POP.canvas.getContext('2d');
        // we need to sniff out android & ios
        // so we can hide the address bar in
        // our resize function
        POP.ua = $window.navigator.userAgent.toLowerCase();
         console.log("user agent is:"+POP.ua);
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? true : false;

        // set up our wave effect
        // basically, a series of overlapping circles
        // across the top of screen
        POP.wave = {
            x: -25, // x coord of first circle
            y: -40, // y coord of first circle
            r: 50, // circle radius
            time: 0, // we'll use this in calculating the sine wave
            offset: 0 // this will be the sine wave offset
        }; 
        // calculate how many circles we need to 
        // cover the screen width
        POP.wave.total = Math.ceil(POP.WIDTH / POP.wave.r) + 1;

        // listen for clicks
        $window.addEventListener('click', function(e) {
            e.preventDefault();
            POP.Input.set(e);
        }, false);

        // listen for touches
        $window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            POP.Input.set(e.touches[0]);
        }, false);
        $window.addEventListener('touchmove', function(e) {
            // we're not interested in this
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        $window.addEventListener('touchend', function(e) {
            // as above
            e.preventDefault();
        }, false);

        // we're ready to resize
        POP.resize();

        POP.loop();

    };


POP.resize = function() {
    
        POP.canvas = $window.document.getElementsByTagName('canvas')[0];
        
        POP.currentHeight = $window.innerHeight;
        // resize the width in proportion
        // to the new height
        POP.currentWidth = POP.currentHeight * POP.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll pass
        // the address bar, and thus hide it.
        if (POP.android || POP.ios) {
            $window.document.body.style.height = ($window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        POP.scale = POP.currentWidth / POP.WIDTH;
        // position of canvas in relation to
        // the screen
        POP.offset.top = POP.canvas.offsetTop;
        POP.offset.left = POP.canvas.offsetLeft;

        // we use a timeout here as some mobile
        // browsers won't scroll if there is not
        // a small delay
        $window.setTimeout(function() {
                $window.scrollTo(0,1);
        }, 1);
    };
    

$window.addEventListener('load', POP.init, false);
$window.addEventListener('resize', POP.resize, false);
    
$window.onload = POP.init();
$window.resize = POP.resize();
    
});


    // Intermediate Level
bubbleSmashApp.controller("IntermediateLevelController", function($scope, $state, $cordovaGeolocation, $ionicPlatform, $http, shareDataService,$window,$document,$rootScope) {
    
    //intermediate level
    
        
    /*$scope.location = '';
    $ionicPlatform.ready(function() {
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyCH7iZTTwU80B-p1KGL4FUVJ2nvNs3cyvo'
        $http({
            method: 'GET',
            url : url
        }).success(function(data) {
             $scope.location =data.results[0].formatted_address.split(',')[0]+" "+data.results[0].formatted_address.split(',')[1];
        })        
    })
});
    
    $scope.count = 0;
    setInterval(function(){ $state.go('scorepage') }, 50000);
    $scope.smashBubbleIntermediate1 = function(){
        $scope.count = $scope.count + 1;
        document.getElementById('bubbleIntermediate1').classList.remove('animation');
        document.getElementById("bubbleIntermediate1").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubbleIntermediate1').classList.add('animation');
            document.getElementById("bubbleIntermediate1").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }
    $scope.smashBubbleIntermediate2 = function(){
          $scope.count = $scope.count + 5;
        document.getElementById('bubbleIntermediate2').classList.remove('animation');
        document.getElementById("bubbleIntermediate2").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubbleIntermediate2').classList.add('animation');
            document.getElementById("bubbleIntermediate2").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }
    $scope.smashBubbleIntermediate3 = function(){
          $scope.count = $scope.count + 1;
        document.getElementById('bubbleIntermediate3').classList.remove('animation');
        document.getElementById("bubbleIntermediate3").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubbleIntermediate3').classList.add('animation');
            document.getElementById("bubbleIntermediate3").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }
    $scope.smashBubbleIntermediate4 = function(){
          $scope.count = $scope.count - 5;
        document.getElementById('bubbleIntermediate4').classList.remove('animation');
        document.getElementById("bubbleIntermediate4").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubbleIntermediate4').classList.add('animation');
            document.getElementById("bubbleIntermediate4").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }
    $scope.smashBubbleIntermediate5 = function(){
          $scope.count = $scope.count + 1;
        document.getElementById('bubbleIntermediate5').classList.remove('animation');
        document.getElementById("bubbleIntermediate5").style.opacity = "0";
        setTimeout(
        function() {
            document.getElementById('bubbleIntermediate5').classList.add('animation');
            document.getElementById("bubbleIntermediate5").style.opacity = "1";
        }, 100);
        shareDataService.dataObj=$scope.count;
        $scope.data = shareDataService.dataObj;
    }*/
    
  // Playing Sound on button click

 $scope.playSprite = function(id) {
  
    var audioSprite = document.getElementById('audio');
var spriteData = {
    bubble: {
        start: 0,
        length: 1.1
    }
};
var currentSprite = {};
var onTimeUpdate = function() {
    if (this.currentTime >= currentSprite.start + currentSprite.length) {
        this.pause();
    }
};
audioSprite.addEventListener('timeupdate', onTimeUpdate, false);
    if (spriteData[id] && spriteData[id].length) {
        currentSprite = spriteData[id];
        audioSprite.currentTime = currentSprite.start;
        audioSprite.play();
    }
};  
    
    
    
    console.log("start game easy level");
    
    /*$scope.play = function(sound) {
        $cordovaNativeAudio.play(sound);
    };*/    
    
    // shim layer with setTimeout fallback
$window.requestAnimFrame = (function(){
    
          console.log("start game");
    
  return  $window.requestAnimationFrame       || 
          $window.webkitRequestAnimationFrame || 
          $window.mozRequestAnimationFrame    || 
          $window.oRequestAnimationFrame      || 
          $window.msRequestAnimationFrame     || 
          function( callback ){
            $window.setTimeout(callback, 1000 / 60);
          };
})();
    


// namespace our game
var POP = {

    // set up some inital values
    WIDTH: 320, 
    HEIGHT:  480, 
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    offset: {top: 0, left: 0},
    // store all bubble, touches, particles etc
    entities: [],
    // the amount of game ticks until
    // we spawn a bubble
    nextBubble: 100,
    // for tracking player's progress
    score: {
        taps: 0,
        hit: 0,
        escaped: 0,
        accuracy: 0
    },
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    ua:  null,
    android: null,
    ios:  null,

   
    // this is where all entities will be moved
    // and checked for collisions etc
    update: function() {
        var i,
            checkCollision = false; // we only need to check for a collision
                                // if the user tapped on this game tick
 

        // decrease our nextBubble counter
        POP.nextBubble -= 1;
        // if the counter is less than zero
        if (POP.nextBubble < 0) {
            // put a new instance of bubble into our entities array
            POP.entities.push(new POP.Bubble());
            // reset the counter with a random value
            POP.nextBubble =(1 * 100 ) + 100;
            //POP.nextBubble = ( Math.random() * 100 ) + 100;
        }

        // spawn a new instance of Touch
        // if the user has tapped the screen
        if (POP.Input.tapped) {
            // keep track of taps; needed to 
            // calculate accuracy
            POP.score.taps += 1;
            // add a new touch
            POP.entities.push(new POP.Touch(POP.Input.x, POP.Input.y));
            // set tapped back to false
            // to avoid spawning a new touch
            // in the next cycle
            POP.Input.tapped = false;
            checkCollision = true;
        }

        // cycle through all entities and update as necessary
        for (i = 0; i < POP.entities.length; i += 1) {
            POP.entities[i].update();

            if (POP.entities[i].type === 'bubble' && checkCollision) {
                hit = POP.collides(POP.entities[i], 
                                    {x: POP.Input.x, y: POP.Input.y, r: 7});
                if (hit) {
                    // spawn an exposion
                    for (var n = 0; n < 5; n +=1 ) {
                        POP.entities.push(new POP.Particle(
                            POP.entities[i].x, 
                            POP.entities[i].y, 
                            2, 
                            // random opacity to spice it up a bit
                            'rgba(255,255,255,'+Math.random()*1+')'
                        )); 
                    }
                    POP.score.hit += 1;
		$scope.playSprite();
                }
                
                var total=POP.score.hit+POP.score.escaped;
                
                if(total>5)
                {
                      console.log("total 5 games");
                    // $rootScope.$broadcast('score', POP);
                      shareDataService.dataObj=POP.score.hit;
                      $state.go('scorepage');  
                }
                
                
                POP.totalNumber=100;

                POP.entities[i].remove = hit;
            }

            // delete from array if remove property
            // flag is set to true
            if (POP.entities[i].remove) {
                POP.entities.splice(i, 1);
            }
        }

        // update wave offset
        // feel free to play with these values for
        // either slower or faster waves
        POP.wave.time = new Date().getTime() * 0.002;
        POP.wave.offset = Math.sin(POP.wave.time * 0.8) * 5;

        // calculate accuracy
        POP.score.accuracy = (POP.score.hit / POP.score.taps) * 100;
        POP.score.accuracy = isNaN(POP.score.accuracy) ?
            0 :
            ~~(POP.score.accuracy); // a handy way to round floats

    },


    // this is where we draw all the entities
    render: function() {

        var i;


        POP.Draw.rect(0, 0, POP.WIDTH, POP.HEIGHT, '#036');

        // display snazzy wave effect
        for (i = 0; i < POP.wave.total; i++) {

            POP.Draw.circle(
                        POP.wave.x + POP.wave.offset +  (i * POP.wave.r), 
                        POP.wave.y,
                        POP.wave.r, 
                        '#fff'); 
        }

            // cycle through all entities and render to canvas
            for (i = 0; i < POP.entities.length; i += 1) {
                POP.entities[i].render();
        }

        // display scores
        POP.Draw.text('Hit: ' + POP.score.hit, 20, 30, 14, '#fff');
        POP.Draw.text('Escaped: ' + POP.score.escaped, 20, 50, 14, '#fff');
        POP.Draw.text('Accuracy: ' + POP.score.accuracy + '%', 20, 70, 14, '#fff');

    },


    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function() {

        $window.requestAnimFrame( POP.loop );

        POP.update();
        POP.render();
    }


};
// checks if two entties are touching
POP.collides = function(a, b) {

        var distance_squared = ( ((a.x - b.x) * (a.x - b.x)) + 
                                ((a.y - b.y) * (a.y - b.y)));

        var radii_squared = (a.r + b.r) * (a.r + b.r);

        if (distance_squared < radii_squared) {
            return true;
        } else {
            return false;
        }
}


// abstracts various canvas operations into
// standalone functions
POP.Draw = {

    clear: function() {
        POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
    },


    rect: function(x, y, w, h, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        POP.ctx.closePath();
        POP.ctx.fill();
    },


    text: function(string, x, y, size, col) {
        POP.ctx.font = 'bold '+size+'px Monospace';
        POP.ctx.fillStyle = col;
        POP.ctx.fillText(string, x, y);
    }

};



POP.Input = {

    x: 0,
    y: 0,
    tapped :false,

    set: function(data) {
        this.x = (data.pageX - POP.offset.left) / POP.scale;
        this.y = (data.pageY - POP.offset.top) / POP.scale;
        this.tapped = true;

    }

};

POP.Touch = function(x, y) {

    this.type = 'touch';    // we'll need this later
    this.x = x;             // the x coordinate
    this.y = y;             // the y coordinate
    this.r = 5;             // the radius
    this.opacity = 1;       // inital opacity. the dot will fade out
    this.fade = 0.05;       // amount by which to fade on each game tick
    // this.remove = false;    // flag for removing this entity. POP.update
                            // will take care of this

    this.update = function() {
        // reduct the opacity accordingly
        this.opacity -= this.fade; 
        // if opacity if 0 or less, flag for removal
        this.remove = (this.opacity < 0) ? true : false;
    };

    this.render = function() {
        POP.Draw.circle(this.x, this.y, this.r, 'rgba(255,0,0,'+this.opacity+')');
    };

};

POP.Bubble = function() {

    this.type = 'bubble';
    this.r = (Math.random() * 20) + 10;
    this.speed = (Math.random() * 3) + 1;
 
    this.x = (Math.random() * (POP.WIDTH) - this.r);
    this.y = POP.HEIGHT + (Math.random() * 100) + 100;

    // the amount by which the bubble
    // will move from side to side
    this.waveSize = 5 + this.r;
    // we need to remember the original
    // x position for our sine wave calculation
    this.xConstant = this.x;

    this.remove = false;


    this.update = function() {

        // a sine wave is commonly a function of time
        var time = new Date().getTime() * 0.002;

        this.y -= this.speed;
        // the x coord to follow a sine wave
        this.x = this.waveSize * Math.sin(time) + this.xConstant;

        // if offscreen flag for removal
        if (this.y < -10) {
            POP.score.escaped += 1; // update score
            this.remove = true;
        }

    };

    this.render = function() {

        POP.Draw.circle(this.x, this.y, this.r, 'rgba(255,255,255,1)');
    };

};

POP.Particle = function(x, y,r, col) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;

    // determines whether particle will
    // travel to the right of left
    // 50% chance of either happening
    this.dir = (Math.random() * 2 > 1) ? 1 : -1;

    // random values so particles do no
    // travel at the same speeds
    this.vx = ~~(Math.random() * 4) * this.dir;
    this.vy = ~~(Math.random() * 7);

    this.remove = false;

    this.update = function() {

        // update coordinates
        this.x += this.vx;
        this.y += this.vy;

        // increase velocity so particle
        // accelerates off screen
        this.vx *= 0.99;
        this.vy *= 0.99;

        // adding this negative amount to the
        // y velocity exerts an upward pull on
        // the particle, as if drawn to the
        // surface
        this.vy -= 0.25;

        // offscreen
        if (this.y < 0) {
            this.remove = true;
        }

    };


    this.render = function() {
        POP.Draw.circle(this.x, this.y, this.r, this.col);
    };

};
    
    
POP.init = function() {
        console.log(" Inside init function Got canvas");
        // the proportion of width to height
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // these will change when the screen is resize
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;
        // this is our canvas element
        POP.canvas = $window.document.getElementsByTagName('canvas')[0];
        
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;
        // the canvas context allows us to 
        // interact with the canvas api
        POP.ctx = POP.canvas.getContext('2d');
        // we need to sniff out android & ios
        // so we can hide the address bar in
        // our resize function
        POP.ua = $window.navigator.userAgent.toLowerCase();
         console.log("user agent is:"+POP.ua);
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? true : false;

        // set up our wave effect
        // basically, a series of overlapping circles
        // across the top of screen
        POP.wave = {
            x: -25, // x coord of first circle
            y: -40, // y coord of first circle
            r: 50, // circle radius
            time: 0, // we'll use this in calculating the sine wave
            offset: 0 // this will be the sine wave offset
        }; 
        // calculate how many circles we need to 
        // cover the screen width
        POP.wave.total = Math.ceil(POP.WIDTH / POP.wave.r) + 1;

        // listen for clicks
        $window.addEventListener('click', function(e) {
            e.preventDefault();
            POP.Input.set(e);
        }, false);

        // listen for touches
        $window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            POP.Input.set(e.touches[0]);
        }, false);
        $window.addEventListener('touchmove', function(e) {
            // we're not interested in this
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        $window.addEventListener('touchend', function(e) {
            // as above
            e.preventDefault();
        }, false);

        // we're ready to resize
        POP.resize();

        POP.loop();

    };


POP.resize = function() {
    
        POP.canvas = $window.document.getElementsByTagName('canvas')[0];
        
        POP.currentHeight = $window.innerHeight;
        // resize the width in proportion
        // to the new height
        POP.currentWidth = POP.currentHeight * POP.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll pass
        // the address bar, and thus hide it.
        if (POP.android || POP.ios) {
            $window.document.body.style.height = ($window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        POP.scale = POP.currentWidth / POP.WIDTH;
        // position of canvas in relation to
        // the screen
        POP.offset.top = POP.canvas.offsetTop;
        POP.offset.left = POP.canvas.offsetLeft;

        // we use a timeout here as some mobile
        // browsers won't scroll if there is not
        // a small delay
        $window.setTimeout(function() {
                $window.scrollTo(0,1);
        }, 1);
    };
    

$window.addEventListener('load', POP.init, false);
$window.addEventListener('resize', POP.resize, false);
    
$window.onload = POP.init();
$window.resize = POP.resize();
    
});


bubbleSmashApp.controller('expertGameLevelCtrl',function($scope,$window,$document,$state,$rootScope,shareDataService){
    
    console.log("start game 00");
    // Adding Sound on Bubble click

    $scope.playSprite = function(id) {
    
    var audioSprite = document.getElementById('audio');
var spriteData = {
    bubble: {
        start: 0,
        length: 1.1
    }
};
var currentSprite = {};
var onTimeUpdate = function() {
    if (this.currentTime >= currentSprite.start + currentSprite.length) {
        this.pause();
    }
};
audioSprite.addEventListener('timeupdate', onTimeUpdate, false);
    if (spriteData[id] && spriteData[id].length) {
        currentSprite = spriteData[id];
        audioSprite.currentTime = currentSprite.start;
        audioSprite.play();
    }
};  

    /*$scope.play = function(sound) {
        $cordovaNativeAudio.play(sound);
    };*/    
    
    // shim layer with setTimeout fallback
$window.requestAnimFrame = (function(){
    
          console.log("start game");
    
  return  $window.requestAnimationFrame       || 
          $window.webkitRequestAnimationFrame || 
          $window.mozRequestAnimationFrame    || 
          $window.oRequestAnimationFrame      || 
          $window.msRequestAnimationFrame     || 
          function( callback ){
            $window.setTimeout(callback, 1000 / 60);
          };
})();
    


// namespace our game
var POP = {

    // set up some inital values
    WIDTH: 320, 
    HEIGHT:  480, 
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    offset: {top: 0, left: 0},
    // store all bubble, touches, particles etc
    entities: [],
    // the amount of game ticks until
    // we spawn a bubble
    nextBubble: 100,
    // for tracking player's progress
    score: {
        taps: 0,
        hit: 0,
        escaped: 0,
        accuracy: 0
    },
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    ua:  null,
    android: null,
    ios:  null,

   
    // this is where all entities will be moved
    // and checked for collisions etc
    update: function() {
        var i,
            checkCollision = false; // we only need to check for a collision
                                // if the user tapped on this game tick
 

        // decrease our nextBubble counter
        POP.nextBubble -= 1;
        // if the counter is less than zero
        if (POP.nextBubble < 0) {
            // put a new instance of bubble into our entities array
            POP.entities.push(new POP.Bubble());
            // reset the counter with a random value
            POP.nextBubble = ( Math.random() * 100 ) + 100;
        }

        // spawn a new instance of Touch
        // if the user has tapped the screen
        if (POP.Input.tapped) {
            // keep track of taps; needed to 
            // calculate accuracy
            POP.score.taps += 1;
            // add a new touch
            POP.entities.push(new POP.Touch(POP.Input.x, POP.Input.y));
            // set tapped back to false
            // to avoid spawning a new touch
            // in the next cycle
            POP.Input.tapped = false;
            checkCollision = true;
        }

        // cycle through all entities and update as necessary
        for (i = 0; i < POP.entities.length; i += 1) {
            POP.entities[i].update();

            if (POP.entities[i].type === 'bubble' && checkCollision) {
                hit = POP.collides(POP.entities[i], 
                                    {x: POP.Input.x, y: POP.Input.y, r: 7});
                if (hit) {
                    // spawn an exposion
                    for (var n = 0; n < 5; n +=1 ) {
                        POP.entities.push(new POP.Particle(
                            POP.entities[i].x, 
                            POP.entities[i].y, 
                            2, 
                            // random opacity to spice it up a bit
                            'rgba(255,255,255,'+Math.random()*1+')'
                        )); 
                    }
                    POP.score.hit += 1;
                    $scope.playSprite();
                }
                
                var total=POP.score.hit+POP.score.escaped;
                
                if(total>5)
                {
                      console.log("total 5 games");
                    // $rootScope.$broadcast('score', POP);
                      shareDataService.dataObj=POP.score.hit;
                      $state.go('scorepage');  
                }
                
                
                POP.totalNumber=100;

                POP.entities[i].remove = hit;
            }

            // delete from array if remove property
            // flag is set to true
            if (POP.entities[i].remove) {
                POP.entities.splice(i, 1);
            }
        }

        // update wave offset
        // feel free to play with these values for
        // either slower or faster waves
        POP.wave.time = new Date().getTime() * 0.002;
        POP.wave.offset = Math.sin(POP.wave.time * 0.8) * 5;

        // calculate accuracy
        POP.score.accuracy = (POP.score.hit / POP.score.taps) * 100;
        POP.score.accuracy = isNaN(POP.score.accuracy) ?
            0 :
            ~~(POP.score.accuracy); // a handy way to round floats

    },


    // this is where we draw all the entities
    render: function() {

        var i;


        POP.Draw.rect(0, 0, POP.WIDTH, POP.HEIGHT, '#036');

        // display snazzy wave effect
        for (i = 0; i < POP.wave.total; i++) {

            POP.Draw.circle(
                        POP.wave.x + POP.wave.offset +  (i * POP.wave.r), 
                        POP.wave.y,
                        POP.wave.r, 
                        '#fff'); 
        }

            // cycle through all entities and render to canvas
            for (i = 0; i < POP.entities.length; i += 1) {
                POP.entities[i].render();
        }

        // display scores
        POP.Draw.text('Hit: ' + POP.score.hit, 20, 30, 14, '#fff');
        POP.Draw.text('Escaped: ' + POP.score.escaped, 20, 50, 14, '#fff');
        POP.Draw.text('Accuracy: ' + POP.score.accuracy + '%', 20, 70, 14, '#fff');

    },


    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function() {

        $window.requestAnimFrame( POP.loop );

        POP.update();
        POP.render();
    }


};
// checks if two entties are touching
POP.collides = function(a, b) {

        var distance_squared = ( ((a.x - b.x) * (a.x - b.x)) + 
                                ((a.y - b.y) * (a.y - b.y)));

        var radii_squared = (a.r + b.r) * (a.r + b.r);

        if (distance_squared < radii_squared) {
            return true;
        } else {
            return false;
        }
}


// abstracts various canvas operations into
// standalone functions
POP.Draw = {

    clear: function() {
        POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
    },


    rect: function(x, y, w, h, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        POP.ctx.closePath();
        POP.ctx.fill();
    },


    text: function(string, x, y, size, col) {
        POP.ctx.font = 'bold '+size+'px Monospace';
        POP.ctx.fillStyle = col;
        POP.ctx.fillText(string, x, y);
    }

};



POP.Input = {

    x: 0,
    y: 0,
    tapped :false,

    set: function(data) {
        this.x = (data.pageX - POP.offset.left) / POP.scale;
        this.y = (data.pageY - POP.offset.top) / POP.scale;
        this.tapped = true;

    }

};

POP.Touch = function(x, y) {

    this.type = 'touch';    // we'll need this later
    this.x = x;             // the x coordinate
    this.y = y;             // the y coordinate
    this.r = 5;             // the radius
    this.opacity = 1;       // inital opacity. the dot will fade out
    this.fade = 0.05;       // amount by which to fade on each game tick
    // this.remove = false;    // flag for removing this entity. POP.update
                            // will take care of this

    this.update = function() {
        // reduct the opacity accordingly
        this.opacity -= this.fade; 
        // if opacity if 0 or less, flag for removal
        this.remove = (this.opacity < 0) ? true : false;
    };

    this.render = function() {
        POP.Draw.circle(this.x, this.y, this.r, 'rgba(255,0,0,'+this.opacity+')');
    };

};

POP.Bubble = function() {

    this.type = 'bubble';
    this.r = (Math.random() * 20) + 10;
    this.speed = (Math.random() * 3) + 1;
 
    this.x = (Math.random() * (POP.WIDTH) - this.r);
    this.y = POP.HEIGHT + (Math.random() * 100) + 100;

    // the amount by which the bubble
    // will move from side to side
    this.waveSize = 5 + this.r;
    // we need to remember the original
    // x position for our sine wave calculation
    this.xConstant = this.x;

    this.remove = false;


    this.update = function() {

        // a sine wave is commonly a function of time
        var time = new Date().getTime() * 0.002;

        this.y -= this.speed;
        // the x coord to follow a sine wave
        this.x = this.waveSize * Math.sin(time) + this.xConstant;

        // if offscreen flag for removal
        if (this.y < -10) {
            POP.score.escaped += 1; // update score
            this.remove = true;
        }

    };

    this.render = function() {

        POP.Draw.circle(this.x, this.y, this.r, 'rgba(255,255,255,1)');
    };

};

POP.Particle = function(x, y,r, col) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;

    // determines whether particle will
    // travel to the right of left
    // 50% chance of either happening
    this.dir = (Math.random() * 2 > 1) ? 1 : -1;

    // random values so particles do no
    // travel at the same speeds
    this.vx = ~~(Math.random() * 4) * this.dir;
    this.vy = ~~(Math.random() * 7);

    this.remove = false;

    this.update = function() {

        // update coordinates
        this.x += this.vx;
        this.y += this.vy;

        // increase velocity so particle
        // accelerates off screen
        this.vx *= 0.99;
        this.vy *= 0.99;

        // adding this negative amount to the
        // y velocity exerts an upward pull on
        // the particle, as if drawn to the
        // surface
        this.vy -= 0.25;

        // offscreen
        if (this.y < 0) {
            this.remove = true;
        }

    };


    this.render = function() {
        POP.Draw.circle(this.x, this.y, this.r, this.col);
    };

};
    
    
POP.init = function() {
        console.log(" Inside init function Got canvas");
        // the proportion of width to height
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // these will change when the screen is resize
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;
        // this is our canvas element
        POP.canvas = $window.document.getElementsByTagName('canvas')[0];
        
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;
        // the canvas context allows us to 
        // interact with the canvas api
        POP.ctx = POP.canvas.getContext('2d');
        // we need to sniff out android & ios
        // so we can hide the address bar in
        // our resize function
        POP.ua = $window.navigator.userAgent.toLowerCase();
         console.log("user agent is:"+POP.ua);
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? true : false;

        // set up our wave effect
        // basically, a series of overlapping circles
        // across the top of screen
        POP.wave = {
            x: -25, // x coord of first circle
            y: -40, // y coord of first circle
            r: 50, // circle radius
            time: 0, // we'll use this in calculating the sine wave
            offset: 0 // this will be the sine wave offset
        }; 
        // calculate how many circles we need to 
        // cover the screen width
        POP.wave.total = Math.ceil(POP.WIDTH / POP.wave.r) + 1;

        // listen for clicks
        $window.addEventListener('click', function(e) {
            e.preventDefault();
            POP.Input.set(e);
        }, false);

        // listen for touches
        $window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            POP.Input.set(e.touches[0]);
        }, false);
        $window.addEventListener('touchmove', function(e) {
            // we're not interested in this
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        $window.addEventListener('touchend', function(e) {
            // as above
            e.preventDefault();
        }, false);

        // we're ready to resize
        POP.resize();

        POP.loop();

    };


POP.resize = function() {
    
        POP.canvas = $window.document.getElementsByTagName('canvas')[0];
        
        POP.currentHeight = $window.innerHeight;
        // resize the width in proportion
        // to the new height
        POP.currentWidth = POP.currentHeight * POP.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll pass
        // the address bar, and thus hide it.
        if (POP.android || POP.ios) {
            $window.document.body.style.height = ($window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        POP.scale = POP.currentWidth / POP.WIDTH;
        // position of canvas in relation to
        // the screen
        POP.offset.top = POP.canvas.offsetTop;
        POP.offset.left = POP.canvas.offsetLeft;

        // we use a timeout here as some mobile
        // browsers won't scroll if there is not
        // a small delay
        $window.setTimeout(function() {
                $window.scrollTo(0,1);
        }, 1);
    };
    

$window.addEventListener('load', POP.init, false);
$window.addEventListener('resize', POP.resize, false);
    
$window.onload = POP.init();
    $window.resize = POP.resize();
        
});


