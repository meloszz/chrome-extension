function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

var page = {
    pageNum: 1,
    navigationHeight: 30,
    screenHeight: window.innerHeight-30,
    screenWidth: window.innerWidth,
    goto: function (num) {
        window.scrollTo(0, (num - 1) * this.screenHeight);
        this.pageNum = num;
        if(document.querySelector(".selected")){
            document.querySelector(".selected").className = "ng__button";
        }
        document.querySelectorAll(".ng__button")[num-1].className = "ng__button selected";

    },
    initNavigation: function () {
        var navigation = document.createElement("div");
        navigation.className = "ng";
        this.sumPage = Math.ceil(document.body.scrollHeight / window.innerHeight);
        if (this.sumPage <= 10) {
            for (var n = 1; n <= this.sumPage; n++) {
                navigation.innerHTML += "<span class = 'ng__button'>" + n + "</span>";
            }
        }
        document.querySelector("body").appendChild(navigation);
        document.querySelector("body").addEventListener("click", function (e) {
            if (e.target.className == "ng__button") {
                page.goto(parseInt(e.target.innerHTML));
            }
        });
    }
}

var adapter = {
    img: [],
    adaptImg: function () {
        for (var n = 0; n < this.img.length; n++) {
            var height = this.img[n].height;
            var width = this.img[n].width;
            this.img[n].element.style.height = this.img[n].height + "px";
            this.img[n].element.style.width = this.img[n].width + "px";
            this.img[n].wrapper.style.height = this.img[n].height + "px";
            this.img[n].wrapper.style.width = this.img[n].width + "px";
            if (height > page.screenHeight) {
                var ratio = height / width;
                this.img[n].element.style.height = page.screenHeight + "px";
                this.img[n].element.style.width = page.screenHeight / ratio + "px";
                this.img[n].wrapper.style.height = page.screenHeight + "px";
                this.img[n].wrapper.style.width = page.screenHeight / ratio + "px";
                this.img[n].wrapper.style.paddingBottom = 0;
            }
            if (width > page.screenWidth) {
                var ratio = height / width;
                this.img[n].element.style.width = page.screenWidth + "px";
                this.img[n].element.style.height = page.screenWidth * ratio + "px";
                this.img[n].wrapper.style.width = page.screenWidth + "px";
                this.img[n].wrapper.style.height = page.screenWidth * ratio + "px";
                this.img[n].wrapper.style.paddingBottom = 0;
            }
        }
    },

    split: function () {
        for (var n = 0; n < this.img.length; n++) {
            var i = Math.ceil(getElementTop(this.img[n].element) / innerHeight);
            if (i * page.screenHeight < getElementTop(this.img[n].element) + this.img[n].height) {
                this.img[n].element.parentElement.parentElement.style.marginTop = i * page.screenHeight - getElementTop(this.img[n].element) +1 +"px";
            }
        }
    }
}

function init() {
    var imgArr = document.querySelectorAll("figure img[src]");
    Array.prototype.forEach.call(imgArr, function (e) {
        adapter.img.push({
            element: e,
            width: e.offsetWidth,
            height: e.offsetHeight,
            wrapper: e.parentElement.parentElement
        });
        e.parentElement.parentElement.className += " clear";
    });

    adapter.adaptImg();
    adapter.split();
    page.initNavigation();

    window.onresize = function () {
        page.sumPage = Math.ceil(document.body.scrollHeight / window.innerHeight );
        page.screenHeight = window.innerHeight;
        page.screenWidth = window.innerWidth;
        adapter.adaptImg();
        adapter.split();
        page.initNavigation();
    }

    document.onkeydown = function (event) {
        if (event.keyCode == 37 || event.keyCode == 38) {
            if (page.pageNum != 1) {
                event.preventDefault();
                page.pageNum--;
                page.goto(page.pageNum);
            }
        } else if (event.keyCode == 39 || event.keyCode == 40) {
            if (page.pageNum != page.sumPage) {
                event.preventDefault();
                page.pageNum++;
                page.goto(page.pageNum);
            }
        }
    }

    document.onmousewheel = function (e) {
        if (e.wheelDelta > 0 && page.pageNum != 1) {
            e.preventDefault();
            page.pageNum--;
            page.goto(page.pageNum);
        } else if (e.wheelDelta < 0 && page.pageNum != page.sumPage) {
            e.preventDefault();
            page.pageNum++;
            page.goto(page.pageNum);
        }
    }

}

init();

























