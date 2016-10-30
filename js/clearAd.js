function $(e) {
    return document.querySelectorAll(e);
}

var clearAd = {
    ad: [
        ".content__secondary-column",
        ".top-banner-ad-container",
        "#header",
        "footer",
        ".content-footer",
        ".content__labels content__labels--not-immersive",
        ".content__meta-container",
        ".element-rich-link",
        ".content__labels",
        ".site-message",
        ".submeta",
        ".rich-link__container",
        "aside"
    ],
    clear: function () {
        for (var n = 0; n < this.ad.length; n++) {
            var arr = $(this.ad[n]);
            for (var i = 0; i < arr.length; i++) {
                arr[i].style.display = "none";
            }
        }
    }
}

clearAd.clear();

