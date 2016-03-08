var urlinfo = window.location.href;                       var id = urlinfo.split("?")[1].split("=")[1];
Parse.initialize("9MRUA76jBOhgJJALOgX4RrXKG5D1jUhK7A9ZSAZc", "AdCFGEK7umfK59uU5siK2k7EtKS4IEJEek6wMJCS");
//查询日志
var GlobalBadges = Parse.Object.extend("updateInfo");
var query = new Parse.Query(GlobalBadges);
console.log(getappName(id))
query.equalTo("appName",getappName(id));
query.descending("createdAt");
query.find({
    success: function (results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var file=object.get("updatefile");
            var verion=object.get("appVerion");
            var name=object.get("appName");
            var list="<div class=\"title\"><i class=\"dropdown icon\"></i>"+name+verion+"</div><div class=\"content ui segment\"><pre id=\"show"+i+"\"></pre></div>";
            $("#log_list").append(list);
            $("#show"+i).load(file.url());
        }
        $('#loading').removeClass("active")
                .addClass("disabled");
        $("#labels").html(getappName(id));
    },
    error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});

function getappName(id){
   if(id==1){
    return "艾钱包"
   }else if(id==2){
    return "oleka"
   }else if(id==3){
    return "艾钱包"
   }
}