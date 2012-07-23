/*Jquery Lightbox*/
/**
 * jQuery lightBox plugin
 * This jQuery plugin was inspired and based on Lightbox 2 by Lokesh Dhakar (http://www.huddletogether.com/projects/lightbox2/)
 * and adapted to me for use like a plugin from jQuery.
 * @name jquery-lightbox-0.5.js
 * @author Leandro Vieira Pinho - http://leandrovieira.com
 * @version 0.5
 * @date April 11, 2008
 * @category jQuery plugin
 * @copyright (c) 2008 Leandro Vieira Pinho (leandrovieira.com)
 * @license CCAttribution-ShareAlike 2.5 Brazil - http://creativecommons.org/licenses/by-sa/2.5/br/deed.en_US
 * @example Visit http://leandrovieira.com/projects/jquery/lightbox/ for more informations about this jQuery plugin
 */
(function($){$.fn.lightBox=function(settings){settings=jQuery.extend({overlayBgColor:'#000',overlayOpacity:0.8,fixedNavigation:false,imageLoading:'images/lightbox-ico-loading.gif',imageBtnPrev:'images/lightbox-btn-prev.gif',imageBtnNext:'images/lightbox-btn-next.gif',imageBtnClose:'images/lightbox-btn-close.gif',imageBlank:'images/lightbox-blank.gif',containerBorderSize:10,containerResizeSpeed:400,txtImage:'Image',txtOf:'of',keyToClose:'c',keyToPrev:'p',keyToNext:'n',imageArray:[],activeImage:0},settings);var jQueryMatchedObj=this;function _initialize(){_start(this,jQueryMatchedObj);return false;}
function _start(objClicked,jQueryMatchedObj){$('embed, object, select').css({'visibility':'hidden'});_set_interface();settings.imageArray.length=0;settings.activeImage=0;if(jQueryMatchedObj.length==1){settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));}else{for(var i=0;i<jQueryMatchedObj.length;i++){settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));}}
while(settings.imageArray[settings.activeImage][0]!=objClicked.getAttribute('href')){settings.activeImage++;}
_set_image_to_view();}
function _set_interface(){$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="'+settings.imageLoading+'"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="'+settings.imageBtnClose+'"></a></div></div></div></div>');var arrPageSizes=___getPageSize();$('#jquery-overlay').css({backgroundColor:settings.overlayBgColor,opacity:settings.overlayOpacity,width:arrPageSizes[0],height:arrPageSizes[1]}).fadeIn();var arrPageScroll=___getPageScroll();$('#jquery-lightbox').css({top:arrPageScroll[1]+(arrPageSizes[3]/10),left:arrPageScroll[0]}).show();$('#jquery-overlay,#jquery-lightbox').click(function(){_finish();});$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function(){_finish();return false;});$(window).resize(function(){var arrPageSizes=___getPageSize();$('#jquery-overlay').css({width:arrPageSizes[0],height:arrPageSizes[1]});var arrPageScroll=___getPageScroll();$('#jquery-lightbox').css({top:arrPageScroll[1]+(arrPageSizes[3]/10),left:arrPageScroll[0]});});}
function _set_image_to_view(){$('#lightbox-loading').show();if(settings.fixedNavigation){$('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();}else{$('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();}
var objImagePreloader=new Image();objImagePreloader.onload=function(){$('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);objImagePreloader.onload=function(){};};objImagePreloader.src=settings.imageArray[settings.activeImage][0];};function _resize_container_image_box(intImageWidth,intImageHeight){var intCurrentWidth=$('#lightbox-container-image-box').width();var intCurrentHeight=$('#lightbox-container-image-box').height();var intWidth=(intImageWidth+(settings.containerBorderSize*2));var intHeight=(intImageHeight+(settings.containerBorderSize*2));var intDiffW=intCurrentWidth-intWidth;var intDiffH=intCurrentHeight-intHeight;$('#lightbox-container-image-box').animate({width:intWidth,height:intHeight},settings.containerResizeSpeed,function(){_show_image();});if((intDiffW==0)&&(intDiffH==0)){if($.browser.msie){___pause(250);}else{___pause(100);}}
$('#lightbox-container-image-data-box').css({width:intImageWidth});$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({height:intImageHeight+(settings.containerBorderSize*2)});};function _show_image(){$('#lightbox-loading').hide();$('#lightbox-image').fadeIn(function(){_show_image_data();_set_navigation();});_preload_neighbor_images();};function _show_image_data(){$('#lightbox-container-image-data-box').slideDown('fast');$('#lightbox-image-details-caption').hide();if(settings.imageArray[settings.activeImage][1]){$('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();}
if(settings.imageArray.length>1){$('#lightbox-image-details-currentNumber').html(settings.txtImage+' '+(settings.activeImage+1)+' '+settings.txtOf+' '+settings.imageArray.length).show();}}
function _set_navigation(){$('#lightbox-nav').show();$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({'background':'transparent url('+settings.imageBlank+') no-repeat'});if(settings.activeImage!=0){if(settings.fixedNavigation){$('#lightbox-nav-btnPrev').css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'}).unbind().bind('click',function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});}else{$('#lightbox-nav-btnPrev').unbind().hover(function(){$(this).css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'});},function(){$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});}).show().bind('click',function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});}}
if(settings.activeImage!=(settings.imageArray.length-1)){if(settings.fixedNavigation){$('#lightbox-nav-btnNext').css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'}).unbind().bind('click',function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});}else{$('#lightbox-nav-btnNext').unbind().hover(function(){$(this).css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'});},function(){$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});}).show().bind('click',function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});}}
_enable_keyboard_navigation();}
function _enable_keyboard_navigation(){$(document).keydown(function(objEvent){_keyboard_action(objEvent);});}
function _disable_keyboard_navigation(){$(document).unbind();}
function _keyboard_action(objEvent){if(objEvent==null){keycode=event.keyCode;escapeKey=27;}else{keycode=objEvent.keyCode;escapeKey=objEvent.DOM_VK_ESCAPE;}
key=String.fromCharCode(keycode).toLowerCase();if((key==settings.keyToClose)||(key=='x')||(keycode==escapeKey)){_finish();}
if((key==settings.keyToPrev)||(keycode==37)){if(settings.activeImage!=0){settings.activeImage=settings.activeImage-1;_set_image_to_view();_disable_keyboard_navigation();}}
if((key==settings.keyToNext)||(keycode==39)){if(settings.activeImage!=(settings.imageArray.length-1)){settings.activeImage=settings.activeImage+1;_set_image_to_view();_disable_keyboard_navigation();}}}
function _preload_neighbor_images(){if((settings.imageArray.length-1)>settings.activeImage){objNext=new Image();objNext.src=settings.imageArray[settings.activeImage+1][0];}
if(settings.activeImage>0){objPrev=new Image();objPrev.src=settings.imageArray[settings.activeImage-1][0];}}
function _finish(){$('#jquery-lightbox').remove();$('#jquery-overlay').fadeOut(function(){$('#jquery-overlay').remove();});$('embed, object, select').css({'visibility':'visible'});}
function ___getPageSize(){var xScroll,yScroll;if(window.innerHeight&&window.scrollMaxY){xScroll=window.innerWidth+window.scrollMaxX;yScroll=window.innerHeight+window.scrollMaxY;}else if(document.body.scrollHeight>document.body.offsetHeight){xScroll=document.body.scrollWidth;yScroll=document.body.scrollHeight;}else{xScroll=document.body.offsetWidth;yScroll=document.body.offsetHeight;}
var windowWidth,windowHeight;if(self.innerHeight){if(document.documentElement.clientWidth){windowWidth=document.documentElement.clientWidth;}else{windowWidth=self.innerWidth;}
windowHeight=self.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){windowWidth=document.documentElement.clientWidth;windowHeight=document.documentElement.clientHeight;}else if(document.body){windowWidth=document.body.clientWidth;windowHeight=document.body.clientHeight;}
if(yScroll<windowHeight){pageHeight=windowHeight;}else{pageHeight=yScroll;}
if(xScroll<windowWidth){pageWidth=xScroll;}else{pageWidth=windowWidth;}
arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight);return arrayPageSize;};function ___getPageScroll(){var xScroll,yScroll;if(self.pageYOffset){yScroll=self.pageYOffset;xScroll=self.pageXOffset;}else if(document.documentElement&&document.documentElement.scrollTop){yScroll=document.documentElement.scrollTop;xScroll=document.documentElement.scrollLeft;}else if(document.body){yScroll=document.body.scrollTop;xScroll=document.body.scrollLeft;}
arrayPageScroll=new Array(xScroll,yScroll);return arrayPageScroll;};function ___pause(ms){var date=new Date();curDate=null;do{var curDate=new Date();}
while(curDate-date<ms);};return this.unbind('click').click(_initialize);};})(jQuery);

/* Jquery ThumbNailScroller 
* Ivan Gonzales
* Open Project
*
*/
(function($){
	ThumbScroller = function(el, options) {
		this.create(el, options);
	};
	$.extend(ThumbScroller.prototype, {
		
		version   : '1.0',
		
		create: function(el,  options) {
			
			this.defaults = {
				imageNext : 'images/ThumbNailsNext.png',
				imagePrev : 'images/ThumbNailsPrev.png',
				width: '',
				container: '',
				lightbox: false
			};
			this.obj = el, this.Attrib = {};
			this.o = {}, this.o = $.extend(true, this.defaults, options);
			var isDrag = false;
			this.createScroller(el);
			this.createHtml();
			this.addStyles();
			this.addEvents();
			this.addLightbox();
			this.auto = setInterval(this.autoPlay,5000);
			//this.autoPlay();
			
		},
		createScroller: function(el) {
			//console.log($(el));
			//console.log(this);
			var size = 0;
			var height = 0;
			var $imgs = $(el).find('img');
			var $li = $(el).find('li');
			var Count = $li.length;
			var outerW = 0;
			var liH = 0;
			var liW = 0;
			var width = 0;
			$li.each(function(i){
				liH = $(this).outerHeight(true);
				liW = $(this).outerWidth(true);
				width = $(this).width();
			});
			//console.log(liW);
			
			this.Attrib = { width: (liW*Count), count: Count, height: liH, tWidth: width };
		},
		addStyles: function(){
			var Attrib = this.Attrib;
			var mWidth = Math.ceil(Attrib['width']/2);
			var cursorHeight = $("#Tnext").height() / 2;
			if(this.o['width']!='') {
				mWidth = parseInt(this.o['width']);	
				mHeight = parseInt(this.o['container']);
			}else if(mWidth > 1000) {
				mWidth = mWidth - 200;
			}
			$(this.obj).css({height: (Attrib['height'] + 20), width: Math.ceil( mHeight ), position: 'relative'});
			$("#myScroll ul").css({
				width: Attrib['width']+'px'
			});
			$(".jspContainer").css({
				height: (Attrib['height']+10)+'px !important'
			});
			$("#myScroll").css({width: mWidth});
			$(".jspContainer").css({width: mWidth, height: (Attrib['height']+10)});
			$(".jspPane").css({padding: 0, width: mWidth, left: 0});
			$(".jspTrack").css({width: mWidth});
			$(".jspDrag").css({width: Math.ceil(((mWidth/2)+Attrib['height'])/2)});
			
			$("#Tnext,#Tprev").css({top:(($("#myScroll").height()/2) - cursorHeight)});
		},
		createHtml: function() {
			
			var $this = $(this.obj);
			var $ul = $(this.obj).find('ul');
			var html = '<div id="Tprev"></div>';
			html += '<div id="myScroll" style="overflow: hidden; padding: 0px;" class="jspScrollable" tabindex="0">';
			html +='<div class="jspContainer">';
			html +='	<div class="jspPane"><ul>';
			html += $ul.html();
			html += '</ul></div>';
			html +='</div>'
					+'<div class="jspHorizontalBar">'
					+'<div class="jspCap jspCapLeft">'
					+'</div>'
					+'<div class="jspTrack"">'
					+'<div class="jspDrag"">'
					+'<div class="jspDragLeft"></div>'
					+'<div class="jspDragRight"></div>'
					+'</div></div>'
					+'<div class="jspCap jspCapRight">'
					+'</div></div></div>'
			html += '<div id="Tnext"></div>';
			$this.empty();
			$this.append(html);
		},
		autoPlay: function(args) {
			var $nxt = $("#Tnext");
			var $prv = $("#Tprev");
			
			if(args != 'stop') {
				setTimeout(function(){
				$nxt.trigger('click');
				},6000);
				 this.auto = setInterval(this.autoPlay,5000);
			}else{
				clearInterval(this.auto)
			}
			
		},
		stop: function() {
			this.autoPlay('stop');
		},
		addLightbox: function() {
			if(this.o['lightbox'] == true) {
				var $self = this.obj;
				$self.find('img').each(function(i){
					var img = $(this).attr('src');
					$(this).parent('a').attr('href',img);
				});
				var id = $self.attr('id');
				$('#'+id + ' a ').lightBox();
			}
		},
		addEvents: function() {
			var $nxt = $("#Tnext");
			var $prv = $("#Tprev");
			$prv.hide();
			var isPrev = false;
			var isPrevClick = false;
			$jspContainer = $(".jspContainer");
			$jspDrag = $(".jspDrage");
			var sizes = this.Attrib['width'];
			var limitPane = (this.Attrib['width'])
			var jspW = $jspDrag.width();
			var $this = this;
			//console.log('t' + limitPane);
			$(".jspDrag").bind('drag',function( event){
				isDrag = true;
				$this.stop();
				var jspContainer = $(".jspContainer");
				var jspDrag = $(".jspDrag");
				var limits = jspContainer.width() - jspDrag.width();
				var perClick = limits/6;
				var perC = (limitPane - jspContainer.width())/6;
				var ofset = jspContainer.width() / jspDrag.width();
				var jspleft = $(".jspDrag").position().left;
				var jspane = $(".jspPane").position().left;
				if(Math.abs($(".jspPane").position().left) > Math.abs(limitPane - $(".jspPane").width())) {
					if(event.offsetX < Math.abs(limitPane - $(".jspPane").width())){
						$( ".jspPane" ).css(  {
							left: -event.offsetX 
						})
					}
				}else if(Math.abs($(".jspPane").position().left) > 0){
					if(event.offsetX > 0){
						$( ".jspPane" ).css(  {
							left: -event.offsetX 
						})
					}
				} else {
					$(".jspPane").css({left: -event.offsetX}, 'fast');
				}
				if($(".jspDrag").position().left > Math.abs(limits)) {
					if(event.offsetX < Math.abs(limits)){
						$( this ).css(  {
							left: event.offsetX 
						})
					}
				}else if($(".jspDrag").position().left < 0){
					if(event.offsetX > 0){
						$( this ).css(  {
							left: event.offsetX 
						})
					}
				}else{
					$( this ).css(  {
                        left: event.offsetX 
					});
				}
            }).bind('dragend',function(event){
				$this.autoPlay();
			});
			
			$nxt.bind('click',function(){
				isPrevClick = false;
				var jspContainer = $(".jspContainer");
				var jspDrag = $(".jspDrag");
				var limits = jspContainer.width() - jspDrag.width();
				//console.log(limits);
				var perClick = limits/6;
				var perC = (limitPane - jspContainer.width())/6;
				var ofset = jspContainer.width() / jspDrag.width();
				var jspleft = $(".jspDrag").position().left;
				var jspane = $(".jspPane").position().left;
				var add = jspane - (perC + ofset);
				var toDrag = jspleft+perClick;
				if(Math.abs(toDrag) > Math.abs(limits)) {
					add = Math.abs(jspane) + (jspane - Math.abs(limitPane - jspContainer.width()));
					toDrag = Math.abs(jspleft) + Math.abs(Math.abs(jspleft) - Math.abs(limits));
					$nxt.hide();
					setTimeout(function(){
							if(!isPrevClick) {
								$(".jspDrag").animate({left: 0},{duration: 'fast', easing: "swing"});
								$(".jspPane").animate({left: 0},{duration: 'fast', easing: "swing"});
								$nxt.show();
								$prv.hide();
							}
						},5000);
				}
				$(".jspDrag").animate({left: (toDrag)+'px'},{duration: 'fast', easing: "swing"});
				$(".jspPane").animate({left: (add)+'px'},{duration: 'fast', easing: "swing"});
				
				if(toDrag > 0){
					$prv.show();
				}else{
					$prv.hide();
					
				}
				
			});
			
				$prv.bind('click',function(){
					isPrevClick = true;
					var jspContainer = $(".jspContainer");
					var jspDrag = $(".jspDrag");
					var limits = jspContainer.width() - jspDrag.width();
					var perClick = limits/6;
					var perC = (limitPane - jspContainer.width())/6;
					var ofset = jspContainer.width() / jspDrag.width();
					var jspleft = $(".jspDrag").position().left;
					var jspane = $(".jspPane").position().left;
					var add = jspane + (perC + ofset);
					var toDrag = jspleft-perClick;
					//console.log(toDrag);
					if(toDrag < 0) {
						//add = Math.abs(jspane) + (jspane - Math.abs(limitPane - jspContainer.width()));
						add = 0;
						toDrag = 0;
						//toDrag = Math.abs(jspleft) + Math.abs(Math.abs(jspleft) - Math.abs(limits));
						$prv.hide();
						
					}
					$(".jspDrag").animate({left: (toDrag)+'px'},{duration: 'fast', easing: "swing"});
					$(".jspPane").animate({left: (add)+'px'},{duration: 'fast', easing: "swing"});
					if(toDrag < limits ){
						$nxt.show();
					}else{
						$nxt.hide();
						
					}
				});
			
		}
		
	});
	$.fn.myThumbScroll = function(options) {
		var self = this;
		d = new ThumbScroller(this,  options);
		//$('#myScroll').jScrollPane();
		return d;
	};
})(jQuery);