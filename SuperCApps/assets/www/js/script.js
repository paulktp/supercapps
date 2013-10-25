
var deviceVersion;

    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
    	// Now safe to use the Codova API

    	deviceVersion = device.version;

    	console.log(deviceVersion)
    	
    	var networkState = checkConnection();

    	 if (networkState == Connection.NONE) {

    		 navigator.notification.alert('L\'application requiert une connexion internet.');

    		 $('#main-page').hide();
    		 $('#no-internet').show();
    		 $('.ui-loader').hide();
    		 
         } else { 
        	 if($('#no-internet').is(':visible')){
	        	 $('#main-page').show();
	    		 $('#no-internet').hide();
        	 }
        	//CAMERA - PHOTO - VIDEO UPLOAD
        	 //
        	 pictureSource=navigator.camera.PictureSourceType;
             destinationType=navigator.camera.DestinationType;
             
             id_post = 0;
             f =  window.frames['rcaframe'];
             url_Upload = url_site+"/reception.php";
             url_Upload_video = url_site+"/reception_video.php";
             
             
             //PUSH NOTIFICATION

             //pushNotificationStart();

         } 
    }

    
    function alertDismissed(){
    }
  
    
    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

       
        return networkState;
      
    }
    
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    
    var id_post;		//the post id for media
    var f;				//iframe frame
    var url_Upload, url_Upload_video;		//url to upload script  
    
    var pushNotification;

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      console.log('imageURI : ' + imageURI);
      var button = f.document.getElementById('sendphoto');
            
      button.style.display = 'block';
      button.onclick = function() { uploadPhoto(imageURI) };
      
      // Show the captured photo
     //largeImage.style.display = 'block';
      //largeImage.src = imageURI;
    }
    
    function onVideoURISuccess(URI) {
        console.log('VideoURI : ' + URI);
        var button = f.document.getElementById('sendvideo');
              
        button.style.display = 'block';
        button.onclick = function() { uploadFile(URI) };
        
        // Show the captured photo
       //largeImage.style.display = 'block';
        //largeImage.src = imageURI;
      }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source,post_id) {
    	id_post = post_id;
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }
    
    function getVideo(source,post_id) {
    	id_post = post_id;
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onVideoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source,
        mediaType: Camera.MediaType.VIDEO });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
    	if(message != "Selection cancelled." && message != "no image selected")
    		navigator.notification.alert('Failed because: ' + message);
    }
    
    
    // Called when a photo is successfully retrieved
    //
    function uploadPhoto(imageURI) {
    	
    	console.log('imageURI : ' + imageURI);
    	//console.log('id_post_' + id_post);
    	
    	var loading = f.document.getElementById('loadingphoto'); 
    	loading.style.display = 'block';
    	
    	var options = new FileUploadOptions();
	    	options.fileKey="file";
	    	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	    	options.mimeType="image/jpeg";
    	var params = new Object();
    		params.id_post = id_post;
	    	options.params = params;
	    	options.chunkedMode = false;
    	var ft = new FileTransfer();
    		ft.upload(imageURI, url_Upload, win, fail, options);
    }
    
    function uploadFile(URI) {
    	
    	console.log('URI : ' + URI);
    	//console.log('id_post_' + id_post);
    	
    	var loading = f.document.getElementById('loadingvideo'); 
    	loading.style.display = 'block';
    	
    	var options = new FileUploadOptions();
	    	options.fileKey="file";
	    	options.fileName=URI.substr(URI.lastIndexOf('/')+1);
	    	options.mimeType="video/mp4";
    	var params = new Object();
	    	params.id_post = id_post;
	    	options.params = params;
	    	options.chunkedMode = true;
    	var ft = new FileTransfer();
    		ft.upload(URI, url_Upload_video, win, fail, options);
    }
    
    function win(r) {
    	//console.log("Code = " + r.responseCode);
    	//console.log("Response = " + r.response);
    	//console.log("Sent = " + r.bytesSent);
    	//alert(r.response);
    	
    	
    	var button = f.document.getElementById('sendphoto');   
        button.style.display = 'none';
        button.onclick = function() {};
        var button = f.document.getElementById('sendvideo');   
        button.style.display = 'none';
        button.onclick = function() {};
        var loading = f.document.getElementById('loadingphoto');   
        loading.style.display = 'none';
        var loading = f.document.getElementById('loadingvideo');   
        loading.style.display = 'none';
        
    	navigator.notification.alert("Media correctement soumis et en attente de validation.",alertDismissed,"Confirmation");
    }
    
    function fail(error) {
    	//alert("An error has occurred: Code = " = error.code);
    	//console.log("upload error source " + error.source);
        //console.log("upload error target " + error.target);
        navigator.notification.alert("Une erreur est survenue: Code = " + error.code);
    }

    
    
    /*******PUSH PLUGIN********/
    
    function pushNotificationStart()
    {
    	pushNotification = window.plugins.pushNotification;
        //AIzaSyDgk_4ln4Upk3w_XXoPGo2w-qdf5-C3_tU
        if (device.platform == 'android' || device.platform == 'Android') {
       	    pushNotification.register(successHandler, errorHandler,{"senderID":"222157888865","ecb":"onNotificationGCM"});
       	} else {
       	    pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
       	}
    }
    
    // result contains any message sent from the plugin call
    function successHandler (result) {
        alert('success result = '+result)
    }
    
    function tokenHandler (result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        alert('device token = '+result)
    }
    
    // result contains any error description text returned from the plugin call
    function errorHandler (error) {
        alert('error = '+error)
    }
    
    // iOS
    function onNotificationAPN(event) {
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }

        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }

        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
    
    // Android
    function onNotificationGCM(e) {
        console.log('<li>EVENT -> RECEIVED:' + e.event + '</li>');

        switch( e.event )
        {
            case 'registered':
            if ( e.regid.length > 0 )
            {
            	console.log('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regID);
            }
            break;

            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground)
                {
                	console.log('<li>--INLINE NOTIFICATION--' + '</li>');

                    // if the notification contains a soundname, play it.
                    var my_media = new Media("/android_asset/www/"+e.soundname);
                    my_media.play();
                }
                else
                {   // otherwise we were launched because the user touched a notification in the notification tray.
                    if (e.coldstart)
                    	console.log('<li>--COLDSTART NOTIFICATION--' + '</li>');
                    else
                    	console.log('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }

                console.log('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                console.log('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            break;

            case 'error':
            	console.log('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

            default:
            	console.log('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
        }
    }
    
    
    
    /*******PUSH PLUGIN********/
    
    