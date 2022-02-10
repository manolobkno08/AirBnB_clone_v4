$(function () {
	let newList = [];
	$("input[type='checkbox']").on('change', function () {
		if ($(this).is(":checked")) {
			newList.push($(this).attr("data-name"));
		}
		$('.amenities h4').text(newList.join(', '));
	});
});
