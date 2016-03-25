'use strict';


$(document).ready(function(){
  init();
});

function init(){


  setInterval(function(){

    setTimeout(function(){
      blur(0, 4);
    } , 500);

    setTimeout(function(){
      blur(0, 3);
    } , 5000);
    setTimeout(function(){
      blur(0, 2);
    } , 10000);
  }, 15500);



}



  var $size1 = $('.size-1');
  var $size2 = $('.size-2');
  var $size3 = $('.size-3');
  var $size4 = $('.size-4');
  var $size5 = $('.size-5');

  var $groups = [$size1, $size2, $size3, $size4, $size5, null];


  function blur(counter, limit){

    if(counter === 0){
      $groups.forEach(function(e, i, arr){
        $(e).removeClass('in-focus');
      });
    }

    if(counter === 2){
      $('#intro-text').removeClass('add-blur');
    }else{
      $('#intro-text').addClass('add-blur');
    }

    setTimeout(function(){

      $($groups[counter]).addClass('in-focus');

      if(counter >= 1){
        // setTimeout(function(){
          // $($groups[counter-1]).removeClass('in-focus');
          $($groups[counter-1]).removeClass('in-focus');

        // }, 90)
      }

      if($groups[counter+1] !== null && counter < limit) {
        blur(++counter, limit);
      }

    }, 300);


  }
