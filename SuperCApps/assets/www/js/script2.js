var menu_html_rca = '';
var menu_html_guide_aide = '';
var iBody = ''; 
	
$(function() {
		
	
	$('#rcaframe').ready(function () {
		showLoading()
	});

	$('#rcaframe').load(function(){
        
		$('#a_right-panel2').hide();
		
       iBody = $("#rcaframe").contents().find("body");
	       
		       
	   var mtoggle = iBody.find('h3.menu-toggle');
	   if($(window).width()<600){ mtoggle.css('display','none');}
		       
	   if(navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPod") != -1){}else{}
		        
	   $("#rcaframe").height($(window).height())

	   var bt_add_photos = iBody.find("#bt_add_photos")
	   var bt_add_videos = iBody.find("#bt_add_videos")
	   
	   //console.log("bt_add_photos : " + bt_add_photos.attr('alt'))
			    
	   var id_post = iBody.find("div[id^='post-']").attr('id')
	   console.log("id_post : " + id_post)
			    
	   bt_add_photos.click(function() {
		   getPhoto(pictureSource.PHOTOLIBRARY, id_post); //From Photo Library
	   });
	   bt_add_videos.click(function() {
		   getVideo(pictureSource.PHOTOLIBRARY, id_post);
	   });
	    	    
	   
	   /* load menu */
	   if(menu_html_rca == ''){
		   
			   
			   iBody.find('.main-navigation').clone().appendTo('#right-panel');
			   if(deviceVersion < '4.0.0'){
				   var h = $(window).height();
				   h = parseInt(h) + 20;
				   $('#site-navigation').attr("style","position:relative;height:"+h+"px;margin-top: 0px;")
			   }
			   $(".main-navigation a").each(function(){
				   if($(this).attr("href") == '/') $(this).attr("href",url_site)
				   if($(this).attr("title") == 'Mon Compte') $(this).attr("href",url_site+"/wp-login.php");
				   $(this).attr("target",'rcaframe');
			   });
					
			   menu_html_rca = 'menu_ok';  
	   }
	   
	   
	   /*load menu 2 if exists */
	   /*
		if (iBody.find('.guideaidesopen .nav_map_open').length) {
			
			var menu = iBody.find('#nav_map.guid .guid_open');
			if($(window).width()<600) menu.css('display','none')
			
			var arp = $('#a_right-panel2');
			var h = $(window).height()-arp.height();
			arp.attr('style','top:'+h +'px !important;right: -10px !important;');
			arp.show();


				iBody.find('.guideaidesopen').clone().appendTo('#right-panel2');
				menu_html_guide_aide = 'menu_html_guide_aide_ok';
				
				var obj = $('#right-panel2');
				var nbrD = $('.guideaidesopen .rens').children('div').length-1;
				$('.nac-detail .arr-count').html('1/'+nbrD);
				var obj1 = 'obj'+(nbrD-1)
				$('.rensei').addClass(obj1);
				if(nbrD <= 1){
					$('.nac-detail').css({'display':'none'}); 
				}else{

					$('.nac-detail .arr-count').html('1/'+nbrD);
				}
				var co = 0;
				$('.arr-next',obj).click(function(){
					$('.obj'+co).css('display','none');
					if(co<nbrD-1){
						co ++;
					}else{
						co=0;
					}
					$('.obj'+co).css('display','block');
					$('.nac-detail .arr-count').html((co+1)+'/'+nbrD);
				});
				$('.arr-prev',obj).click(function(){
					$('.obj'+co).css('display','none');
					if(co>0){
						co--;
					}else{
						co = (nbrD-1);
					}
					$('.obj'+co).css('display','block');
					$('.nac-detail .arr-count').html((co+1)+'/'+nbrD);
				});
				
				
			
		}else{
			 $('#a_right-panel2').hide();
		}
	   */
	   
		/* menu click */
	   $(".main-navigation a").on("click",function(){
		   if($(this).parent('li').attr('id') == 'menu-item-808'){  //lyceo
			   window.open($(this).attr('href'),'_system');
			   return false;
		   }
		   showLoading()
		   $("#right-panel").panel( "close" );
		});
	   
	   $("#right-panel").panel({
			beforeclose: function( event, ui ) {
				if(deviceVersion < '4.0.0'){
					iBody.find('.iosSlider').show();
				}
				
			},
			beforeopen: function( event, ui ) {
				if(deviceVersion < '4.0.0'){
					iBody.find('.iosSlider').hide();
				}
			}
		});
	   
	   $("#right-panel2").panel({
			beforeclose: function( event, ui ) {
				console.log('close #right-panel2');
				$('#to-right-panel').show();
			},
			beforeopen: function( event, ui ) {
				console.log('open #right-panel2');
				$('#to-right-panel').hide();
			}
		});
				
		hideLoading();
				
		iBody.find('a').click(function(){
			
			var start_link = $(this).attr('href').substring(0,1);
			if(start_link != '#' && start_link != ''){
				
				if($(this).attr('id') == 'lyceolink'){
					window.open($(this).attr('href'),'_system');
					return false;
				}
				if($(this).hasClass( "swipebox" )){
					return false;
				}
				if($(this).attr('class') == 'nivo-lightbox'){
					return false;
					}
				
				showLoading()
			}
		})
		
		iBody.find('#tri').change(function(){
			showLoading()
		})
				
				
	});//end load iframe
		    
	function showLoading(){

		if(deviceVersion < '4.0.0'){
			
    		var h = $(window).height();
			h = (parseInt(h)-parseInt($('#loadering').height()))/2;
			var w = $(window).width();
			w = (parseInt(w)-parseInt($('#loadering').width()))/2;
			$('#loadering').attr("style","top:"+h+"px;left:"+w+"px")
    		$('#loadering').show();
			iBody.find('.iosSlider').hide();
		
		}else{
			
			$.mobile.loading("show", {
							text: "Custom loader",
							textVisible: true,
							theme: "a",
							textonly: true,
							html: "Chargement en cours..."
							});
		}
		$('#a_right-panel2').hide();
	}
		   
	function hideLoading(){
		if(deviceVersion < '4.0.0'){
			$('#loadering').hide();
		}else{
			$.mobile.loading( "hide" );	
		}
		
	}
});	