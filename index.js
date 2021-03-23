
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  var myaddress = new google.maps.LatLng(11.157795895255436, 106.7431834817657);
  var schooladdress = new google.maps.LatLng(10.845854060340471,106.79454802852483);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myaddress,
  });
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);


  //Hiển thị thông tin
  const infor1 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>Doan Le My Linh</b> - 20yrs <br> studentID: 5951071049 <br> Phone: 0866124990 <br> Binh My, Bac Tan Uyen, Binh Duong</div>',
    position: myaddress,
  });
  const infor2 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>University of Transport and Communication</b> <br> 450-451 Le Van Viet, Tang Nhon Phu A Ward, Thu Duc City</div>',
    position: schooladdress,
  });

  const marker = new google.maps.Marker({
    position: myaddress,
    title: "My home",
    map: map,
    icon: "./img/myAvatar.jpg",
  });

  const marker1 = new google.maps.Marker({
    position: schooladdress,
    title: "Đại học GTVT Phân hiệu Tp.HCM",
    map: map,
    icon: "./img/utc2logo.jpg",
  });

  google.maps.event.addListener(marker, "click", function () {
    infor1.open(map, marker);
  });
  google.maps.event.addListener(marker1, "click", function () {
    infor2.open(map, marker1);
  });
}

google.maps.event.addDomListener(window, "load", initMap);
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
