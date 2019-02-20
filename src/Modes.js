import React, { Component } from 'react'
import $ from './modes/jQuery'

function popup(t){
	 alert(t);
	 };
	 var theSquare = {
		 history: [],
		 menu: {
			 main: function(){
				 var a = $('<div/>').addClass('third red-b'), b = a.clone(), div = $('<div/>').attr('id','main-menu').addClass('div'), games = ["timetrial","track","reflexes","swatch","masher","counter","perimeter","mole"], f = function(){
					 var c = $(this).attr('game');
					 c()
				 };
				 a.attr('game','theSquare.'+games[0]+'.init').click(function(){f.call(this)});
				 for(var i=1;i<9;i++){
					 a = a.add(b.clone().attr('game','theSquare.'+games[i]+'.init').click(function(){f.call(this)}));
				 };
				 div.html(a);
				 $('#test').html(div);
			 }
		 },
		 timetrial: {
			 init: function(text){
				 theSquare.timetrial.active = false; 
				 var t, html = "Timetrial. Click the Square and then count to 10. You are allowed a 1 second margin so you must get it anywhere between 9.5 and 10.5 seconds. When you have counted 10 seconds click the Square again to stop the game and see if you are correct.<br/><br/>Click the Square to begin!",
				 div = $('<div/>').attr({'type': 'button', 'id': 'timetrial'}).addClass('div red-b pad').html(html).bind('click contextmenu', function(e){
					 if(!theSquare.timetrial.active && (e.which == 3 || e.which == 2)){
						 $(this).attr('data-prev')(); return;
					 };
					 if(!theSquare.timetrial.active){
						 var a = new Date().getTime();
						 t = setTimeout(function(){
							 div.click();
						 },20000)               
						 theSquare.timetrial.active = a;
						 $(this).removeClass('blue red-b').addClass('red').html("");
					 }else{
						 clearTimeout(t);
						 a = theSquare.timetrial.active;
						 const b = new Date().getTime() - a;
						 if(b>=9500 && b<=10500){
							 popup('Success!\n'+b);
							 theSquare.timetrial.init();
						 }else{
							 popup('Failure\n'+b)
							 theSquare.timetrial.init();
						 };
						 theSquare.timetrial.active = false;
					 };
				 });
				 $('#test').html(div);
			 },
			 active: false
		 },
		 track: {
			 init: function(text){
				 var html = "Click the Square to navigate around a track. A track will be laid out in front of you and you must navigate around the track while in the dark. Deviating from the track will cause you to fail.<br/><br/>Click the Square to begin.",
				 table = $('<table/>'),
				 div = $('<div/>').addClass('div').attr('id','track').append("<span class='holder' />").append(table),
				 track = [[0,1,0,0,0,0,0,0,0,0],
								 [0,1,1,1,1,1,1,1,1,0],
								 [0,0,0,0,0,0,0,0,1,0],
								 [0,0,0,0,0,0,0,0,1,0],
								 [0,0,0,0,0,0,0,0,1,0],
								 [0,0,0,0,0,0,0,0,1,0],
								 [0,0,0,0,0,0,0,0,1,0],
								 [0,0,0,1,1,1,1,1,1,0],
								 [0,0,0,1,0,0,0,0,0,0],
								 [0,0,0,1,0,0,0,0,0,0]];
				 for(var i=0;i<track.length;i++){
					 table.append($('<tr/>'));
					 for(let j=0;j<track[0].length;j++){
						 var td = (track[i][j] == 0) ? "oob" : "ib"; 
						 table.find('tr:last').append($('<td/>').addClass(td));
					 };
				 };
				 
				 table.find('tr:eq(0) td:eq(1)').html('Click<br/>to<br/>Start').click(function(){
					 $(this).addClass('over white-b').unbind('click').html("");
					 
					 $('.ib',table).addClass('cover').mouseover(function(){
						 $(this).addClass('over');
					 });
					 $('.oob',table).mouseover(function(){
						 $('#track table').find('.oob').unbind('mouseover').end().find('.cover').removeClass('cover').end().unbind('mouseleave').click(function(){
							 theSquare.track.init();
						 });
						 popup('too bad');
					 });
					 table.mouseleave(function(){
						 $('#track table').find('.oob').unbind('mouseover').end().find('.cover').removeClass('cover').end().unbind('mouseleave').click(function(){
							 theSquare.track.init();
						 });
						 if(!$('.ib:not(.over)',table).length){
							 popup('congrats');
						 }else{
							 popup('too bad');
						 };
					 });
				 });
				 const info = $('<div/>').addClass('red-b div pad').html(html).click(function(){
					 $('#test').html(div)
				 });
				 $('#test').html(info);
			 }
		 },
		 reflexes: {
			 init: function(text){
				 var t, div = $('<div/>').attr('id','reflexes').addClass('red-b pad').css({'width':'700px','height':'700px','margin':'auto'}).html("Wait for the square to change colour and then click as fast as possible. You must react quicker than 350 milliseconds.").click(function(){
					 $(this).removeClass('red-b').addClass('blue').html("");
					 if(!theSquare.reflexes.active){
						 theSquare.reflexes.active = true
						 t = setTimeout(function(){
							 $('#reflexes').css({'background-color':'red'});
							 var d = new Date().getTime();
							 theSquare.reflexes.active = d;
						 },(Math.random()*7+3)*1000);
					 }else{
						 var a = new Date().getTime() - theSquare.reflexes.active;
						 if($('#reflexes').css('background-color') == "rgb(0, 0, 255)"){
							 popup('too early');
						 }else if(a<=350){
							 popup('hurray\n'+a);
						 }else if(a>350){
							 popup('sorry\n'+a);
						 }
						 clearTimeout(t);
						 //theSquare.reflexes.active = false,
						 //theSquare.reflexes.init();
					 };
				 })
			 $('#test').html(div);
			 //input.wrap('<div class="centre" />');
			 },
			 active: false
		 },
		 swatch: {
			 init: function(text){
				 var t, html = "Swatch. Different coloured swatches will appear in the square, you must press the correct mouse button when the coloured swatch appears. Right is for Red and Left is for Blue. You must complete it within 10 seconds.<br/><br/>Click the Square to begin.",
				 a=[], u=0, div = $('<div/>').css({'border':'1px solid red'}).addClass('pad').attr({'data-a':'w','id':'swatch'}).html(html).bind('click contextmenu', function(e){
					 $(this).addClass('div').removeClass('pad').html("");
					 var c = (e.which == 3 || e.which == 2) ? "1" : "0";
					 if(u == 0){
						 if(!theSquare.swatch.active){
							 for(let i=0;i<20;i++){
								 a[i] = Math.floor(Math.random()*2);
							 };
						 theSquare.swatch.active = a;
						 }else{
							 a = theSquare.swatch.active;
						 };
						 $(this).attr('data-a',a[0]).css({'background-color':a[0] == 0 ? "blue" : "red"});
						 u = 1;
						 t = setTimeout(function(){
							 u = 0;
							 popup('Too slow');
							 theSquare.swatch.init();
						 },10000);
					 }else{
						 var b = $('#swatch').attr('data-a');
						 if(c == b){
							 if(u < a.length){
								 $(this).attr('data-a',a[u]).css({'background-color':a[u] == 0 ? "blue" : "red"});
							 }else{
								 clearTimeout(t);
								 popup('congratulations');
								 theSquare.swatch.active = false;
								 theSquare.swatch.init();
							 };
							 u = u + 1;
						 }else{
							 u = 0;
							 clearTimeout(t);
							 popup('wrong');
							 theSquare.swatch.init();
						 };
					 };
					 return false;
				 });
				 $('#test').html(div);
			 },
			 active: false
		 },
		 masher: {
			 init: function(text){
				 var t, d = {'width':'75px','height':'75px','float':'left','margin':'20px'}, html = "Masher. A series of buttons will appear and you must click all the button within 12 seconds. The timer will not start until you click the first button.<br/><br/>Click to begin.",
				 c = $('<div/>').css(d).addClass('blue').click(function(){
					 var n = $('#masher div'), $this = $(this);
					 if(theSquare.masher.active == false){
						 t = setTimeout(function(){
							 theSquare.masher.active = false;
							 popup('too slow');
							 theSquare.masher.init();
						 },12000);
					 };
					 theSquare.masher.active = true
					 $this.addClass('red').removeClass('blue');
					 if(n.filter('.blue').length == 0){
						 clearTimeout(t);
						 theSquare.masher.active = false;
						 popup('congrats');
						 theSquare.masher.init();
					 };
				 }), 
				 a = c.clone(true),
				 div = $('<div/>').attr('id','masher').addClass('pad').css({'border':'1px solid red'}).html(html).click(function(){
					 var $this = $(this);
					 $this.removeClass('pad').addClass('div').html("");
					 for(var i=1;i<4;i++){
						 a = a.add(c.clone(true));
						 //if(i%3 == 0) a = a.add("<br/>");
					 };
					 for(var i=1,b=a.clone(true);i<9;i++){
					 b = b.add(a.clone(true))
					 }
					 $this.html(b).unbind('click');
				 });
				 $('#test').html(div);
			 },
			 active: false
		 },
		 counter: {
			 init: function(text){
				 var t, div = $('<div/>').addClass('div').css({'border':'1px solid red'}).click(function(){
					 var $this = $(this);
					 if(!theSquare.counter.active){
						 t = setTimeout(function(){
							 if($this.data('clicks') == 20){
								 popup("hell yeah! "+$this.data('clicks'));
								 theSquare.counter.init();
								 theSquare.counter.active = false;
							 }else{
								 popup("try again "+$this.data('clicks'));
								 theSquare.counter.init();
								 theSquare.counter.active = false;
							 };
						 },4000);
						 $this.data('clicks',1);
						 $this.addClass('red');
					 }else{
						 $this.data('clicks',parseInt($this.data('clicks'))+1);
					 }
					 theSquare.counter.active = true;
				 });
				 $('#test').html(div) 
			 },
			 active: false
		 },
		 perimeter: {
			 init: function(text){
				 var t, table = $('<table/>'), div = $('<div/>').attr('id','perimeter').addClass('div').html(table);
				 for(var i=0;i<11;i++){
					 table.append($('<tr/>'));
					 for(var j=0, clas = "", td = $('<td/>');j<11;j++){
						 var clas = "", td = $('<td/>');
						 if(i == 5 && j == 5){
							 td.html("Click<br/>to<br/>Start").click(function(){
								 var f = function(){
										 var red = $('#perimeter .red'), x = red.prevAll().length, y = red.parent().prevAll().length;
										 if(x == 0 && y != 10) y++;
										 else if(y == 0 && x != 0) x--;
										 else if(y == 10 && x != 10) x++;
										 else if(x == 10 && y != 0) y--;
										 red.removeClass('red').closest('table').find('tr:eq('+y+') td:eq('+x+')').addClass('red').end().find('.red-b').html("Click<br/>to<br/>Stop");
								 };
								 if(!theSquare.perimeter.active){
									 theSquare.perimeter.active = true;
									 t = setInterval(f, 50);
									 f();
								 }else{
									 clearInterval(t);
									 if($('#perimeter .red.target').length == 1) popup('yay'); else popup('damn it');
									 theSquare.perimeter.init();
									 theSquare.perimeter.active = false;
								 };
							 });
						 };
						 clas += (j == 10 || j == 0 || i == 0 || i == 10) ? "perimeter" : (i == 5 && j == 5) ? "red-b" : "blank";
						 clas += (i == 0 && j == 5) ? " target red" : "";
						 table.find('tr:last').append(td.addClass(clas));
					 };
				 };
				 $('#test').html(div);
			 },
			 active: false
		 },
		 mentality: {
			 init: function(text){alert(theSquare.mentality.active);
				 var div = $('<div/>'), table = $('<table/>').html("<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>");
				 if(typeof theSquare.mentality.active != "object"){
					 var m = [];
					 for(var i=0;i<10;i++){
						 m[i] = [];
						 for(var j=0;j<5;j++){
							 var a = Math.floor(Math.random()*2);
							 m[i][j] = a;
						 };
					 };
					 theSquare.mentality.active = m;
				 }
				 console.log(m);
				 alert(theSquare.mentality.active);
			 },
			 active: false
		 },
		 mole: {
			 init: function(text){
				 var t, s, table = $('<table/>'), html = "Mole. When a square in the grid turns red you must click on the square and continue to do so for 20 squares in total.<br/><br/>Click to begin.",
					 div = $('<div/>').attr('id','mole').addClass('div red-b pad').html(html).click(function(){
					 for(var i=0;i<10;i++){
						 table.append($('<tr/>'));
						 for(let j=0;j<10;j++){
							 table.find('tr:last').append($('<td/>'));
						 };
					 };
					 div.html(table);
					 var $this = $(this),
					 f = function(){
						 s = setTimeout(function(){
							 theSquare.mole.active = 0;
							 popup('fail');
							 theSquare.mole.init();
						 },850);
						 if(theSquare.mole.active === 20){
							 clearTimeout(s);
							 theSquare.mole.active = 0;
							 popup('impressive');
							 theSquare.mole.init();
						 }else{
							 var x = Math.floor(Math.random() * 10), y = Math.floor(Math.random() * 10), a = table.find('tr:eq('+y+') td:eq('+x+')');
							 if(!a.is('.red')){
								 $('.red',table).removeClass('red').unbind('click');
								 a.addClass('red').click(function(){
									 theSquare.mole.active++
									 clearTimeout(s);
									 f();
								 });
							 }else{
								 clearTimeout(s);
								 f();
							 };
						 };
					 };
					 $this.unbind('click').removeClass('red-b pad');
					 t = setTimeout(f,1000);
				 });
				 $('#test').html(div);
			 },
			 active: 0
		 },
		 frenzy: {
			 init: function(){
				 var t, s, html = "Fenzy. Click the squares as quick as possible and within the time limit. The timer starts as soon as you click.<br/><br/>Click to begin.",
				 table = $('<table/>').on('click', '.red', function(){
					 var $this = $(this);
					 $this.removeClass('red');
					 var reds = div.find('.red').length;
					 console.log(reds);
					 if(!reds){
						 clearTimeout(t);
						 popup("Congrats!");
						 theSquare.frenzy.init();
					 }
				 }),
				 div = $('<div/>').attr('id','frenzy').addClass('div red-b pad').html(html).one('click', function(){
					 var $this = $(this), sqr = {}, rand = function(){
							 return Math.floor(Math.random()*10);
					 }, getSqr = function(){
						 var x = rand();
						 var y = rand();
						 if(typeof sqr[x] !== "object") sqr[x] = {};
						 sqr[x][y] ? getSqr() : sqr[x][y] = true;
					 };
					 for(var i=0; i<10;i++){
						 getSqr();               
					 }
	 console.log(sqr);
					 $this.unbind('click').removeClass('red-b pad');
					 for(var i=0;i<10;i++){
						 table.append($('<tr/>'));
						 for(let j=0;j<10;j++){
							 var td = $('<td/>');
							 if(sqr[i] && sqr[i][j]) td.addClass('red');
							 table.find('tr:last').append(td);
						 };
					 };
					 div.html(table);
					 t = setTimeout(function(){
						 alert('Too slow, sorry!');
						 theSquare.frenzy.init();
					 },4000);
				 });
				 $('#test').html(div);
			 }
		 },
		 missing: {
			 init: function(){
				 var t, s, html = "Memory. Red squares will appear on the screen. Remember where they are before they disappear because you might be missing one when they return. Click on the missing square, if you can!<br/><br/>Click to begin.",
				 table = $('<table/>'),
				 qty = 10,
				 div = $('<div/>').attr('id','missing').addClass('div red-b pad').html(html).one('click', function(){
					 var $this = $(this), sqr = {}, rand = function(){
							 return Math.floor(Math.random()*qty);
					 }, getSqr = function(){
						 var x = rand();
						 var y = rand();
						 if(typeof sqr[x] !== "object") sqr[x] = {};
						 sqr[x][y] ? getSqr() : sqr[x][y] = true;
					 };
					 for(var i=0; i<qty;i++){
						 getSqr();               
					 };
					 for(var i=0;i<10;i++){
						 table.append($('<tr/>'));
						 for(let j=0;j<10;j++){
							 var td = $('<td/>');
							 if(sqr[i] && sqr[i][j]) td.html("<div class='blue centre' style='width:70px; height: 70px;'></div>");
							 table.find('tr:last').append(td);
						 };
					 };
					 var miss = rand(),
					 blues = table.find('.blue'),
					 missed = table.find('.blue:eq('+miss+')').addClass('missed');
					 div.html(table);
					 $this.removeClass('red-b pad');
					 setTimeout(function(){
						 $.when( blues.animate({height: '0px', width: '0px'}).filter(':not(.missed)').delay(1000).animate({height: '70px', width: '70px'}) ).done(function(){
							 table.one('click', 'td', function(){
								 var $this = $(this);
								 if($this.find('.missed').length){
									 missed.css('background-color','green').animate({height: '70px', width: '70px'}, function(){
										 popup('Yup!');
										 theSquare.missing.init();
									 });
								 }else{
									 missed.css('background-color','red').animate({height: '70px', width: '70px'}, function(){
										 popup('Nope!');
										 theSquare.missing.init();
									 });
								 }
							 });
						 });
					 },2000);
				 });
			 $('#test').html(div);
			 }
		 }
	 };
	 theSquare.missing.init();

export default class Mode extends Component {
  render() {
	 return (
		<div id='#test'></div>
	 )
  }
}
