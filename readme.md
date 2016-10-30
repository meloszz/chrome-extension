# chrome翻译插件

一个专门做给theguardian的chrome翻译阅读插件

几个功能
* 去除页面广告
* 点击翻译，还要有播放发音的功能
* 分页功能，适配屏幕，点击，滚轮，方向键实现翻页

本来作业拿到手花了一个小时想好了各部分大致的做法，不过学校最近的事情实在太多，拖了几天才开始做。

做的时候有点赶，bug还是挺多的，后续有时间会完善

  
## 实现

* 去广告的部分，先去了adblock是怎么实现的，大致分为两招，一是Url请求拦截，二是css隐藏。想了想
，毕竟不是做广告屏蔽插件，css隐藏似乎就够用了
* 点击翻译，如果是划词翻译，似乎实现起来还简单些。点击翻译想了好久，最后决定用个蠢办法：取出文章中的内容，然后
用正则提取单词，把每个单词放到一个span中，再调用扇贝给的api就可以实现点击翻译了


# 总结
1. 最近开始改用bem做css命名规范了，还有些不习惯，也还没感觉有什么特别好的地方，不过命名规范这东西，坚持用一套肯定不会错;

2. 在调用扇贝api进行查词的时候，碰到了跨域问题，以前只是听说过，还从没有碰到过，这次花了我一个晚上的时间，又是
jsonp，又是script，不过由于扇贝返回的是json格式，问题始终解决不了。最后翻google的文档的时候，发现chrome插件本身
就是支持跨域的，写在permissions里就好了。老毛病了，总是喜欢碰到问题解决不了才去学，如果能提前把文档大略看一遍，估计
能省去很多时间;

3. 在写dom的时候，有那么几个地方竟然还要翻书，基础还是不够扎实，看来有必要把犀牛书再翻一遍;









 