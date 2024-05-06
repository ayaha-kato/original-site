$(function () {
	var headerHeight = $("header").outerHeight();
	var urlHash = location.hash;
	if (urlHash) {
		$("body,html").stop().scrollTop(0);
		setTimeout(function () {
			var target = $(urlHash);
			var position = target.offset().top - headerHeight;
			$("body,html").stop().animate({ scrollTop: position }, 500);
		}, 100);
	}
	$('a[href*="#"]').click(function () {
		const speed = 500;
		const target = $(this.hash === "#" || "" ? "html" : this.hash);
		if (!target.length) return;
		const targetPos = target.offset().top - headerHeight;
		$("html, body").animate({ scrollTop: targetPos }, speed, "swing");
		return false;
	});
});

// ロゴを回転させる
// rotate()
document.querySelector(`.rotate`).animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], {
	duration: 20000,
	easing: "linear",
	iterations: Infinity,
});
