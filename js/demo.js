// $(document).ready(function(){
//   htmlobj=$.ajax({url:"https://api.shanbay.com/bdc/search/?word=dog"});
  
//   console.log(htmlobj.responseText);
// });


 var url = "https://api.shanbay.com/bdc/search/?word=dog";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var res = JSON.parse(xmlhttp.responseText);
                    console.log(xmlhttp.responseText);
                    console.log(res);
                }
            };
            xmlhttp.open("GET", url);
            xmlhttp.send();

// var

// jQuery(document).ready(function(){ 
//         $.ajax({
//              type: "get",
//              async: true,
//              url: "https://api.shanbay.com/bdc/search/?word=pig",
//              dataType: "json",
//              jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
//              success: function(data){
//                  console.log("success:"+JSON.stringify(data));
//              },
//              error: function(data){

//                  console.log("fail:"+JSON.stringify(data));
                 
//              }
//          }).done(function(data){
//              console.log("done");
//          })
//      });

