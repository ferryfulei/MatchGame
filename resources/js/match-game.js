var MatchGame = {};
var num=['苹果','香蕉','柠檬','水果','橘子','桃子','灰色','照片'];
var english=['apple','banana','lemon','fruit','orange','peach','grey','photo'];
var remaining = 16;
$(document).ready(function(){
  var cardValues = MatchGame.generateCardValues();
  var $game = $('#game');
  MatchGame.renderCards(cardValues,$game);
})
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */


 $('.btn').click(function(){
   var cardValues = MatchGame.generateCardValues();
   var $game = $('#game');
   MatchGame.renderCards(cardValues,$game);
 });

MatchGame.generateCardValues = function () {
  var originalArray = new Array;
  for(i=0;i<8;i++){
    originalArray.push(num[i]);
    originalArray.push(english[i]);
  }
  var newArray = new Array;
  while(originalArray.length!==0){
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    var index = getRandomInt(originalArray.length);
    newArray.push(originalArray[index]);
    originalArray.splice(index,1);
  }
  return newArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues,$game){
    var $card = $('.card');
    $game.data('track',[]);
    var colorArray = [
      'hsl(25, 85%, 65%)',
      'hsl(55, 85%, 65%)',
      'hsl(90, 85%, 65%)',
      'hsl(160, 85%, 65%)',
      'hsl(220, 85%, 65%)',
      'hsl(265, 85%, 65%)',
      'hsl(310, 85%, 65%)',
      'hsl(360, 85%, 65%)'];
    $game.empty();
    for(i=0;i<cardValues.length;i++){
      var $cardelement = $('<div class="col-sm-3 card"></div>');
      $cardelement.data('value',cardValues[i]);
      $cardelement.data('flipped',false);
      if(num.indexOf(cardValues[i])>=0){
        var j=num.indexOf(cardValues[i]);
      }else{
        var j=english.indexOf(cardValues[i]);
      }
      $cardelement.data('color',colorArray[j]);
      $game.append($cardelement);
    };
    $(".card").click(function(){
      MatchGame.flipCard($(this),$('#game'));
    })
    mytimer();
}
/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card,$game) {
  if($card.data('flipped')===true){
    return
  }else{
    $card.css('background-color',$card.data('color'));
    $card.html('<span class="text">'+$card.data('value')+'</span>');
    $card.data('flipped',true);
    $game.data('track').push($card);
    var cardtrack = $game.data('track');
    if(cardtrack.length===2){
      var num1 = num.indexOf(cardtrack[0].data('value'));
      var num2 = num.indexOf(cardtrack[1].data('value'))
      var num3 = english.indexOf(cardtrack[1].data('value'))
      var num4 = english.indexOf(cardtrack[0].data('value'))
      var a = (num1 == num3)&&(num1>=0);
      var b = (num2 == num4)&&(num2>=0);
      if(a||b)
      {
        cardtrack[0].css({
          "opacity":"0",
          "background-color":"darkgrey"
        }).show().animate({opacity:1});
        cardtrack[1].css({
          "opacity":"0",
          "background-color":"darkgrey"
        }).show().animate({opacity:1});
        remaining = remaining - 2;
        MatchGame.remainingcheck(remaining);
      }else{
        window.setTimeout(function() {
        cardtrack[0].css('background-color','rgb(32,64,86)');
        cardtrack[1].css('background-color','rgb(32,64,86)');
        cardtrack[0].text('');
        cardtrack[1].text('');
        cardtrack[0].data('flipped',false);
        cardtrack[1].data('flipped',false);
      } , 150);
      }
      $game.data('track',[]);
    }
  }
}

MatchGame.remainingcheck = function(remaining){
  debugger
  if(remaining == 0){
    $('#game').html('<h2 id="win"> You win. </h2>');
    clearInterval(timer);
  }
}
var timer ;
function mytimer(){
  var sec = 120;
  clearInterval(timer);
  timer = setInterval(function(){
   $('#hideMsg span').text(--sec);
   if (sec == 0) {
     clearInterval(timer);
      $('#game').html('<h2 id="win"> You lose. </h2>');
   }
},1000);
}
