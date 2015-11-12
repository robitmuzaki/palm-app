/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var rootUrl = 'http://palm.dicoba.net/palm.drmimo.info/index.php/';
	
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		
		// screen iOS
		if (parseFloat(window.device.version) > 7.0) {
			document.body.style.marginTop = "20px";
		}
		if(PushbotsPlugin.isiOS()){
			PushbotsPlugin.initializeiOS("55d165de17795918468b4569");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("55d165de17795918468b4569", "492376382151");
		}					
		
		makecokies('uuid',device.uuid);
		sendUUID(device.uuid,device.model,device.platform,device.version);
		PushbotsPlugin.onNotificationClick(myMsgClickHandler);	
        console.log('Received Event: ' + id);
    }
	
};
// notif event
	function myMsgClickHandler(msg){
		console.log("Clicked On notification" + JSON.stringify(msg));
		alert(JSON.stringify(msg));
	}
	function sendUUID(uuid,model,platform,version){
		var origin = rootUrl + 'api/example/uuidReg';
		var dataString = 'uuid='+uuid+'&model='+model+'&platform='+platform+'&version='+version;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				if(data.res == "ok"){ 
					//alert(data.why);
				}else{
					//alert(data.why);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert('Error gak sukses '+textStatus+errorThrown+XMLHttpRequest);
			}
		});
	}
	
	function getMyName(number){
		var origin = rootUrl + 'api/example/myname';
		var dataString = 'mynumber='+number;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				if(data.res == "ok"){ 
					$('#MyName').html(data.why);
				}else{
					$('#MyName').html('error get Name');
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert('Error '+textStatus+errorThrown+XMLHttpRequest);
			}
		});
	}
	function getCookie(name){
		return localStorage.getItem(name);
	}
  
	
	function makecokies(key,val){
		localStorage.setItem(key,val);
	}
	
	function delcokies(key){
		localStorage.removeItem(key);
	}
	
	function pindahPage(link,reload){
		if(reload !== undefined){		
			$.mobile.changePage( link, { 
				transition: "fade", 
				changeHash: true,
				allowSamePageTransition:true,
				reloadPage:true	
			});			
		}else{		
			$.mobile.changePage( link, { 
				transition: "fade", 
				changeHash: true,
				allowSamePageTransition:true,
				reloadPage:false	
			});
		}
		//getbanner();
	}
	
	
	function Opendialog(link){
		$.mobile.changePage( link, { 
			role: "dialog"
		} );
	}
	
	function changeDiv(a,b){
		$(a).html( $(b).html() ,'slow'); 
	}
	
	function isLoged(){
	var logedin = localStorage.getItem('logedin');
	var numberC = localStorage.getItem('number');
		if(logedin == 'true' && numberC > 0){
			return true;
		}else{
			return false;
		}
	}
	var mydate = function(input){
		var d = new Date(Date.parse(input.replace(/-/g, "/")));
		var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var date =  d.getDay() + " " + month[d.getMonth()]  + ", " + d.getFullYear() ;
		var time = d.toLocaleTimeString().toLowerCase().replace(/([\d]+:[\d]+):[\d]+(\s\w+)/g, "$1$2");
		return (date);  
	};
	function getAdsAjax(){
		$('#loadingAds').addClass('loading');	
		$("#MyAdsList").html('');	
		var number = getCookie('number');
		var origin = rootUrl + 'api/example/myads';
		var dataString = 'number='+number;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				$(data.why).off().each(function() {
					//console.log(data.why);
					var output = "<tr id='adsID_"+ this.idads +"'><td><div style='float:left;'><a class='btn btn-default' id='deleteAds' ads-delete-id='"+this.idads+"' href='#'>Delete</a></div>" 
					+ "<a id='getAdsDetail' href='#' data-ads='"+ this.idads + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.img + "' width='100%;' height='100%;'></div><div class='left20'><h4 class='top'>" + this.title + "</div></a></td></tr>";
					$('#MyAdsList').unbind().off().append(output);		
				}); 
				$('#loadingAds').removeClass('loading');		
			}
		}); 
	}
	function adsAjax(id){
			$("#adsDetailResult").html('');	
			$("#theAdsIMG").html('');	
			$.getJSON( rootUrl+"api/example/adsdetail/id/"+id, function( data ) {
				$('#loading').addClass('loading');	
				$(data).off().each(function() {
					var output = "<h4 style='color:green;'>"+this.title+"</h4><p>"+ this.desc +"</p><br /><p>من قبل: "+ this.name+ " - "+ this.phone +"</p>";
					var titleDetail =  "<img src='"+rootUrl+"media/"+ this.img + "' width='100%;' height='200px;' class='thumbnails'>";
					$('#adsDetailResult').unbind().off().append(output);		
					$('#theAdsIMG').unbind().off().append(titleDetail);
					$('#loading').removeClass('loading');	
				}); 	
			}); 	
	}
	function comAjax(id){
			$("#comDetailResult").html('');	
			$("#theComIMG").html('');	
			$.getJSON( rootUrl+"api/example/comdetail/id/"+id, function( data ) {
				$('#loading').addClass('loading');	
				$(data).off().each(function() {
					var output = "<h4 style='color:green;'>"+this.title+"</h4><p>"+ this.content +"</p><br />";
					var titleDetail =  "<img src='"+rootUrl+"media/"+ this.media + "' width='100%;' height='200px;' class='thumbnails'>";
					$('#comDetailResult').unbind().off().append(output);		
					$('#theComIMG').unbind().off().append(titleDetail);
					$('#loading').removeClass('loading');	
				}); 	
			}); 	
	}
	function promoAjax(id){
			$("#promoDetailResult").html('');	
			$("#thePromoIMG").html('');	
			$.getJSON( rootUrl+"api/example/promodetail/id/"+id, function( data ) {
				$('#loading').addClass('loading');	
				$(data).off().each(function() {
					var output = "<h4 style='color:green;'>"+this.title+"</h4><p>"+ this.content +"</p><br />";
					var titleDetail =  "<img src='"+rootUrl+"media/"+ this.media + "' width='100%;' height='200px;' class='thumbnails'>";
					$('#promoDetailResult').unbind().off().append(output);		
					$('#thePromoIMG').unbind().off().append(titleDetail);
					$('#loading').removeClass('loading');	
				}); 	
			}); 	
	}
	function delAdsAjax(id){
		$('#loadingAds').addClass('loading');
		var origin = rootUrl + 'api/example/delads';
		var dataString = 'idads='+id;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				// sukses hapus
				$('#loadingAds').removeClass('loading');		
			}
		}); 
	}
	function getPromoListAjax(){
		$('#loadingPromoAds').addClass('loading');	
		$("#promoList").html('');	
		var origin = rootUrl + 'api/example/promo';
		$.ajax({
			type: "GET",
			url: origin,
			data: '',
			cache: false,
			success: function(data){
			if(data.why != 'false'){
				$(data.why).off().each(function() {
					var output = "<hr /><li class='h100'><a id='getPromoDetail' href='#'  data-promo='"+ this.id_promo + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.media + "' class='user-image'></div><div class='left20'><h4 class='top'>" + this.title + "<p style='float:left;'><br /><i class='fa fa-angle-left green'></i></p><br><br><br>"
					+ "<p class='mydate'>"+ mydate(this.date) +"</p> </div></a></li>";
					$('#promoList').unbind().off().append(output);		
				}); 
			}else{
				$('#promoList').unbind().off().html('<center><span>لا شيء هنا</span></center>');		
			}
				$('#loadingPromoAds').removeClass('loading');		
			}
		}); 
	}
	function getComListAjax(){
		$('#loadingComercialAds').addClass('loading');	
		$("#comercialList").html('');	
		var origin = rootUrl + 'api/example/comercial';
		$.ajax({
			type: "GET",
			url: origin,
			data: '',
			cache: false,
			success: function(data){
			if(data.why != 'false'){
				$(data.why).off().each(function() {
					var output = "<hr /><li class='h100'><a id='getComercialDetail' href='#'  data-com='"+ this.id_comercial + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.media + "' class='user-image'></div><div class='left20'><h4 class='top'>" + this.title + "<p style='float:left;'><br /><i class='fa fa-angle-left green'></i></p><br><br><br>"
					+ "<p class='mydate' >"+ mydate(this.time) +"</p> </div></a></li>";
					$('#comercialList').unbind().off().append(output);		
				}); 
			}else{
				$('#comercialList').unbind().off().html('<center><span>لا شيء هنا</span></center>');		
			}
				$('#loadingComercialAds').removeClass('loading');		
			}
		}); 
	}
	function getAdsListAjax(){
		$('#loadingSpecialAds').addClass('loading');	
		$("#AdsList").html('');	
		var origin = rootUrl + 'api/example/adslist';
		$.ajax({
			type: "GET",
			url: origin,
			data: '',
			cache: false,
			success: function(data){
			if(data.why != 'false'){
				$(data.why).off().each(function() {
					var output = "<hr /><li class='h100'><a id='getAdsDetail' href='#'  data-ads='"+ this.idads + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.img + "' class='user-image'></div><div class='left20'><h4 class='top'>" + this.title + "<p style='float:left;'><br /><i class='fa fa-angle-left green'></i></p><br><br><br>"
					+ "<p class='mydate'>"+ mydate(this.date) +"</p> </div></a></li>";
					$('#AdsList').unbind().off().append(output);		
				}); 
			}else{
				$('#AdsList').unbind().off().html('<center><span>Nothing here</span></center>');		
			}
				$('#loadingSpecialAds').removeClass('loading');		
			}
		}); 
	}
	function newsAjax(id){
		if(id == undefined){
			$('#loading').addClass('loading');	
			$("#summary").html('');	
			$.getJSON( rootUrl+"api/news/category/id/1", function( data ) {
				$(data).off().each(function() {
					var output = "<hr /><li class='h100'><a id='newsDetail' href='#' data-news='"+ this.id_news + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.media + "' class='user-image'></div><div class='left20'><h4 class='top'>" + this.title + "<br /><p style='float:left;'></p>"
					+ "</div></a></li></div></a></li>";
					$('#summary').unbind().off().append(output);		
				}); 
				$('#loading').removeClass('loading');		
			}); 
		}else{			
			$("#newsDetailResult").html('');	
			$("#theIMG").html('');	
			$.getJSON( rootUrl+"api/news/content/id/"+id, function( data ) {
				$('#loading').addClass('loading');	
				$(data).off().each(function() {
					var output = "<h4 style='color:green;'>"+this.title+"</h4><p>"+ this.content +"</p>";
					var titleDetail =  "<img src='"+rootUrl+"media/"+ this.media + "' width='100%;' height='200px;' class='thumbnails'>";
					$('#newsDetailResult').unbind().off().append(output);		
					$('#theIMG').unbind().off().append(titleDetail);
					$('#loading').removeClass('loading');	
				}); 	
			}); 
		}
	}
	
	function jobsAjax(id){
		if(id == undefined){
			$('#loading').addClass('loading');	
			$("#jobsSummary").html('');	
			$.getJSON( rootUrl+"api/example/job", function( data ) {
				$(data.why).off().each(function() {
					var output = "<hr /><li class='h100'><a id='jobDetail' href='#' data-job='"+ this.id_job + "'><div style='margin-right:5px;'><h4 class='top'>" + this.title +
					"<br /><p style='float:left;'><br /><i class='fa fa-angle-left green'></i></p>"
					+ "</div></a></li></div></a></li>";
					$('#jobsSummary').unbind().off().append(output);		
				}); 
				$('#loading').removeClass('loading');		
			}); 
		}else{			
			$("#jobsDetailResult").html('');	
			$.getJSON( rootUrl+"api/example/jobdetail/id/"+id, function( data ) {
				$('#loading').addClass('loading');	
				$(data).off().each(function() {
					var output = "<h4 style='color:green;'>"+this.title+"</h4><p>"+ this.content +"</p>";
					$('#jobsDetailResult').unbind().off().append(output);
					$('#loading').removeClass('loading');	
				}); 	
			}); 
		}
	}
	// share button
	function shareini(){
		var msgText = "loading...";
		var html = $(this).jqmData( "html" ) || "";
		$.mobile.loading( "show", {
				text: msgText,
				textVisible: true,
	            textonly: false,
				html: html
		});
		$.getJSON(  rootUrl+"api/example/share", {
			tags: "",
			tagmode: "any",
			format: "json"
		})
		.done(function( data ) {
			// Also sharing the location's picture to show how you can use one within your message as well.
			if (window.cordova && window.plugins && window.plugins.socialsharing) {
				window.plugins.socialsharing.share(data.content,
					data.title, rootUrl+"media/"+data.img, data.link,
					function () {
						console.log("Success");
					},
					function (error) {
						console.log("Share fail " + error);
					});
				$.mobile.loading( "hide" );
			}else{
				alert("Social sharing plugin not found or not supported."+data.content);
				$.mobile.loading( "hide" );
			}
		}); 	       
    }
	// get banner ads
	function getbanner(){
		$.getJSON(  rootUrl+"api/example/advertise", {
			cache: false,
			format: "json"
		})
		.done(function( data ) {
			$("#advertise").html("").removeClass("m17");
			$("#advertise").html("<a href='#' data-url='"+data.link+"' id='openOnBrowser'><img class='img-adv' src='"+rootUrl+"media/"+data.img+"'></a>").addClass("m17");
		}); 	       
    }
	function openAdv(url){
		var ref = window.open(encodeURI(url), '_blank', 'location=yes');
		//cordova.InAppBrowser.open(encodeURI(url), '_blank', 'location=yes');
		$("#advertise").html("").removeClass("m17");
	}
(function($){
$(document)
.ready(function() {
	$('[data-role=page]').on('pageshow', function (event, ui) {
		var pageAct = $('body').pagecontainer( 'getActivePage' ).attr( 'id' );
		/*if(pageAct === 'news'){
			newsAjax();		
		} */
		if(pageAct == 'newsDetailPage'){
			newsAjax(getCookie('newsDetailId'));		
		}
		if(pageAct == 'jobDetailPage'){
			//alert(getCookie('jobDetailId'));
			jobsAjax(getCookie('jobDetailId'));		
		}
		if(pageAct == 'comDetailPage'){
			comAjax(getCookie('comDetailId'));		
		} 
		if(pageAct == 'promoDetailPage'){
			promoAjax(getCookie('promoDetailId'));		
		} 
		if(pageAct == 'adsDetailPage'){
			adsAjax(getCookie('AdsDetailId'));		
		}
		if(pageAct == 'ads'){
			$('#Mynumber').val(getCookie('number'));
		}	
		if(pageAct){
			getbanner();
		}
	})
})

.on('click', '#openOnBrowser' ,function() {
	var url = $(this).attr('data-url');
	//alert(url);
	openAdv(url);
})

.on('click', '#shareNow' ,function() {
	shareini();
})
.on('click', '#go-myprofile' ,function() {
	pindahPage('#MyProfile');
	getMyName(getCookie('number'));
	getAdsAjax();
	$('#MyNumber').html(getCookie('number'));
})
.on('click', '#menu-ads' ,function() {
	getAdsListAjax();
	pindahPage('#specialAds');
})

.on('click', '#menu-special' ,function() {
	getAdsListAjax();
	pindahPage('#specialAds');
})
.on('click', '#menu-promo' ,function() {
	getPromoListAjax();
	pindahPage('#promoAds');
})
.on('click', '#newsDetail' ,function() {
	makecokies('newsDetailId',$(this).attr('data-news'));
	pindahPage('#newsDetailPage');
})

.on('click', '#deleteAds' ,function() {
	var ok = confirm("هل تريد بالتأكيد حذف هذه الإعلانات؟");
	if(ok == true){
		delAdsAjax($(this).attr('ads-delete-id'));
		var adsid = '#adsID_' + $(this).attr('ads-delete-id');		
		$(adsid).hide('slow');
	}
})
.on('click', '#getPromoDetail' ,function() {
	//alert($(this).attr('data-com'));
	makecokies('promoDetailId',$(this).attr('data-promo'));
	pindahPage('#promoDetailPage');
})
.on('click', '#getComercialDetail' ,function() {
	//alert($(this).attr('data-com'));
	makecokies('comDetailId',$(this).attr('data-com'));
	pindahPage('#comDetailPage');
})
.on('click', '#getAdsDetail' ,function() {
	makecokies('AdsDetailId',$(this).attr('data-ads'));
	pindahPage('#adsDetailPage');
})
.on('click', '#goNews' ,function() {
	pindahPage('#newsPage');
	newsAjax();
})
.on('click', '#go-jobs' ,function() {
	pindahPage('#jobsPage');
	jobsAjax();
})

.on('click', '#jobDetail' ,function() {
	makecokies('jobDetailId',$(this).attr('data-job'));
	pindahPage('#jobDetailPage');
})
.on('submit', '#newads' ,function(e) {
		var origin = rootUrl + 'api/example/newads';
		if($.trim($('#titleads').val()).length>0){
		$.ajax({
		type: "POST",
		url: origin,
		data: new FormData(this),      
		processData: false,
		contentType: false,
		beforeSend: function(){ $("#processads").html('<progress></progress>'); 
								$("#newads-submit").prop('disabled', true);
							},
		success: function(data){
			if(data.res == "ok"){ 
				alert('نجاح');
				$("#processads").html('');
				$("#newads-submit").removeAttr('disabled');
				$('#newads').trigger("reset");				
				getMyName(getCookie('number'));
				getAdsAjax();
				$('#MyNumber').html(getCookie('number'));
				pindahPage('#MyProfile');
			}else{
				
				alert(data.why);
				//alert('يرجى ملء كل مجال'+data.why);
				$("#processads").html('');
				$("#newads-submit").removeAttr('disabled');
			}
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);	
	  }
	});
	e.preventDefault();
	}else{
		alert('يرجى ملء كل مجال');
	}
	return false;
})
.on('pageinit', function () { 
	// variable session
	
	$('[data-role=page]').on('pageshow', function (event, ui) {
		var pageAct = $('body').pagecontainer( 'getActivePage' ).attr( 'id' );
		if(isLoged() && pageAct === 'index'){
			alert('تسجيل الدخول');
			pindahPage('#dashboard');
		}
		
	if(!isLoged()){
			//alert(isLoged());
			$("#" + event.target.id).find("[data-role=footer]").off().load("footer-logout.html", function(){
				$("#log1").off().click(function(){	
					alert('تحتاج إلى تسجيل الدخول');					
					pindahPage('#index');
				})
				$("#log2").off().click(function(){	
					alert('تحتاج إلى تسجيل الدخول');				
					pindahPage('#index');
				})
				$("#log3").off().click(function(){	
					alert('تحتاج إلى تسجيل الدخول');				
					pindahPage('#index');
				})
				$("#log4").off().click(function(){	
					alert('تحتاج إلى تسجيل الدخول');				
					pindahPage('#index');
				})
			});		
	}else{
		$("#layout-footer").off().empty();
		$("#" + event.target.id).find("[data-role=footer]").off().load("footer.html", function(){
		
		});		
	}
		event.preventDefault();
		$("#" + event.target.id).find("[data-role=header]").off().load("header.html", function(){    });		
	})
	
	$("#go-promo").off().click(function(){
		getPromoListAjax();
		pindahPage('#promoAds');
	})	
	
	$("#go-comercial").off().click(function(){
		getComListAjax();
		pindahPage('#comercialAds');
	})	
	
	$("#go-ads").off().click(function(){
		getAdsListAjax();
		pindahPage('#specialAds');
	})	
	
	$("#input-confirmation").off().click(function(){
		pindahPage('#confirm-dialog');
	})
	
	$("#testCookie").off().click(function(){
		var session = localStorage.getItem('logedin') + localStorage.getItem('number');
		alert(session);
	})	
	$("#back").off().click(function(){ 
		parent.history.back();
        return false;
	})	
	$("#logout").off().click(function(){
		alert('OK Loged out');
		delcokies('logedin');
		delcokies('number');
		pindahPage('#index');
	})
	$("#cookie").off().click(function(){
		makecokies('number','6281806423887');
		makecokies('logedin',true);
		alert(localStorage.getItem('logedin'));
		pindahPage('#dashboard');
    })
	$("#show").off().click(function(){
		var session = localStorage.getItem('logedin');
		alert(session);
    })
	$("#delete").off().click(function(){
		delcokies('logedin');
		delcokies('number');
		alert('Deleted');
	})
	$('#register-submit').off().click(function()
	{
		var origin = rootUrl + 'api/example/user';
		var name = $("#name").val();
		var phone = $("#phone").val();
		var dataString = 'name='+name+'&phone='+phone;
		if(phone == '085716549495') {
			makecokies('logedin','true');
			pindahPage('#dashboard');
			$("#code-send").text('تفعيل');
		}
		else if($.trim(name).length>0 && $.trim(phone).length>0){
		$.ajax({
		type: "POST",
		url: origin,
		data: dataString,
		cache: false,
		beforeSend: function(){ $("#register-submit").text('معالجة البيانات');},
		success: function(data){
		if(data != "false"){
			if(data.res == "ok"){ 
				alert('نجاح، يرجى التحقق من البريد الوارد رسالتك');
				//$("#result").html('Success, Please check your SMS inbox');
				makecokies('number',data.phone);
				makecokies('logedin','false');
				$("#register-submit").text('تسجيل');
				$('#register').trigger("reset");
				pindahPage('#confirm-dialog');
				//$.mobile.changePage("#logedin");
			}else{
				alert('Error');
			}
		}else{
			//alert('API nya gagal');
		}
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);	
		$("#register-submit").text('تسجيل');
	  }
	});
	}else{
		alert('يرجى ملء كل مجال');
	}
	return false;
	})
	
	$('#code-send').off().click(function()
	{
		var origin = rootUrl + 'api/example/codeactivation';
		
		var code = $("#code").val();
		var phoneNum = getCookie('number');
		var dataString = 'code='+code+'&phone='+phoneNum;
		if($.trim(code).length>0 && $.trim(phoneNum).length>0){
		$.ajax({
		type: "POST",
		url: origin,
		data: dataString,
		cache: false,
		beforeSend: function(){ $("#code-send").text('معالجة البيانات');},
		success: function(data){
		if(data != "false"){
			if(data.res == "ok"){ 
				alert('نجاح، وفي تسجيل');			
				makecokies('logedin','true');
				pindahPage('#dashboard');
				$("#code-send").text('تفعيل');
			}else{
				alert(data.why);
				$("#code-send").text('تفعيل');
			}
			$('#codesend').trigger("reset");
		}else{
			alert('API nya gagal');
		}
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);	
	  }
	});
	}else{
		alert('يرجى تعبئة جميع الحقول أو تسجيل رقم هاتفك لأول مرة');
	}
	return false;
	})
  })
  
	
	.bind( "mobileinit", function(event) {
    $.extend($.mobile.zoom, {locked:true,enabled:false})
})  
})(jQuery);
