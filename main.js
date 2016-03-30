'use strict';


$(document).ready(function(){
  init();
});



function init(){

  helloSequence();
    //
    // revealSpecks();
    //
    // setTimeout(function(){
    //   introSequence(0, 2);
    //   // mainCounter++;
    // } , 2000);

}

  var $helloMessage = $('.hello-message').detach().removeClass('hidden');
  var $helloSpeck = $('#hello').detach().removeClass('hidden');


  var $size1 = $('.size-1').detach().removeClass('hidden');
  var $size2 = $('.size-2').detach().removeClass('hidden');
  var $size3 = $('.size-3').detach().removeClass('hidden');
  var $size4 = $('.size-4').detach().removeClass('hidden');
  var $size5 = $('.size-5').detach().removeClass('hidden');

  var $groups = [$size1, $size2, $size3, $size4, $size5, null];

  var mainCounter = 0;


  function revealSpecks(){
    $groups.forEach(function(e, i, arr){
      $('.bg-container').append($(e));
    });
  }



  function introSequence(counter, limit){

    if(counter === 0 && limit !== 0){
      $groups.forEach(function(e, i, arr){
        $(e).removeClass('in-focus');
      });
    }

    setTimeout(function(){

      $($groups[counter]).addClass('in-focus');

      if(counter >= 1){

          $($groups[counter-1]).removeClass('in-focus');

      }

      if($groups[counter+1] !== null && counter < limit) {
        introSequence(++counter, limit);
      } else if (counter === limit){
        // console.log($groups[counter]);
        textType(specialWordsEachPhrase[mainCounter]);
        focusFlash(++limit);
      }

    }, 300);


  }



  function helloSequence(){




    setTimeout(function(){
      $('.bg-container').append($helloSpeck);
      var cycleInt = self.setInterval("changeBG()", 1200);
    }, 500);

    setTimeout(function(){
      $('.bg-container').append($helloMessage);
    }, 3100);


    setTimeout(function(){
      $('.hello-message').removeClass('blurInSubtle add-blur');
      // $('.hello-message').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      // });
    }, 4300);

    setTimeout(function(){
      $('#hello').removeClass('blurIn');
    }, 4000);

    // setTimeout(function(){
    //   clearInterval(cycleInt);
    // }, 10000);


    setTimeout(function(){
      revealSpecks();
    }, 6900);

    setTimeout(function(){
      $('#hello, .hello-message').addClass('blurOutSubtle').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('#hello, .hello-message').remove();
      });
      setTimeout(function(){
        mainCounter++
        introSequence(0, 2);
      },2900)
      $('#hello').empty().css('overflow','').removeClass('in-focus');
    }, 7300);

  }






  var cycleInt;
  var helloArray = ["imgs/hello-003.gif", "imgs/hello-001.gif", "imgs/hello-003.gif", "imgs/hello-004.gif", "imgs/hello-005.gif", "imgs/hello-006.gif"];
  var now = 0;
  function changeBG(){
    now = (now+1) % helloArray.length ;
    $('#hello').css('background-image', 'url("' + helloArray[now] + '")');
  }











  var phrases = ['Hello!', 'My name is James McIntyre.', 'I am a web developer', 'I turn focus into great products.'];
  var specialWordsEachPhrase = [{words: [0], style: 'hello'}, {words: [3, 4], style: 'name'}, {words: [3, 4], style: 'swap'}, {words: [2], style: 'focus'}];
  var $introTextContainer = $('#text-contain');


  function textType(specialWordsAndStyle){

    var words = phrases[mainCounter].split(' ');


    var spans = words.map(function(e, i, arr){

        if(specialWordsAndStyle.words.indexOf(i) > -1){
          return '<span class="intro fade-in fast ' + specialWordsAndStyle.style + '">' + e + ' </span>';
        }
        else{
          return '<span class="intro norm fade-in fast">' + e + ' </span>';
        }

      });

    spans.forEach(function(e, i, arr){
      return setTimeout(function(){
        $introTextContainer.append(e);
        if(i === (arr.length - 1) && specialWordsAndStyle.style === 'swap'){
          swapSequence();
        }
        else if(i === (arr.length - 1) && specialWordsAndStyle.style === 'focus'){
          focusSequence();
        }
      }, i*280);
    });

  }



  function swapSequence(){
    setTimeout(function(){
      $('.swap').remove();
    }, 2500);
  }



  function focusSequence(){

    setTimeout(function(){
      var $currentSpecks = $('.current-speck');
      $currentSpecks.each(function(){
        $(this).css('overflow', '').empty();
      });
      $('.speck, .norm').addClass('highBlur');
      $('.focus').removeClass('focus');
    }, 1000);
    setTimeout(function(){
      $('.speck, .norm').removeClass('highBlur');
    }, 2500);

  }


  var videoSources3 = ['imgs/focus_zen.mp4','imgs/focus_wingsuit.mp4','imgs/focus_cheetah.mp4'];
  var videoSources = [[], [], videoSources3, [], [] ];

  function focusFlash(limit){

    var $selection = $('.size-3 .speck');

    $selection.each(function(index){

        var videoSrcString = videoSources[mainCounter-1][index];

        var $currentSpeck = $(this);

        var videoComponent = '<video class="imgtest addImg" autoplay loop ><source src=' + videoSrcString + ' type="video/mp4" /></video>';
        var imageComponent = '<img class="imgtest addImg" src="http://i.giphy.com/3osxYgQeaZMV8rPiGQ.gif"></img>';

        // var $testVid = $(videoComponent).addEventListener('ended', loopThrough(limit));

        setTimeout(function(){
          // $currentSpeck.addClass('focusbg');
          $currentSpeck.css('overflow', 'hidden').addClass('current-speck').append(videoComponent);
        }, (500));

    });

  };
