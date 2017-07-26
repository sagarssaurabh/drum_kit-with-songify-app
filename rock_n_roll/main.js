var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '3:26',
       'fileName': 'songs/song1.mp3',
       'imageName' : 'image1.jpeg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'songs/song2.mp3',
        'imageName' : 'image2.jpeg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'songs/song3.mp3',
        'imageName' : 'image3.jpeg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'songs/song4.mp3',
        'imageName' : 'image4.jpeg'
    },
    {
            'name': 'Naav Chadhti Lehrein Laang Na Paye',
            'artist': 'Mohan',
            'album': 'Udaan',
            'duration': '4:16',
           'fileName': 'songs/song5.mp3',
           'imageName' : 'image5.jpeg'
    },
    {
            'name': 'Tere Sang Yarara',
            'artist': 'Atif Aslam',
            'album': 'Rustom',
            'duration': '4:51',
            'fileName': 'songs/song6.mp3',
            'imageName' : 'image6.jpg'
        },
        {

              'name': 'Bulleya',
              'artist': 'Amit Mishra,Shilpa Rao',
              'album': 'Ae Dil Hai Mushkil',
              'duration': '5:49',
              'fileName': 'songs/song7.mp3',
              'imageName' : 'image7.jpeg'

        },
        {
              'name': 'Bolna',
              'artist': 'Taniskh Bagchi',
              'album': 'Kapoor And Sons',
              'duration': '3:33',
              'fileName': 'songs/song8.mp3',
              'imageName' : 'image8.jpeg'
        },
        {
                'name': 'Kabira(Encore)',
                'artist': 'Arijit Singh ,Harshjeep',
                'album': 'Yeh Jawani Hai Diwani',
                'duration': '4:30',
               'fileName': 'songs/song9.mp3',
               'imageName' : 'image9.jpeg'
        },
        {
                'name': 'Sanam Re',
                'artist': 'Arijit Singh ,Mithoon',
                'album': 'Sanam Re',
                'duration': '5:08',
                'fileName': 'songs/song10.mp3',
                'imageName' : 'image10.jpg'
        },
        {
                'name': 'Jiya Tu',
                'artist': 'Manoj Tiwari',
                'album': 'Gangs Of Wasseypur',
                'duration': '5:22',
                'fileName': 'songs/song11.mp3',
                'imageName' : 'image11.jpeg'
        },
        {
                'name': 'Yeh Shaam Mastani',
                'artist': 'Kishore Kuman',
                'album': 'Kati Patang',
                'duration': '4:41',
                'fileName': 'songs/song12.mp3',
                'imageName' : 'image12.jpeg'
        }
  ]
  //variable for changing songNumber
        var songNumber = 1;
        var willLoop = 0;
        var willShuffle = 0; // will use this soon
        var currentSongNumber = songNumber;
        var mute=0;

        var song = document.querySelector('audio');
        $('.welcome-screen button').on('click', function() {
          var name = $('#name-input').val();
          if (name.length > 3) {
              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $('.welcome-screen').addClass('hidden');
              $(".main").removeClass('hidden');
          }
          else {
              $('#name-input').addClass('error');
              $('#helpBlock').text("Please enter more than 3 characters!!!");
          }
        });
        $('.play-icon').on('click', function() {
          toggleSong();
          // updateCurrentTime();
        });
        // $(document).ready(function() {
        // $('#songs').DataTable({        //adding datatables
        //                paging:false,
        //                language: {
        //                              searchPlaceholder: "Search"
        //                          },
        //                scrollY:250,            //adding scrollbar
        //                deferRender:true        //to set srollbar when required
        //              });
        // )};
        // setTimeout(function(){
        //          //initiallizing datatable after removing hidden class so that autoresize not occur
        //              $('#songs').DataTable({        //adding datatables
        //                paging:false,
        //                language: {
        //                              searchPlaceholder: "Search"
        //                          },
        //                scrollY:250,            //adding scrollbar
        //                deferRender:true        //to set srollbar when required
        //              });
        //       },50);
        window.onload = function() {

               changeCurrentSongDetails(songs[0]);

         //Now at soon as our website is loaded, updateCurrentTime runs and then after every 1 second, setInterval makes it run again
               updateCurrentTime();
               setInterval(function() {
                 updateCurrentTime();
               },1000);


      for(var i =0; i < songs.length;i++) {
          var obj = songs[i];
          var name = '#song' + (i+1);
          var song = $(name);
          song.find('.song-name').text(obj.name);
          song.find('.song-artist').text(obj.artist);
          song.find('.song-album').text(obj.album);
          song.find('.song-length').text(obj.duration);
          addSongNameClickEvent(obj,i+1);
        }
        $('#songs').DataTable({
            paging : false,
            language: {
                         searchPlaceholder: "Search"
                },
            scrollY:250,            //adding scrollbar
            deferRender:true
        });
      }
        $('body').on('keypress', function(event) {
               var target=event.target;
               if (event.keyCode == 13 && target.tagName=='INPUT') {
                 $('.welcome-screen').addClass('hidden');
                 $(".main").removeClass('hidden');
               }
          });

          // $('body').on('keypress', function(event) {
          //             if (event.keyCode == 32) {
          //                 toggleSong();
          //                 // updateCurrentTime();
          //             }
          //
          //   });

          //
          // This condition first checks if the spacebar key is pressed
          //  Then it checks if the place where the event occurred had an input tag or not
        $('body').on('keypress',function(event) {
          var target = event.target;                                  //save the target of the event in a variable , The target is the place where the event took place
          if (event.keyCode == 32 && target.tagName !='INPUT')
          {
              toggleSong();
          }
        });

        //setting placeholder in search bar

        $('.fa-repeat').on('click',function() {
          $('.fa-repeat').toggleClass('disabled');
          willLoop = 1 - willLoop;
        });


        $('#playall').on('click',function() {
              toggleSong();
              willLoop = 1 - willLoop;
        });


        $('.fa-random').on('click',function() {
          $('.fa-random').toggleClass('disabled')
          willShuffle = 1 - willShuffle;
        });


          $('audio').on('ended',function() {
            var audio = document.querySelector('audio');
            if (willShuffle == 1) {
              var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
              var nextSongObj = songs[nextSongNumber-1];
              audio.src = nextSongObj.fileName;
              toggleSong();
              changeCurrentSongDetails(nextSongObj);
              currentSongNumber = nextSongNumber;
            }
            if(currentSongNumber < 4) {
                var nextSongObj = songs[currentSongNumber];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber = 1 + currentSongNumber;
            }
            else if(willLoop == 1)
            {
                  nextSongObj=songs[0];
                  audio.src=nextSongObj.fileName;
                  toggleSong();
                  changeCurrentSongDetails(nextSongObj);
                  currentSongNumber = 1 + currentSongNumber;
            }
            else {
                  $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                  audio.currentTime=0;
                }
          });

          $('.fa-step-forward').on('click',function(){
                 step_frwd();
          });


          $('.fa-step-backward').on('click',function(){
                  step_bckrwd();
          });

          $('.label').on('click',function(){
                $('.effects').removeClass('hidden');
                $('.content').addClass('hidden');
                $('.label').addClass('hidden');
          });


          //Js for Volume icon
              $('#volume1').on('change',function(){
                  changeVolume(this.value);
              });
              $('.favolume').hover(function(){
                  $('#volume1').removeClass('hidden')
                  $('#volume1').mouseleave(function(){
                    $('#volume1').addClass('hidden')
                  })
              });
              $('.favolume').on('click',function(){
                   changeVolume(mute);
                  // $('#volume1').slider({value:0});
                  mute=1-mute;
              });
          $('.player-progress').click(function(event){
               var $this=$(this);
               var widthclicked= event.pageX-$this.offset().left;
               //console.log(event.pageX);  gives the position from left whereever clicked
               //console.log($this.offset().left);      gives the positon from left where 'this' start and always fixed
               //console.log(widthclicked);
               var totalwidth=$this.width();
               //console.log(totalwidth);           gives the total width of the player and always fixed
               var width=(widthclicked/totalwidth)*100;
               var song=document.querySelector('audio');
               song.currentTime=(song.duration*width)/100;
               //console.log(song.currentTime);
          });

          // $('#back').on('click',function(){
          //       $('.effects').addClass('hidden');
          //       $('.content').removeClass('hidden');
          //       $('.label').removeClass('hidden');
          // });



          //adding tuna library

        //   var context= new AudioContext();
        //   var wahwah;
        //   var convolver;
        //   var cabinet;
        //   var overdrive;
        //   var compressor;
        //   function tunaDemo(){
        //
        //   var tuna = new Tuna(context);
        //
        //   wahwah = new tuna.WahWah({
        //       automode: true,                //true/false
        //       baseFrequency: 0.5,            //0 to 1
        //       excursionOctaves: 2,           //1 to 6
        //       sweep: 0.6,                    //0 to 1
        //       resonance: 100,                 //1 to 100
        //       sensitivity: 0.5,              //-1 to 1
        //       bypass: 1
        //   });
        //   convolver = new tuna.Convolver({
        //       highCut: 100,                         //20 to 22050
        //       lowCut: 22050,                             //20 to 22050
        //       dryLevel: 0.5,                            //0 to 1+
        //       wetLevel: 1,                            //0 to 1+
        //       level: 0,                               //0 to 1+, adjusts total output of both wet and dry
        //       impulse: "impulse_rev.wav",    //the path to your impulse response
        //       bypass: 1
        //   });
        //   cabinet = new tuna.Cabinet({
        //       makeupGain: 10,                                 //0 to 20
        //       impulsePath: "impulse1.mp3",    //path to your speaker impulse
        //       bypass: 1
        //   });
        //   overdrive = new tuna.Overdrive({
        //       outputGain: 0.5,         //0 to 1+
        //       drive: 0.7,              //0 to 1
        //       curveAmount: 1,          //0 to 1
        //       algorithmIndex: 2,       //0 to 5, selects one of our drive algorithms
        //       bypass: 1
        //   });
        //   pingPongDelay = new tuna.PingPongDelay({
        //       wetLevel: 0.5, //0 to 1
        //       feedback: 0.3, //0 to 1
        //       delayTimeLeft: 150, //1 to 10000 (milliseconds)
        //       delayTimeRight: 200 //1 to 10000 (milliseconds)
        //   });
        //   filter = new tuna.Filter({
        //       frequency: 22050, //20 to 22050
        //       Q: 1, //0.001 to 100
        //       gain: 0, //-40 to 40 (in decibels)
        //       filterType: "notch", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
        //       bypass: 1
        //   });
        //   compressor = new tuna.Compressor({
        //       threshold: -42,    //-100 to 0
        //       makeupGain: 1,     //0 and up (in decibels)
        //       attack: 30,         //0 to 1000
        //       release: 0,        //0 to 3000
        //       ratio: 4,          //1 to 20
        //       knee: 5,           //0 to 40
        //       automakeup: true,  //true/false
        //       bypass: 1
        //   });
        // }
        //
        // tunaDemo();
        // var song_tuna =document.querySelector('audio');
        // var source = context.createMediaElementSource(song_tuna);
        // //var source=context.createBufferSource();
        // source.connect(wahwah.input);
        // source.connect(convolver.input);
        // source.connect(cabinet.input);
        // source.connect(overdrive.input);
        // source.connect(compressor.input);
        // wahwah.connect(context.destination);
        // convolver.connect(context.destination);
        // cabinet.connect(context.destination);
        // overdrive.connect(context.destination);
        // compressor.connect(context.destination);
        //
        // var button = document.querySelector('#wahwah');
        // var button4 = document.querySelector('#convolver');
        // var button5 = document.querySelector('#cabinet');
        // var button8 = document.querySelector('#overdrive');
        // var button11 = document.querySelector('#compressor');
        //
        // button.addEventListener("click",function(e){
        //       effects_clicked(button);
        //       if(wahwah.bypass){
        //       wahwah.bypass=false;
        //       console.log("wahwah on");
        //       }
        //       else{
        //           wahwah.bypass=true;
        //           console.log("wahwah off");
        //       }
        // });
        // button4.addEventListener("click",function(e){
        //       effects_clicked(button4);
        //       if(convolver.bypass){
        //       convolver.bypass=false;
        //       console.log("convolver on");
        //       }
        //       else{
        //         convolver.bypass=true;
        //          console.log("convolver off");
        //        }
        // });
        // button5.addEventListener("click",function(e){
        //     effects_clicked(button5);
        //     if(cabinet.bypass){
        //     cabinet.bypass=false;
        //     console.log("echo on");
        //     }
        //     else{
        //     cabinet.bypass=true;
        //     console.log("echo off");
        //     }
        // });
        // button8.addEventListener("click",function(e){
        //      effects_clicked(button8);
        //      if(overdrive.bypass){
        //      overdrive.bypass=false;
        //      console.log("overdrive on");
        //      }
        //      else{
        //        overdrive.bypass=true;
        //        console.log("overdrive off");
        //      }
        // });
        // button11.addEventListener("click",function(e){
        //       effects_clicked(button11);
        //       if(compressor.bypass){
        //       compressor.bypass=false;
        //       console.log("vibration on");
        //       }
        //       else{
        //           compressor.bypass=true;
        //           console.log("vibration off");
        //       }
        // });

          //this method was experimented by me

          // $('#song1').click(function() {
          //   addSongNameClickEvent(0);
          // });
          // $('#song2').click(function() {
          //   addSongNameClickEvent(1);
          // });
          //
          // $('#song3').click(function() {
          //   addSongNameClickEvent(2);
          // });
          //
          // $('#song4').click(function() {
          //   addSongNameClickEvent(3);
          // });

          //another method taught by sir

          // addSongNameClickEvent(fileNames[0],1);
          // addSongNameClickEvent(fileNames[1],2);
          // addSongNameClickEvent(fileNames[2],3);
          // addSongNameClickEvent(fileNames[3],4);

          // for (var i = 0; i < fileNames.length ; i++) {
          //   addSongNameClickEvent(fileNames[i],i+1);
          // }

          function toggleSong() {
          if(song.paused == true) {
              //console.log('Playing');
              $('.play-icon').removeClass('fa-play').addClass('fa-pause');
              song.play();
          }
          else {
              //console.log('Pausing');
              $('.play-icon').removeClass('fa-pause').addClass('fa-play');
              song.pause();
              }
          }

          function fancyTimeFormat(time)
          {
              // Hours, minutes and seconds
              var hrs = ~~(time / 3600);
              var mins = ~~((time % 3600) / 60);
              var secs = time % 60;

              // Output like "1:01" or "4:03:59" or "123:03:59"
              var ret = "";

              if (hrs > 0) {
                  ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
              }

              ret += "" + mins + ":" + (secs < 10 ? "0" : "");
              ret += "" + secs;
              return ret;
          }


          //turning off page count by dataTables

          //function created by me


          // function addSongNameClickEvent(index)
          // {
          //   var i=index;
          //   var audio = document.querySelector('audio');
          //   var currentSong=audio.src;
          //   if(currentSong.search(fileNames[i]) != -1)
          //   {
          //     //console.log('If statement executing');
          //     toggleSong();
          //   }
          //   else{
          //   // console.log(audio.paused);
          //   //console.log('Else statement executing');
          //   audio.src = fileNames[i];
          //   toggleSong();
          // }
          // }
          //this funvction is about

          function updateCurrentTime() {
              // var song = document.querySelector('audio');
              //console.log(song.currentTime);
              //console.log(song.duration);
              var currentTime=Math.floor(song.currentTime);
              var duration=Math.floor(song.duration);
              var bar=(currentTime*100)/duration;
              currentTime = fancyTimeFormat(currentTime);
              duration = fancyTimeFormat(duration);
              $('.time-elapsed').text(currentTime);
              $('.song-duration').text(duration);
              Progressbar(bar);
          }
          // function taught by sir
          function addSongNameClickEvent(songobj,position)
          {
            var id = '#song' + position;
            var songName=songobj.fileName;
            $(id).click(function()
            {
              var audio = document.querySelector('audio');
              var currentSong = audio.src;
                if(songNumber != position)     //in case song different hai then ye condition satisfy hogi
                {
                  audio.src = songName;
                  songNumber=position;    //songNumber update kar rahe Hai
                  changeCurrentSongDetails(songobj);
                }
                toggleSong();
              });
          }
          function changeCurrentSongDetails(songobj)
          {
                $('.current-song-image').attr('src','img/'+songobj.imageName);
                $('.current-song-name').text(songobj.name);
                $('.current-song-album').text(songobj.album);
          }
          function step_frwd() {
              var audio=document.querySelector('audio');
                      if(songNumber<songs.length)
                      {
                          var next=songs[songNumber];
                          audio.src= next.fileName;
                          changeCurrentSongDetails(next);
                          toggleSong();
                          songNumber++;
                        }
                       else {
                           var next=songs[0];
                           audio.src=next.fileName;
                           changeCurrentSongDetails(next);
                           toggleSong();
                           songNumber=1;
                       }
          }
          function step_bckrwd() {
            var audio=document.querySelector('audio');
                      if(songNumber>1)
                      {
                          var prev=songs[songNumber-2];
                          audio.src=prev.fileName;
                          changeCurrentSongDetails(prev);
                          toggleSong();
                          songNumber--;
                            //console.log(songNumber);
                        }
                       else {
                           var prev=songs[songs.length-1];
                           audio.src=prev.fileName;
                           changeCurrentSongDetails(prev);
                           toggleSong();
                           songNumber=songs.length;
                       }
          }
          function randomExcluded(min, max, excluded) {
                var n = Math.floor(Math.random() * (max-min) + min);
                if (n >= excluded) n++;
                return n;
          }

          function Progressbar(bar){                  // function to make the progressbar filled when the song is playing
                  var ele = document.querySelector('.progress-filled');
                  ele.style.width= bar +"%";
                  //console.log(bar);
          }
          function effects_clicked(id1){
              $(id1).toggleClass('clicked');
              // console.log('clicked');
          }
          function changeVolume(val){
                   var aud=document.querySelector('audio');
                   aud.volume=val;
                   if(val==0)
                   {
                       $('.favolume').addClass('fa-volume-off').removeClass('fa-volume-up')
                      // console.log('volume0')
                   }
                   else {
                     $('.favolume').addClass('fa-volume-up').removeClass('fa-volume-off')
                    // console.log('volume high');
                   }
          }
          // $('#upload').click(function(event){
          //      var x = document.getElementById("upload");
          //        var txt = "";
          //          var file = x.files[0];
          //              txt +=" File:"+file.name;
          //        var input=document.querySelector('audio');
          //        input.src=x.value;
          //        var ele=document.getElementById ("demo");
          //        $('#demo').addClass('demo')
          //        ele.innerHTML = txt;
          // });
