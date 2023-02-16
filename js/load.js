$(function () {

    if ($.cookie("loginState")==undefined) {
        window.location.href="login.html";
    }
})

$("#confirm").click(function () {
    alert("設定成功。")
})
$("#stop").click(function () {
    // window.close();
    // window.open('about:blank', '_self').close();
    window.location.href="/";
})
