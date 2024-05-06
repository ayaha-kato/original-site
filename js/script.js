$(function () {
	/*============================
  	ハンバーガー
  ============================*/
	//トグルメニュー
	$(".hd__hamburger").click(function () {
		$(".g-nav__sp").toggleClass("active");
		$(".g-nav__bg").toggleClass("active");
		$(".hd__gnav--sp").toggleClass("active");
		$(this).toggleClass("active");
		$("html").toggleClass("active");

		l; //モーダルを開いた時のスクロール位置を保持
		var scrollPosition;
		//iOS（iPadOSを含む）かどうかのUA判定
		var ua = window.navigator.userAgent.toLowerCase();
		var isiOS = ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || (ua.indexOf("macintosh") > -1 && "ontouchend" in document);

		//bodyのスクロール固定
		function bodyFixedOn() {
			if (isiOS) {
				// iOSの場合
				scrollPosition = $(window).scrollTop();
				$("html.active").css("position", "fixed");
				$("html.active").css("top", "-" + scrollPosition + "px");
			} else {
				// それ以外
				$("html.active").css("overflow", "hidden");
			}
		}

		//bodyのスクロール固定を解除
		function bodyFixedOff() {
			if (isiOS) {
				// iOSの場合
				$("html.active").css("position", "");
				$("html.active").css("top", "");
				$(window).scrollTop(scrollPosition);
			} else {
				// それ以外
				$("html.active").css("overflow", "");
			}
		}
		bodyFixedOn();
		bodyFixedOff();
	});

	/*============================
   	スクロールで出現
   ============================*/
	$(function () {
		var imgHeight = $(".fv").outerHeight(); //画像の高さを取得。これがイベント発火位置になる。
		var sideBtn = $(".side__btn"); //ヘッダーコンテンツ

		$(window).on("load scroll", function () {
			if ($(window).scrollTop() < imgHeight - 500) {
				//メインビジュアル内にいるので、クラスを外す。
				sideBtn.removeClass("active");
			} else {
				//メインビジュアルより下までスクロールしたので、クラスを付けて色を変える
				sideBtn.addClass("active");
			}
		});
	});

	/*============================
  	slick
  ============================*/
	var $slide = $(".slick01")
		.slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			speed: 2000,
			autoplaySpeed: 4000,
			autoplay: true,
			pauseOnFocus: false,
			pauseOnHover: false,
			pauseOnDotsHover: false,
		})
		.on({
			beforeChange: function (event, slick, currentSlide, nextSlide) {
				$(".slick-slide", this).eq(currentSlide).addClass("preve-slide");
				$(".slick-slide", this).eq(nextSlide).addClass("slide-animation");
			},
			afterChange: function () {
				$(".preve-slide", this).removeClass("preve-slide slide-animation");
			},
		});
	$slide.find(".slick-slide").eq(0).addClass("slide-animation");

	//slick02
	$(".slick02").slick({
		//slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		//speed: 10000,
		cssEase: "linear",
		infinite: true,
		pauseOnFocus: true, //フォーカスが合っても止めない
		draggable: true,
		pauseOnHover: false, //hoverしても止めない
		centerMode: true,
		// centerPadding:"20%", //一枚目を中心に表示させる
		initialSlide: 1, //最初に表示させる要素の番号を指定
		variableWidth: true, //スライドの要素の幅をcssで設定できるようにする
		useTransform: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 767, //ブレイクポイントを指定
				settings: {
					slidesToShow: 1,
					centerPadding: "10%",
					variableWidth: false,
				},
			},
		],
	});

	/*============================
  	スクロールアニメ
  ============================*/

	function stretchAnime() {
		$(".stretch_border").each(function () {
			var elemPos = $(this).offset().top + 300; //要素より200px下の
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();

			if (scroll >= elemPos - windowHeight) {
				$(this).addClass("active"); //画面内に入ったら .active を追加
			}
		});
	}
	//画像をスクロールで発動
	$(window).scroll(function () {
		stretchAnime();
	});

	//スクロールでヘッターパーツの色を変える
	// $(function(){
	//     var imgHeight = $('.fv').outerHeight(); //画像の高さを取得。これがイベント発火位置になる。
	//     var header = $('.hd__menu'); //ヘッダーコンテンツ

	//     $(window).on('load scroll', function(){
	//        if ($(window).scrollTop() < imgHeight) {
	//          //メインビジュアル内にいるので、クラスを外す。
	//          header.removeClass('headerColor-default');
	//        }else {
	//          //メインビジュアルより下までスクロールしたので、クラスを付けて色を変える
	//          header.addClass('headerColor-default');
	//        }
	//     });
	//   });

	//ハンバーガークリック時に色を白に
	//   $(".hd__hamburger").click(function(){
	//     if ($(".hd__humburger").hasClass('headerColor-default')){
	//       $(".hd__menu").removeClass("headerColor-default");
	//     }
	//     $(".hd__menu").toggleClass("headerColor-default");
	// });

	/*============================
  	ページ内リンク
  ============================*/

	$('.page-link a[href*="#"]').click(function () {
		//全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
		var elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
		var headerHight = $(elmHash).offset().top - 60; //idの上部の距離からHeaderの高さを引いた値を取得
		$("body,html").animate(
			{
				scrollTop: headerHight,
			},
			500
		); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
		return false;
	});

	/*============================
  	page-top
  ============================*/
	//page-top 途中から出現
	function PageTopAnime() {
		var scroll = $(window).scrollTop();
		if (scroll >= 200) {
			$("#page-top").addClass("active");
		} else {
			$("#page-top").removeClass("active");
		}
	}
	$(window).scroll(function () {
		PageTopAnime();
	});

	$(".scroll-top a").click(function () {
		var elmHash = $(this).attr("href");
		if (elmHash == "#area-2") {
			var pos = $(elmHash).offset().top;
			$("body,html").animate({ scrollTop: pos }, pos);
		} else {
			$("body,html").animate({ scrollTop: 0 }, 500);
		}
		return false;
	});

	$(window).scroll(function () {
		PageTopCheck();
	});

	$(window).on("load", function () {
		PageTopCheck();
	});

	/*============================
  	伸びる背景
  ============================*/

	// 動きのきっかけの起点となるアニメーションの名前を定義
	function BgFadeAnime() {
		// 背景色が伸びて出現（右から左）
		$(".bgLRextendTrigger").each(function () {
			//bgRLextendTriggerというクラス名が
			var elemPos = $(this).offset().top - 50; //要素より、50px上の
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll >= elemPos - windowHeight) {
				$(this).addClass("bgLRextend"); // 画面内に入ったらbgRLextendというクラス名を追記
			}
		});
		// 文字列を囲う子要素
		$(".bgappearTrigger").each(function () {
			//bgappearTriggerというクラス名が
			var elemPos = $(this).offset().top - 200; //要素より、50px上の
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll >= elemPos - windowHeight) {
				$(this).addClass("bgappear"); // 画面内に入ったらbgappearというクラス名を追記
			}
		});
	}
	/*============================
  	モーダル
  ============================*/
	// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function () {
		BgFadeAnime(); /* アニメーション用の関数を呼ぶ*/
	}); // ここまで画面をスクロールをしたら動かしたい場合の記述

	// 画面が読み込まれたらすぐに動かしたい場合の記述
	$(window).on("load", function () {
		BgFadeAnime();
	});

	//3. 画像のモーダル
	$(".gallery").modaal({
		type: "image",
		overlay_close: true, //モーダル背景クリック時に閉じるか
		before_open: function () {
			// モーダルが開く前に行う動作
			$("html").css("overflow-y", "hidden"); /*縦スクロールバーを出さない*/
		},
		after_close: function () {
			// モーダルが閉じた後に行う動作
			$("html").css("overflow-y", "scroll"); /*縦スクロールバーを出す*/
		},
	});
});
