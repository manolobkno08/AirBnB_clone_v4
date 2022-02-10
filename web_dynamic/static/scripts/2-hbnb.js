const CheckStatus = async () => {
  // Checking status of server in port 5001
  const url = `http://${window.location.hostname}:5001/api/v1/status`;
  await $.get(url, (data) => {
    if (data.status === 'OK') { $('div#api_status').addClass('available'); } else { $('div#api_status').removeClass('available'); }
  });
};

$('document').ready(function () {
  CheckStatus();
  let newList = [];
  $("input[type='checkbox']").click(() => {
    // Catching click event for checkbox
    if ($(this).is(':checked')) {
      newList.push($(this).attr('data-name'));
    } else if (!$(this).is(':checked')) {
      const toRemove = $(this).attr('data-name');
      newList = newList.filter((item) => {
        return item !== toRemove;
      });
    }
    $('.amenities h4').text(newList.join(', '));
  });
});
