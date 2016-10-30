function $A(e) {
    return document.querySelectorAll(e);
}

function $(e) {
    return document.querySelector(e);
}

var rebuild = {
    build: function () {
        var arr = $A(".content__article-body p,.content__article-body li,.content__header h1,.content__standfirst p");
        for (var n = 0; n < arr.length; n++) {
            var child = arr[n].childNodes;
            var innerH = "";
            for (var i = 0; i < child.length; i++) {
                if (child[i].nodeType == 3) {
                    var str = child[i].nodeValue.split(/\s/g);
                    str.forEach(function (e) {
                        if (e.match(/^[A-Za-z]+$/)) {
                            innerH += "<span class='word'>" + e + "</span>" + " ";
                        }
                        else if (e.match(/^([\.\'\"\,\‘\’\”\“\：\；\！\？]+)([A-Za-z]+)$/)) {
                            var result = /^([\.\'\"\,\‘\’\”\“\：\；\！\？]+)([A-Za-z]+)$/.exec(e);
                            innerH += result[1] + "<span class='word'>" + result[2] + "</span>" + " ";
                        }
                        else if (e.match(/^([A-Za-z]+)([\.\'\"\,\:\;\!\?\‘\’\”\“\：\；\！\？]+)$/)) {
                            var result = /^([A-Za-z]+)([\.\'\"\,\:\;\!\?\‘\’\”\“\：\；\！\？]+)$/.exec(e);
                            innerH += "<span class='word'>" + result[1] + "</span>" + result[2] + " ";
                        } else {
                            innerH += e + " ";
                        }
                    });
                } else if (child[i].nodeType == 1) {
                    innerH += child[i].outerHTML;
                }
            }
            arr[n].innerHTML = innerH;
        }
    }
}


//翻译面板
function Panel() {
    var audio = document.createElement("audio");
    $("body").appendChild(audio);

    var panel = document.createElement("div");
    panel.style.position = "fixed";
    panel.style.display = "none";
    panel.style.maxHeight = 150 + "px";
    panel.style.minWidth = 250 + "px";
    panel.innerHTML = '<div class="wordPanel"><div class="wordPanel__firstLine"><div class="wordPanel__showingWord"><span class="showingWord__word">update</span><span class="showingWord__phonetic">/ /</span></div><div class="button_wrapper"><div class="button_wrapper__playButton"></div></div></div><div class="wordPanel__explanation">现代化; 更新的信息; 更新的行为或事例;</div></div>';
    $("body").appendChild(panel);
    this.show = function (str, x, y, res) {
        panel.style.display = str;
        if (str == "block") {
            audio.src = res.data.audio_addresses.uk[0];
            $(".button_wrapper__playButton").onclick = function () {
                audio.play();
            }
            $(".showingWord__word").innerHTML = res.data.content + " ";

            if (res.data.cn_definition.defn) {
                $(".showingWord__phonetic").innerHTML = " /" + res.data.pronunciations.uk + "/";
                $(".wordPanel__explanation").innerHTML = res.data.cn_definition.defn;
            } else {
                $(".showingWord__phonetic").innerHTML = "";
                $(".wordPanel__explanation").innerHTML = "没有查询结果";
            }
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;

            if (x - panel.offsetWidth / 2 >= 0 && x + panel.offsetWidth <= screenWidth) {
                panel.style.left = (x - panel.offsetWidth / 2) + "px";
            } else if (x < screenWidth / 2) {
                panel.style.left = "1px";
            } else {
                panel.style.right = "1px";
            }

            if (y > screenHeight / 2) {
                panel.style.top = (y - 20 - panel.offsetHeight) + "px";
            } else {
                panel.style.top = (y + 25) + "px";
            }
        }
    }

}

function init() {
    function clear(){
        panel.show("none");
        if($(".focus")){
            $(".focus").className = "word";
        }
    }

    var panel = new Panel();
    rebuild.build();
    $("body").addEventListener("click", function (e) {
        var focus = $(".focus");
        if (focus) {
            focus.className = "word";
        }
        if (e.target.className == "word") {
            e.target.className += " focus";
            var word = e.target.innerHTML;
            var url = "https://api.shanbay.com/bdc/search/?word=" + e.target.innerHTML;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    panel.show("block", e.clientX, e.clientY, JSON.parse(xmlhttp.responseText));
                }
            };
            xmlhttp.open("GET", url);
            xmlhttp.send();
        } else if (e.target.className == "button_wrapper__playButton"
            || e.target.className == "wordPanel" || e.target.className == "firstLine"
            || e.target.className == "showingWord" || e.target.className == "showingWord__word"
            || e.target.className == "showingWord__phonetic" || e.target.className == "button_wrapper"
            || e.target.className == "wordPanel__explanation") {
            focus.className += " focus";
        } else {
            panel.show("none");
        }
    }, false);

    window.onmousewheel = clear;
}

init();

