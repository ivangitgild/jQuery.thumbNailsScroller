jQuery.thumbNailsScroller
=========================

My Jquery ThumbNail Scroller Version 1.0
(still in beta mode)

This is my own project which is a thumbnail scroller with drag events, autoplay events and next/prev buttons.

Dependencies: jQuery LightBox, Jquery Drag Events jquery.event.drag.js ~ v1.5 
Easy to setup.

Set-Up Procedure:
 1. The HTML COde
<pre> 
<div id="thumbscroller">
    <ul>
  			<li><a href="#">
					  <img src="images/image_01_thumb.jpg">
					</a>
				</li>
				<li><a href="#">
					  <img src="images/image_02_thumb.jpg">
					</a>
				</li>
				<li><a href="#">
					  <img src="images/image_03_thumb.jpg">
					</a>
				</li>
				<li><a href="#">
					  <img src="images/image_04_thumb.jpg">
					</a>
   </ul>
 </div>
</pre>

 2. The Jquery
    (function($){
  	  $(document).ready(function(){
		  	$('#thumbscroller').myThumbScroll();
		  });
    })
   Options: Scroller WIdth, => width, Container Width, => container, Ligthbox Feature => lightbox: true
   Code with Options:
    $(document).ready(function(){
  	  	$('#thumbscroller').myThumbScroll({width: '870',container: '950', lightbox: true});
		  });

 You can customize the styles if you want.