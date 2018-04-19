var MatchGame = {};
var chinese=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var english=['un','duex','trois','quatre','clinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt'];
var unit1french = ["appeler(s')","blenvenue","bonjour","ce","club","et","etre","edudiant"];
var unit1chinese = ["名叫","欢迎","您好","这","俱乐部","和","是","大学生"];
var unit2french = ["a","ah","assistant(e)","badge","Belge","cafe","carte","chinois(e)"];
var unit2chinese = ["在","啊","助理","证章","比利时人","咖啡","卡片","中国的"];
var unit3french = ["adresse","age","aller","alors","ami(e)","an","au revior","avec"];
var unit3chinese = ["地址","年龄","去","那么","朋友","年","再见","和...一起"];
var french = ['one','two','three','four','five','six','seven','eight','nine','ten',
'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
var keepgoing;
var delaytime = 300;
var startdelay = 15000;
var timelimit = 60000;
var remaining = 16;
var gamestart = false;
var customfrench = [];
var customchinese = [];
$(document).ready(function () {
  $('#help').modal('show');
  var cardValues = MatchGame.generateCardValues();
  var $game = $('#game');
  MatchGame.renderCards(cardValues,$game);
})
$('#easy').click(function(){
  delaytime = 300;
  startdelay = 15000;
  timelimit = 60000;
})
$('#medium').click(function(){
  delaytime = 200;
  startdelay = 10000;
  timelimit = 45000;
})
$('#hard').click(function(){
  delaytime = 150;
  startdelay = 5000;
  timelimit = 30000;
})

$('#demo').click(function () {
  french = french;
  chinese = chinese;
})
$('#unit1').click(function () {
  french = unit1french;
  chinese = unit1chinese;
})
$('#unit2').click(function () {
  french = unit2french;
  chinese = unit2chinese;
})
$('#unit3').click(function () {
  french = unit3french;
  chinese = unit3chinese;
})
$('#custom').click(function () {
  french = customfrench;
  chinese = customchinese;
})
 $('#restart').click(function(){
   var cardValues = MatchGame.generateCardValues();
   var $game = $('#game');
   MatchGame.renderCards(cardValues,$game);
 });
 $('#starter').click(function(){
   gamestart = true;
   var cardValues = MatchGame.generateCardValues();
   var $game = $('#game');
   clearTimeout(keepgoing);
   document.getElementById("progress").classList.remove('bg-danger')
   MatchGame.renderCardssimple(cardValues,$game);
 });
MatchGame.generateCardValues = function () {

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
    var $card = $('.cards');
    $game.data('track',[]);
    document.getElementById("progress").classList.add('bg-danger')
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
      var $cardelement = $('<div class="col-sm-3 text cards">'+cardValues[i]+'</div>');
      $cardelement.data('value',cardValues[i]);
      $cardelement.data('flipped',false);
      $cardelement.data('color',colorArray[Math.floor(i/2)]);
      $game .append($cardelement);
    };
    shuffle($game);
    $(".cards").click(function(){
      MatchGame.flipCard($(this),$('#game'));
    })
    countdown();
    keepgoing = setTimeout(function () {
      document.getElementById("progress").classList.remove('bg-danger');
      $('.cards').empty();
      gamestart = true;
      mytimer();
    },startdelay);
}
/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card,$game) {
  if(($card.data('flipped')===true)||(gamestart == false)){
    return
  }else{
    $card.html('<span class="text">'+$card.data('value')+'</span>');
    $card.css('background-color','darkgrey');
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
          "background-color": cardtrack[0].data('color')
        })
        cardtrack[1].css({
          "background-color": cardtrack[1].data('color')
        })
        remaining = remaining - 2;
        MatchGame.remainingcheck(remaining);
      }else{
        window.setTimeout(function() {
        cardtrack[0].css('background-color','rgb(12,35,64)');
        cardtrack[1].css('background-color','rgb(12,35,64)');
        cardtrack[0].text('');
        cardtrack[1].text('');
        cardtrack[0].data('flipped',false);
        cardtrack[1].data('flipped',false);
      } , delaytime);
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
  if(remaining == 0){
    $('#game').html('<h2 id="win"> You win. </h2>');
    clearInterval(timer);
  }
}
function rearrange(input){
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
  var sec = timelimit/1000;
  clearInterval(timer);
  timer = setInterval(function(){
   sec = sec - 0.1;
   var current = (sec/(timelimit/1000))*100;
   var currentvalue = current.toString() + "%";
   $('.progress-bar').css('width',currentvalue);
   if (sec == 0) {
     clearInterval(timer);
      $('#game').html('<h2 id="win"> You lose. </h2>');
   }
},100);
}

function shuffle(div) {
    var parent = $(div);
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
}
function countdown(){
  var sec = startdelay/1000;
  clearInterval(timer);
  timer = setInterval(function(){
   sec = sec -0.1;
   var current = (sec/(startdelay/1000))*100;
   var currentvalue = current.toString() + "%";
   $('.progress-bar').css('width',currentvalue);
   if (sec == 0) {
     clearInterval(timer);
   }
},100);
}
$('#customsave').click(function () {
  debugger;
  var number = $('#numofword').val();
  for(var i = 1; i <= number ; i++){
    if (i%2 == 1){
      frenchword = document.getElementsByTagName("input")[i].value
      customfrench.push(frenchword);
    }else{
      chineseword = document.getElementsByTagName("input")[i].value
      customchinese.push(chineseword);
    }
  }
})
$('#generate').click(function () {
  var number = $('#numofword').val();
  $('.inputboxes').empty();
  for (var i = 1 ; i <= number ; i++ ){
    $('.inputboxes').append($('<div class="input-group"><div class="input-group-prepend"><span class="input-group-text" id="">English(French)|Chinese</span></div><input type="text" class="form-control word first"><input type="text" class="form-control word second"></div>'));
  }
})
MatchGame.renderCardssimple = function(cardValues,$game){
    var $card = $('.cards');
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
      var $cardelement = $('<div class="col-sm-3 text cards">'+cardValues[i]+'</div>');
      $cardelement.data('value',cardValues[i]);
      $cardelement.data('flipped',false);
      $cardelement.data('color',colorArray[Math.floor(i/2)]);
      $game .append($cardelement);
    };
    shuffle($game);
    $(".cards").click(function(){
      MatchGame.flipCardsimple($(this),$('#game'));
    })
    mytimer();
}
MatchGame.flipCardsimple = function($card,$game) {
  $card.css('background-color','darkgrey');
  if(($card.data('flipped')===true)||(gamestart == false)){
    return
  }else{
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
          "background-color": cardtrack[0].data('color')
        })
        cardtrack[1].css({
          "background-color": cardtrack[1].data('color')
        })
        setTimeout(function () {
          cardtrack[0].css({
            "background-color": "transparent"
          })
          cardtrack[1].css({
            "background-color": "transparent"
          })
        },300)
        remaining = remaining - 2;
        MatchGame.remainingcheck(remaining);
      }else{
        window.setTimeout(function() {
        cardtrack[0].css('background-color','rgb(12,35,64)');
        cardtrack[1].css('background-color','rgb(12,35,64)');
        cardtrack[0].data('flipped',false);
        cardtrack[1].data('flipped',false);
      } , delaytime);
      }
      $game.data('track',[]);
    }
  }
}
