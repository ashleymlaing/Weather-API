$(document).ready(function(){
  var zipcode="02124";
  var area = "Dorchester,MA";
  var apiKey = "d94cfd94e1f8d2541f8d9c2da21d5516";
  var corsProxy = "https://cors-anywhere.herokuapp.com/";
  var apiURL = corsProxy + "api.openweathermap.org/data/2.5/weather?zip="+zipcode+"&apikey=" + apiKey;
  var apiUrl = corsProxy + "https://api.apixu.com/v1/current.json?key=f8e5cd26339840cc94621237170310&q="+ area;
  $.ajax({
    url: apiURL,
    dataType: "json",
    contentType: "application/json",
     success: function( response ){
       console.log( response ); // server response
       var kalTemp = (response.main.temp).toFixed(1);
       var fahTemp = ((9/5)*(kalTemp-273)+32).toFixed(1);
       var celTemp = (kalTemp - 273).toFixed(1);
       $('.degree').text(fahTemp+ "\xB0F");
       $(".kal").text(kalTemp+ "\xB0K");
       $(".cel").text(celTemp+ "\xB0C");

       $.ajax({
         url: apiUrl,
          success: function( response ){
            console.log( response ); // server response

            $("p").text(response.current.condition.text);
            $('img').attr('src',"https:"+response.current.condition.icon);
            $('h5').text("Last updated:" + response.current.last_updated);

            $.ajax({
              url: corsProxy + "https://api.apixu.com/v1/forecast.json?key=f8e5cd26339840cc94621237170310&q="+area,
              success: function( response ){
                console.log( response );

                $('h4').text(response.location.localtime);

              },
              error: function(r){
                console.log(r); //server response
               }

            });

          },
          error: function(r){
            console.log(r); //server response
           }
        });
     },
     error: function(r){
       console.log(r); //server response
      }
    });
});
