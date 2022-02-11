
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
$('document').ready(function () {
  CheckStatus();
  let newList = [];
  $("input[type='checkbox']").click(function () {
    // Catching click event for checkbox
    if ($(this).is(':checked')) {
      newList.push($(this).attr('data-name'));
    } else {
      const toRemove = $(this).attr('data-name');
      newList = newList.filter((item) => {
        return item !== toRemove;
      });
    }
    $('.amenities h4').text(ProcessOutput((newList.join(', ')), 30));
  });
});


const GetPlaces = async () => {
  // Makes a request to the API to get the places
  const url = `http://${window.location.hostname}:5001/api/v1/places_search`;
  return places = await $.ajax({
    type: 'POST',
    url,
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
  });
}
const DrawPlaces = async () => {
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
  });
  $('.places').html(ToPrint);
}
DrawPlaces();
