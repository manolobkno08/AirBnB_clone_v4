window.onload = function () {
  // Onload main function
  CheckStatus();
  const AmenitiesDictionary = {};
  DrawFilteredPlaces(AmenitiesDictionary);
  HandleSelectedAmenities(AmenitiesDictionary);
  HandleFilterPlacesByAmenities(AmenitiesDictionary);
};

async function CheckStatus() {
  // Checking status of server in port 5001
  const url = `http://${window.location.hostname}:5001/api/v1/status`;
  await $.get(url, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
      return;
    }
    $('div#api_status').removeClass('available');
  });
}
function ProcessOutput(output = '', limit = '') {
  // Processing output to handle a limit of diplayed chars
  return output.length > limit ? `${output.slice(0, limit)}...` : output;
}
async function HandleSelectedAmenities(AmenitiesDictionary = '') {
  $("input[type='checkbox']").click(function () {
    // Catching click event for checkbox
    if ($(this).is(':checked')) {
      AmenitiesDictionary[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete AmenitiesDictionary[$(this).attr('data-id')];
    }
    $('.amenities h4').text(ProcessOutput((Object.values(AmenitiesDictionary).join(', ')), 30));
  });
}
async function GetFilteredPlaces(AmenitiesDictionary = '') {
  // Gets the filtered places
  const url = `http://${window.location.hostname}:5001/api/v1/places_search`;
  const places = await $.ajax({
    type: 'POST',
    url,
    data: JSON.stringify({ amenities: Object.keys(AmenitiesDictionary) }),
    contentType: 'application/json',
    dataType: 'json'
  });
  return places;
}
async function HandleFilterPlacesByAmenities(AmenitiesDictionary = '') {
  $('button').click(function () {
    DrawFilteredPlaces(AmenitiesDictionary);
  });
}
async function DrawFilteredPlaces(AmenitiesDictionary = '') {
  // Print filtered places in the html tag
  const places = await GetFilteredPlaces(AmenitiesDictionary);
  let ToPrintUser = '';
  $('.places').html('');
  places.map(async (place, i) => {
    const user = await GetUser(place.user_id);
    const ToPrint = `
          <article key = ${i}>
            <h2>${place.name}</h2>
            <div class = 'price_by_night'>
              <p>$${place.price_by_night}</p>
            </div>
            <div class='information'>
              <div class='max_guest'>
                <div class='guest_image'>
                </div>
                <p>${place.max_guest}</p>
              </div>
              <div class='number_rooms'>
                <div class='bed_image'></div>
                <p>${place.number_rooms}</p>
              </div>
              <div class='number_bathrooms'>
                <div class='bath_image'></div>
                <p>${place.number_bathrooms}</p>
              </div>
            </div>
            <b>Owner:</b>&nbsp;${(user).first_name} ${(user).last_name}
            <div class='description'>
              <p>${place.description}</p>
            </div>
          </article>
        `;
    $('.places').append(ToPrint);
    return 1;
  });
}
async function GetUser(UserId) {
  // Getting one user by id
  const url = `http://${window.location.hostname}:5001/api/v1/users/${UserId}`;
  const response = await fetch(url);
  const user = await response.json();
  return user;
}

