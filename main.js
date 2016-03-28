'use strict';


$(document).ready(function(){
  init();
});



function init(){

    setTimeout(function(){
      blur(0, 2);
      // mainCounter++;
    } , 2000);

}




  var $size1 = $('.size-1');
  var $size2 = $('.size-2');
  var $size3 = $('.size-3');
  var $size4 = $('.size-4');
  var $size5 = $('.size-5');

  var $groups = [$size1, $size2, $size3, $size4, $size5, null];

  var mainCounter = 2;


  function blur(counter, limit){



    if(counter === 0){
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
        blur(++counter, limit);
      } else if (counter === limit){
        // console.log($groups[counter]);
        textType(specialWordsEachPhrase[mainCounter]);
        imageFlash(++limit);
      }

    }, 300);


  }


  var phrases = ['My name is James McIntyre.', 'I am a web developer', 'I turn focus into great products.'];
  var specialWordsEachPhrase = [{words: [3, 4], style: 'bold'}, {words: [3, 4], style: 'swap'}, {words: [2], style: 'focus'}];


  var $introTextContainer = $('#text-contain');

  function textType(specialWordsAndStyle){

    var words = phrases[mainCounter].split(' ');

    var spans = words.map(function(e, i, arr){

        if(specialWordsAndStyle.words.indexOf(i) > -1){

          return '<span class="intro ' + specialWordsAndStyle.style + '">' + e + ' </span>';

        }else{
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

    var $currentSpecks = $('.current-speck');
    $currentSpecks.each(function(){
      $(this).css('overflow', '').empty();
    });
    $('.speck, .norm').addClass('highBlur');
    setTimeout(function(){
      $('.speck, .norm').removeClass('highBlur');
    }, 2500);

  }






  var videoSources3 = ['imgs/focus_zen.mp4','imgs/focus_wingsuit.mp4','imgs/focus_cheetah.mp4'];
  var videoSources = [[], [], videoSources3, [], [] ];

  function imageFlash(limit){

    var selectorText = '.size-'+limit+'.speck';

    var $selection = $(selectorText);

    $selection.each(function(index){

        console.log(limit);
        var videoSrcString = videoSources[limit-1][index];
        console.log(index, videoSrcString);

        var $currentSpeck = $(this);

        var videoComponent = '<video class="imgtest addImg" autoplay loop><source src=' + videoSrcString + ' type="video/mp4" /></video>';
        var imageComponent = '<img class="imgtest addImg" src="http://i.giphy.com/3osxYgQeaZMV8rPiGQ.gif"></img>';

        setTimeout(function(){
          // $currentSpeck.addClass('focusbg');
          $currentSpeck.css('overflow', 'hidden').addClass('current-speck').append(videoComponent);
        }, (500));

    });

  }
