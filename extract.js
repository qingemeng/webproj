/**
 * Created with JetBrains WebStorm.
 * User: gemengqin
 * Date: 6/21/13
 * Time: 8:37 PM
 * To change this template use File | Settings | File Templates.
 */
function extract() {
    var userid = $("#db-usr-profile a:first").attr("href").split(/\//)[4];
    var a = $("<a class='backupText' href='javascript：　void(0)'>(备份文本)</a>");
    $("#db-book-mine h2 .pl").append(a);
    $(".backupText").click(function () {
        var textarea = $("<textarea rows='10' cols='100'></textarea>");
        textarea.click(function () {
            this.focus();
            this.select();
        });
        $(this.parentNode.parentNode).after(textarea);
        total = parseInt($("a:first", this.parentNode).text());
        var type = $("a:first", this.parentNode).attr("href").split(/\//)[5];
        for (var i = 0; i < total / 15 + 1; i++) {
            $.get("/people/" + userid + "/" + type + "?start=" + (i * 15), function (dat) {
                $(".item", dat).each(function () {
                    var href = $(".title a", this).attr("href");
                    title = ($(".title a", this).text().split(/\//)[0]).replace(/\s+/g, "");
                    comment = $("li:nth-child(4)", this).text().replace(/\s+/g, " ");
                    comment = /修改\s删除/.test(comment) ? " " : comment;
                    level = parseInt($("li:nth-child(3) span:first", this).attr("class").split(/rating|-/)[1]);
                    textarea.append("链 接：【" + href + "】,个人评分：【" + level + "】, 片名：【" + title + "】, 个人短评：【" + comment + "】\n");
                });
            })
        }
    });
    alert('success!');
}