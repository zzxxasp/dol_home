var urlinfo = window.location.href;                             var id = urlinfo.split("?")[1].split("=")[1];
AV.initialize('D6rvDcHFKqPHsxuhn3CSaIzl-gzGzoHsz', 'l4dMbKQEpcNleHu2rL90bmYd');
var GlobalBadges = AV.Object.extend("Trove");
var query = new AV.Query(GlobalBadges);
query.equalTo("index_id",parseInt(id));
var name=null;
var url=null;
var detail=null;
var list=null;
var defalut="/resource/default/dol_trove_defalut.jpg";
query.find({
    success: function (results) {
        // If the query is successful, store each image URL in an array of image URL's
        imageURLs = [];
        console.log(results.length);
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            imageURLs.push(object.get('pic'));
            name=object.get('name');
            var id=object.get('index_id');
            detail=object.get('details');
            var url=imageURLs[i];
            var list=getHtml(id,name,url,detail);
            $('#user_list').append(list);
            $('#loading').removeClass("active")
                .addClass("disabled");
        }
    },
    error: function (error) {
        // If the query is unsuccessful, report any errors
        console.log("Error: " + error.code + " " + error.message);
    }
});

function getHtml(id,name,url,detail){
    if(url!=null){
                 var list="<a id=\"t"+id+"\" class=\"ui card\"><img class=\"ui image\" src=\""+url.url()+"\"><div class=\"content\"><div class=\"header\">"+name+"</div><div class=\"description\">"+detail+"</div></div></a>";
            }else{
                var list="<a id=\"t"+id+"\" class=\"ui card\"><img class=\"ui image\" src=\""+defalut+"\"><div class=\"content\"><div class=\"header\">"+name+"</div><div class=\"description\">"+detail+"</div></div></a>";
            }
    return list;
}