'use strict';


$(document).ready(function(){
  init();
});


// TODO NOTE TO SELF YUCK! THIS CODE DEFINATELY NEEDS REFACTORED!!!

function init(){

  $.preloadImages = function() {
    for (var i = 0; i < arguments.length; i++) {
      console.log('preload', i);
      $("<img />").attr("src", arguments[i]);
    }
  }
  $.preloadImages("imgs/hello-003.gif", "imgs/hello-001.gif", "imgs/hello-003.gif", "imgs/hello-004.gif", "imgs/hello-005.gif", "imgs/design-001.gif", "imgs/design-002.gif", "imgs/design-003.gif", "imgs/me.jpg");

  setTimeout(function(){
    helloSequence();
  }, 4500);
}


  var $infoDiv = $('#info').detach().removeClass('hidden');
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

    $groups[2] = $('.size-3');

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
        textType(specialWordsEachPhrase[mainCounter]);
          if(limit === 2){
            myFace();
          }
          else if(limit === 3){
            focusFlash(++limit);
          }
          else if(limit === 4){
          }
      }

    }, 300);

  }







  function helloSequence(){

    $('.loading').remove();
    
    setTimeout(function(){
      $('.bg-container').append($helloSpeck);
      var cycleInt = self.setInterval("changeBG()", 1200);
    }, 500);

    setTimeout(function(){
      $('.bg-container').append($helloMessage);
    }, 3100);

    setTimeout(function(){
      $('.hello-message').removeClass('blurInSubtle add-blur');
    }, 4300);

    setTimeout(function(){
      $('#hello').removeClass('blurIn');
    }, 4000);

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
    }, 7000);

  }





  var cycleInt;
  var helloArray = ["imgs/hello-003.gif", "imgs/hello-001.gif", "imgs/hello-003.gif", "imgs/hello-004.gif", "imgs/hello-005.gif", "imgs/hello-006.gif"];
  var now = 0;
  function changeBG(){
    now = (now+1) % helloArray.length ;
    $('#hello').css('background-image', 'url("' + helloArray[now] + '")');
  }


  function myFace(){
    var $img = '<img id="face" class="addImg" src="imgs/me.jpg"></img>';

    setTimeout(function(){
      $('#spot1').css('overflow', 'hidden').append($img);
    }, 1000);

    setTimeout(function(){
      $('#face').css('opacity','1');
    }, 1200);


    setTimeout(function(){
      $('#spot1').css('overflow', '').empty();
      $('span.intro').remove().addClass('blurOutSubtle').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('span.intro').remove();
      });
      $('#spot1').addClass('speck size-3 floating').removeClass('special-speck-2 size-3-hello blurInFast blurOutSubtle');
    }, 4100);



    setTimeout(function(){
      mainCounter++;
      introSequence(0,3);
      $('.hello-message').addClass('blurOutSubtle').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.hello-message').remove();
      });
    }, 4200);


  }


  var phrases = ['Hello!', 'My name is James McIntyre.', 'I am a web developer.', 'I turn focus ', 'intro great products.'];
  var specialWordsEachPhrase = [{words: [0], style: 'hello'}, {words: [3, 4], style: 'name'}, {words: [3, 4], style: 'swap'}, {words: [2], style: 'focus'}, {words: [3], style: 'products'}];
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

    var spans = ['<span class="intro swap fade-in fast">UX </span>', '<span class="intro swap fade-in fast">designer.</span>'];
    var spans2 = ['<span class="intro swap fade-in fast">product </span>', '<span class="intro swap fade-in fast">guy.</span>'];

    setTimeout(function(){
      $('.swap').remove();
      $('#iam1').css('opacity', '0');
      $('#iam2').css('opacity', '1');
      spans.forEach(function(e, i, arr){
        return setTimeout(function(){
          $introTextContainer.append(e);
        }, i*280);
      });
    }, 2100);

    setTimeout(function(){
      $('.swap').remove();
      $('#iam2').css('opacity', '0');
      $('#iam3').css('opacity', '1');
      spans2.forEach(function(e, i, arr){
        return setTimeout(function(){
          $introTextContainer.append(e);
        }, i*280);
      });
    }, 5200);

    setTimeout(function(){
      $('.size-4').each(function(){
        $(this).empty().css('overflow', '');
      });
      $('.intro').remove();
      mainCounter++;
      introSequence(0,4);
    }, 7500);


  }







  function focusSequence(){

    setTimeout(function(){
      var $currentSpecks = $('.current-speck');
      $currentSpecks.each(function(){
        $(this).css('overflow', '').empty();
      });
      $('.speck, .norm').addClass('highBlur');
      $('.focus').removeClass('focus');
    }, 500);
    setTimeout(function(){
      $('.speck, .norm').removeClass('highBlur');
    }, 2500);

    setTimeout(function(){
      var spans = ['<span class="intro fade-in fast">into </span>', '<span class="intro fade-in fast">great </span>', '<span class="intro fade-in fast">products.</span>'];
      spans.forEach(function(e, i, arr){
        return setTimeout(function(){
          $introTextContainer.append(e);
        }, i*280);
      });
    }, 3100);

    setTimeout(function(){
      $('.speck').removeClass('fade-in').addClass('fade-out');
    }, 5000);

    setTimeout(function(){
      $('.intro').removeClass('fade-in floating two').addClass('fade-out');
    }, 7500);

    setTimeout(function(){
      $('#tenone').remove();
      $('#rowcontain').append($infoDiv);

    }, 9700);

  }



  var gifSources2 = ['imgs/design-001.gif', 'imgs/design-002.gif', 'imgs/design-003.gif'];
  var videoSources3 = ['imgs/focus_zen.mp4','imgs/focus_wingsuit.mp4','imgs/focus_cheetah.mp4'];
  var videoSources = [[], gifSources2, videoSources3, [], [] ];

  function focusFlash(limit){

    var selectionText = '.size-'+limit+'.speck';
    var $selection = $(selectionText);

    if(mainCounter === 1){

      $selection.each(function(index){
        var videoSrcString = videoSources[mainCounter-1][index];
        var $currentSpeck = $(this);
        var videoComponent = '<video class="imgtest addImg" autoplay loop ><source src=' + videoSrcString + ' type="video/mp4" /></video>';

        setTimeout(function(){
          $currentSpeck.css('overflow', 'hidden').addClass('current-speck').append(videoComponent);
        }, (500));

      });

    }
    else if(mainCounter === 2){

      $selection.each(function(index){
        var videoSrcString = videoSources[mainCounter-1][index];
        var imgId = 'iam' + (index+1);
        var $currentSpeck = $(this);
        var imageComponent = '<img id=' + imgId + ' class="addImg" src=' + videoSrcString + '></img>';

        setTimeout(function(){
          $currentSpeck.css('overflow', 'hidden').addClass('current-speck').append(imageComponent);
        }, (500));

      });

    }

  };
