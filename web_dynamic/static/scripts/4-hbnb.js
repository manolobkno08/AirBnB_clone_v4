const CheckStatus = async () => {
  // Checking status of server in port 5001
  const url = `http://${window.location.hostname}:5001/api/v1/status`;
  await $.get(url, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
      return;
    }
    $('div#api_status').removeClass('available');
  });
};

const ProcessOutput = (output = '', limit = '') => {
  // Processing output to handle a limit of diplayed chars
  return output.length > limit ? `${output.slice(0, limit)}...` : output;
};

const GetPlaces = async () => {
  // Makes a request to the API to get the places
  const url = `http://${window.location.hostname}:5001/api/v1/places_search`;
  const places = await $.ajax({
    type: 'POST',
    url,
    data: '{}',
    dataType: 'json',
    contentType: 'application/json'
  });
  return places;
};
const DrawPlaces = async () => {
  // Print places in the html tag
  const places = await GetPlaces();
  let ToPrint = '';
  places.map((place, i) => {
    ToPrint += `
          <article>
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
            <div class='description'>
              <p>${place.description}</p>
            </div>
          </article>
        `;
    return 1;
  });
  $('.places').html(ToPrint);
};
DrawPlaces();

const GetFilteredPlaces = async (AmenitiesDictionary) => {
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
};

const DrawFilteredPlaces = async (AmenitiesDictionary) => {
  // Print filtered places in the html tag
  const places = await GetFilteredPlaces(AmenitiesDictionary);
  let ToPrint = '';
  places.map((place, i) => {
    ToPrint += `
          <article>
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
            <div class='description'>
              <p>${place.description}</p>
            </div>
          </article>
        `;
    return 1;
  });
  $('.places').html(ToPrint);
};

$('document').ready(function () {
  // Load function
  CheckStatus();
  const AmenitiesDictionary = {};
  $("input[type='checkbox']").click(function () {
    // Catching click event for checkbox
    if ($(this).is(':checked')) {
      AmenitiesDictionary[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete AmenitiesDictionary[$(this).attr('data-id')];
    }
    $('.amenities h4').text(ProcessOutput((Object.values(AmenitiesDictionary).join(', ')), 30));
  });
  $('button').click(function () {
    DrawFilteredPlaces(AmenitiesDictionary);
  });
});
