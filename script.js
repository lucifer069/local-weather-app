var api="https://fcc-weather-api.glitch.me/api/current?";
var lat,lon;
var unit="c";
$(document).ready(function(){
	  		$("#cunit").css("color","white");

	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getweather(lat,lon);
    });
  }
   else {
    console.log("Geolocation is not supported by this browser.");
  }
    $("#cunit").on("click",function(){
  	if(unit=="f"){
  		var temp = $("#temp").text();
  		var ctemp = Math.round((temp-32)/(1.8));
  		$("#temp").text(ctemp);
  		unit="c";
  		$("#uniticon").removeClass("wi-fahrenheit");
  		$("#uniticon").addClass("wi-celsius");

  		$("#cunit").css("color","white");
  		$("#funit").css("color","black");
  	}
  });
  $("#funit").on("click",function(){
  	if(unit=="c"){
  		var temp = $("#temp").text();
  		var ftemp = Math.round((temp*1.8)+32);
  		$("#temp").text(ftemp);
  		unit="f";
  		$("#uniticon").removeClass("wi-celsius");
  		$("#uniticon").addClass("wi-fahrenheit");
 
  		$("#cunit").css("color","black");
  		$("#funit").css("color","white");
  	}
  });

});
function getweather(lat,lon){
	var apiurl = api+lat+"&"+lon;
	$.ajax({
		url:apiurl,
		success: function(data){
			
			$("#location").text(data.name+","+data.sys.country);
			$("h1#weather").text(data.weather[0].main);
			$("#temp").text(data.main.temp);
			$(".wi-na").hide();
			$("img").attr("src",data.weather[0].icon);
			if(data.weather[0].icon==null){
				$(".wi-na").show();
			}
		}
	});
}