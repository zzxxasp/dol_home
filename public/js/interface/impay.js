Parse.initialize("9MRUA76jBOhgJJALOgX4RrXKG5D1jUhK7A9ZSAZc", "AdCFGEK7umfK59uU5siK2k7EtKS4IEJEek6wMJCS");

//查询日志
var GlobalBadges = Parse.Object.extend("log");
var query = new Parse.Query(GlobalBadges);
query.exists("logfile");
query.descending("createdAt");
query.limit(20);
query.find({
    success: function (results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var file=object.get("logfile");
            var create=object.get("createdAt");
            var time = create.Format("yyyy-MM-dd HH:mm:ss");
            $('#loading').removeClass("active")
                .addClass("disabled");
            var list="<div class=\"title\"><i class=\"dropdown icon\"></i>"+time+"</div><div class=\"content ui segment\"><pre id=\"show"+i+"\"></pre></div>";
            $("#log_list").append(list);
            $("#show"+i).load(file.url());
        }
    },
    error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});
