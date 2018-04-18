var MatchGame = {};
var chinese=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var english=['un','duex','trois','quatre','clinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt'];
var unit1french = ["l'école","les toilettes","le casier","la fontaine","magasin","le bureau","le stade","edudient"];
var unit1chinese = ["学校","厕所","更衣室","喷泉","商店","图书馆","办公室","学生"];
var french = ['one','two','three','four','five','six','seven','eight','nine','ten',
'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
var remaining = 16;
$(document).ready(function(){
  debugger;
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

$('.btn-outline-primary').click(function(){
  chinese = unit1chinese;
  french = unit1french
})
 $('.btn').click(function(){
   var cardValues = MatchGame.generateCardValues();
   var $game = $('#game');
   MatchGame.renderCards(cardValues,$game);
 });

MatchGame.generateCardValues = function () {
  debugger
  var tempchinese = chinese.slice();
  var tempfrench = french.slice();
   var newArray = new Array;
   while(newArray.length<16){
     var index = getRandomInt(tempchinese.length);
     newArray.push(tempchinese[index]);
     newArray.push(tempfrench[index]);
     tempchinese.splice(index,1);
     tempfrench.splice(index,1);
   }
   return newArray;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues,$game){
  debugger;
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
      var $cardelement = $('<div class="col-sm-3 cards text">'+cardValues[i]+'</div>');
      $cardelement.data('value',cardValues[i]);
      $cardelement.data('flipped',false);
      $cardelement.data('color',colorArray[Math.floor(i/2)]);
      $game .append($cardelement);
    };
    shuffle($game);
    $(".cards").click(function(){
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
      var num1 = chinese.indexOf(cardtrack[0].data('value'));
      var num2 = chinese.indexOf(cardtrack[1].data('value'))
      var num3 = french.indexOf(cardtrack[1].data('value'))
      var num4 = french.indexOf(cardtrack[0].data('value'))
      var a = (num1 == num3)&&(num1>=0);
      var b = (num2 == num4)&&(num2>=0);
      if(a||b)
      {
        cardtrack[0].css({
          "background-color":"darkgrey"
        })
        cardtrack[1].css({
          "background-color":"darkgrey"
        })
        remaining = remaining - 2;
        var current = ((16-remaining)/16)*100;
        var currentvalue = current.toString() + "%";
        $('.progress-bar').css('width',currentvalue);
        MatchGame.remainingcheck(remaining);
      }else{
        window.setTimeout(function() {
        cardtrack[0].css('background-color','black');
        cardtrack[1].css('background-color','black');
        cardtrack[0].data('flipped',false);
        cardtrack[1].data('flipped',false);
      } , 150);
      }
      $game.data('track',[]);
    }
  }
}
function getindex(input){
  if(chinese.indexOf(input)>=0){
    return chinese.indexOf(input);
  }else{
    return french.indexOf(input);
  }
}
MatchGame.remainingcheck = function(remaining){
  debugger
  if(remaining == 0){
    $('#game').html('<h2 id="win"> You win. </h2>');
    clearInterval(timer);
  }
}
function rearrange(input){
  debugger;
  var newArray = [];
  for(i=0;i<input.length;i++){
    for(j=i+1;j<input.length;j++){
        var a = getindex(input[i])
        var b = getindex(input[j])
        if(a == b){
          newArray.push(input[i]);
          newArray.push(input[j]);
        }
      }
  }
  return newArray;
}
var timer ;
function mytimer(){
  var sec = 45;
  clearInterval(timer);
  timer = setInterval(function(){
   $('#hideMsg span').text(--sec);
   if (sec == 0) {
     clearInterval(timer);
      $('#game').html('<h2 id="win"> You lose. </h2>');
   }
},1000);
}
function shuffle(div) {
    var parent = $(div);
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
}
