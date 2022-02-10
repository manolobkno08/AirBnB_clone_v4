$(function () {
	let newList = [];
	$("input[type='checkbox']").click(function () {
		if ($(this).is(":checked")) {
			newList.push($(this).attr("data-name"));
		}
		else if (!$(this).is(":checked")) {
			let toRemove = $(this).attr("data-name");
			newList = newList.filter(function (item) {
				return item !== toRemove;
			});
		}
		$('.amenities h4').text(newList.join(', '));
		// if (newList.length <= 2) {
		// 	$('.amenities h4').text(newList.join(', '));
		// }
		// else if (newList.length > 2) {
		// 	$('.amenities h4').text(newList.join(', ' + '...'));
		// }
	});
});
