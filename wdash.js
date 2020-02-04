$(document).ready(function(){
        var cityId=0;
        $('#citySearch').on('click', function(){
            $('#display').removeClass('hide'); 
            $('#wdisplay2').removeClass('hide');
            $('.groupparam').removeClass('hide');
            searchCity();
        });
        
        $('#cityInput').keypress(function(e){
            if(e.which == 13){//Enter key pressed
                
                $('#display').removeClass('hide'); 
                $('#wdisplay2').removeClass('hide');
                $('.groupparam').removeClass('hide');
                searchCity();
            }
        });
        
        function searchCity(){
            cityId+=1;
            $('.card').remove();
            var card = '';
            for(var i=1;i<=5;i++){
                card += '<div class="card" style="width: 9rem; margin: 1px;">';
                card +='<div class="card-body">';
                card +='<h5 class="card-title" id="date'+i+'">Date</h5>';
                card +='<h6 class="card-subtitle mb-2 text-muted" id="icon'+i+'">Icon</h6>';
                card +='<h6 class="card-text" id="temp'+i+'">Temperature</h6>';
                card +='<h6 class="card-text" id="humi'+i+'">Humidity</h6>';
                card +='</div>';
                card +='</div>';
            }
            $('#forecast').append(card);
            console.log('here');
            var city = $('#cityInput').val();
            console.log(city);
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=ff0ef95889be9e9acca9e3480360215c";
            $.ajax({
                url: queryURL,
                method: 'GET',
                success: function (response) {
                    console.log(response);
                    console.log(response.name);
                    console.log(city);
                    var test = $('<li class="list-group-item city"></li>').addClass(cityId.toString()).text(city.charAt(0).toUpperCase()+city.substring(1));
                    console.log(test);
                    $(".list-group").append(test);
                    var iconUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
                    console.log(uv);
                    $("h2").text(response.name+" ("+moment.utc().add(response.timezone, 'seconds').format('L')+") ").append("<img src='" + iconUrl  + "'>");
                    var kel = parseFloat(response.main.temp);
                    var temp = (kel - 273.15) * (9/5) + 32;
                    $(".temperature").text('Temperature: '+temp.toFixed(2)+' F');
                    $(".humidity").text('Humidity: '+response.main.humidity+'%');
                    $(".wspeed").text('Wind Speed: '+response.wind.speed+' MPH');
                    var uv = "https://api.openweathermap.org/data/2.5/uvi?appid=ff0ef95889be9e9acca9e3480360215c&lat="+response.coord.lat+"&lon="+response.coord.lon;
                    $.ajax({
                        url: uv,
                        method: 'GET'
                        }).then(function (response1) {
                            $(".uvindex").text('UV Index: '+response1.value); 
                        });
                    var fDays = "https://api.openweathermap.org/data/2.5/forecast?appid=ff0ef95889be9e9acca9e3480360215c&q="+response.name+","+ response.sys.country;
                    $.ajax({
                        url: fDays,
                        method: 'GET'
                        }).then(function (response2) {
                            console.log(response2)
                            for(var i=1;i<=5;i++){
                                $('#date'+i+'').text(response2.list[parseInt(i*7.5)].dt_txt.substring(0, 10));
                                var iconUrl = "https://openweathermap.org/img/w/" + response2.list[parseInt(i*7.5)].weather[0].icon + ".png";
                                $('#icon'+i+'').html('<img src='+iconUrl+'>');
                                var kel = parseFloat(response2.list[parseInt(i*7.5)].main.temp_max);
                                var temp = (kel - 273.15) * (9/5) + 32;
                                $('#temp'+i+'').text('Temp: '+temp.toFixed(2)+' F');
                                $('#humi'+i+'').text('Humidity: '+response2.list[parseInt(i*7.5)].main.humidity+'%');
                            }
                        });
                },
                error: function (jqXHR, exception) {
                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Not connect.\n Verify Network.';
                        } else if (jqXHR.status == 400) {
                            $('#display').addClass('hide');
                        } else if (jqXHR.status == 404) {
                            $('#wdisplay2').addClass('hide');
                            $('.groupparam').addClass('hide');
                            $('h2').text('City not found !');
                            msg = 'Requested page not found. [404]';
                            alert("City not found");
                        } else if (jqXHR.status == 500) {
                            msg = 'Internal Server Error [500].';
                        } else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }
                        $('#post').html(msg);
                }
            });
            $(document).on('click','.'+cityId.toString() ,function() {
                $('#display').removeClass('hide'); 
                $('#wdisplay2').removeClass('hide');
                $('.groupparam').removeClass('hide');
                console.log('here');
                var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=ff0ef95889be9e9acca9e3480360215c";
                $.ajax({
                    url: queryURL,
                    method: 'GET',
                    success: function (response) {
                        console.log(response);
                        console.log(response.name);
                        console.log(city);
                        // var test = $('<li class="list-group-item city"></li>').addClass(cityId.toString()).text(city);
                        // console.log(test);
                        // $(".list-group").append(test);
                        var iconUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
                        console.log(uv);
                        $("h2").text(response.name+" ("+moment.utc().add(response.timezone, 'seconds').format('L')+") ").append("<img src='" + iconUrl  + "'>");
                        var kel = parseFloat(response.main.temp);
                        var temp = (kel - 273.15) * (9/5) + 32;
                        $(".temperature").text('Temperature: '+temp.toFixed(2)+' F');
                        $(".humidity").text('Humidity: '+response.main.humidity+'%');
                        $(".wspeed").text('Wind Speed: '+response.wind.speed+' MPH');
                        var uv = "https://api.openweathermap.org/data/2.5/uvi?appid=ff0ef95889be9e9acca9e3480360215c&lat="+response.coord.lat+"&lon="+response.coord.lon;
                        $.ajax({
                            url: uv,
                            method: 'GET'
                            }).then(function (response1) {
                                $(".uvindex").text('UV Index: '+response1.value); 
                            });
                        var fDays = "https://api.openweathermap.org/data/2.5/forecast?appid=ff0ef95889be9e9acca9e3480360215c&q="+response.name+","+ response.sys.country;
                        $.ajax({
                            url: fDays,
                            method: 'GET'
                            }).then(function (response2) {
                                console.log(response2)
                                for(var i=1;i<=5;i++){
                                    $('#date'+i+'').text(response2.list[parseInt(i*7.5)].dt_txt.substring(0, 10));
                                    var iconUrl = "https://openweathermap.org/img/w/" + response2.list[parseInt(i*7.5)].weather[0].icon + ".png";
                                    $('#icon'+i+'').html('<img src='+iconUrl+'>');
                                    var kel = parseFloat(response2.list[parseInt(i*7.5)].main.temp_max);
                                    var temp = (kel - 273.15) * (9/5) + 32;
                                    $('#temp'+i+'').text('Temp: '+temp.toFixed(2)+' F');
                                    $('#humi'+i+'').text('Humidity: '+response2.list[parseInt(i*7.5)].main.humidity+'%');
                                }
                            });
                    },
                    error: function (jqXHR, exception) {
                            var msg = '';
                            if (jqXHR.status === 0) {
                                msg = 'Not connect.\n Verify Network.';
                            } else if (jqXHR.status == 400) {
                                $('#display').addClass('hide');
                            } else if (jqXHR.status == 404) {
                                $('#wdisplay2').addClass('hide');
                                $('.groupparam').addClass('hide');
                                $('h2').text('City not found !');
                                msg = 'Requested page not found. [404]';
                
                                alert("City not found");
                            } else if (jqXHR.status == 500) {
                                msg = 'Internal Server Error [500].';
                            } else if (exception === 'parsererror') {
                                msg = 'Requested JSON parse failed.';
                            } else if (exception === 'timeout') {
                                msg = 'Time out error.';
                            } else if (exception === 'abort') {
                                msg = 'Ajax request aborted.';
                            } else {
                                msg = 'Uncaught Error.\n' + jqXHR.responseText;
                            }
                            $('#post').html(msg);
                    }
                });
            });
        }
});

