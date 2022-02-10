const CheckStatus = async () => {
  // Checking status of server in port 5001
  const url = `http://${window.location.hostname}:5001/api/v1/status`;
  await $.get(url, (data) => {
    if (data.status === 'OK') { $('div#api_status').addClass('available'); } else { $('div#api_status').removeClass('available'); }
  });
};
const ProcessOutput = (output = '', limit = '') => {
  // Processing output to handle a limit of diplayd chars
  return output.length > limit ? `${output.slice(0, limit)}...` : output;
};
$('document').ready(function () {
  CheckStatus();
  let newList = [];
  $("input[type='checkbox']").click(function () {
    console.log($(this).attr('data-name'));
    // Catching click event for checkbox
    if ($(this).is(':checked')) {
      newList.push($(this).attr('data-name'));
    } else if (!$(this).is(':checked')) {
      const toRemove = $(this).attr('data-name');
      newList = newList.filter((item) => {
        return item !== toRemove;
      });
    }
    $('.amenities h4').text(ProcessOutput((newList.join(', ')), 30));
  });
});
