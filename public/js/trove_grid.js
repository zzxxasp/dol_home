//数据初始化
AV.initialize('D6rvDcHFKqPHsxuhn3CSaIzl-gzGzoHsz', 'l4dMbKQEpcNleHu2rL90bmYd');
var name=null;
var url=null;
var detail=null;
var list=null;
var defalut="/resource/default/dol_trove_defalut.jpg";
var page=0;
var type="海洋生物";
initQueryForTrove(type,page);
semantic.visiblity = {};
// ready event
semantic.visiblity.ready = function() {
$('#user_list')
  .visibility({
    once: false,
    // update size when new content loads
    observeChanges: true,
    // load content on bottom edge visible
    onBottomVisible: function() {
        page++;
        initQueryForTrove(type,page);
    }
});
}
// attach ready event
$(document).ready(semantic.visiblity.ready);
/** 初始化发现物查询 **/
function initQueryForTrove(type,page){
    var GlobalBadges = AV.Object.extend("Trove");
var query = new AV.Query(GlobalBadges);
query.exists("name");
query.equalTo("type",type);
query.limit(10);
query.skip(10*page);
query.descending("id");
query.find({
    success: function (results) {
        imageURLs = [];
        console.log(JSON.stringify(results));
        for (var i = 0; i < results.length; i++) {
            //参数赋值
            var object = results[i];
            imageURLs.push(object.get('pic'));
            name=object.get('name');
            var id=object.get('index_id');
            detail=object.get('details');
            var url=imageURLs[i];
            //列表加载
            var list=getHtml(id,name,url,detail);
            $('#user_list').append(list);
            //懒加载设置
            $('.image').visibility({
                type       : 'image',
                transition : 'fade in',
                duration   : 1000
            });
        }
    $('#loading').removeClass("active").addClass("disabled");
    },
    error: function (error) {
        //失败显示错误信息，提供重新查询
        console.log("Error: " + error.code + " " + error.message);
    }
});
}
/** 列表生成 **/
function getHtml(id,name,url,detail){
    if(url!=null){
        var list="<a onclick=\"send("+id+")\" class=\"ui card\"><img class=\"ui image\" src=\""+defalut+"\" data-src=\""+url.url()+"\"><div class=\"content\"><div class=\"header\">"+name+"</div><div class=\"description\">"+detail+"</div></div></a>";
            }else{
                var list="<a onclick=\"send("+id+")\" class=\"ui card\"><img class=\"ui image\" src=\""+defalut+"\"><div class=\"content\"><div class=\"header\">"+name+"</div><div class=\"description\">"+detail+"</div></div></a>";
            }
    return list;
}
/** 跳转参数绑定 **/
function send(id){
    var url = "trove_detail.html"; 
    window.open(encodeURI(url + "?id=" + id));
    //encodeURI编码
}