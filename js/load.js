$(function () {

    if ($.cookie("loginState") == undefined) {
        window.location.href = "login.html";
    }
})

$("#confirm").click(function () {
    // alert("設定成功。")
    ajaxSubmit();
})
$("#stop").click(function () {
    // window.close();
    // window.open('about:blank', '_self').close();
    // window.location.href="/";
    // history.back();
    window.location.href = "index.html";
})

$(function () {
    loadJSON();
})

function loadJSON() {
    // $.getJSON("/data", function (data) {
    // $.getJSON("https://eopz8ly41cg8q6s.m.pipedream.net", function (data) {
    $.getJSON("/device/getAllData", function (data) {
        if (data && !data.ret && !isNaN(data.ret)) {
            $.each(data.data, function (key, item) {
                let $ctrl = $('[name=' + key + ']', "form");
                switch ($ctrl.prop("type")) {
                    case "radio":
                    case "checkbox":
                        $ctrl.each(function () {
                            if ($(this).attr('value') == value) {
                                $(this).attr("checked", value);
                            }
                        })
                        break;
                    //By Jerry 20230217
                    case undefined:
                        $ctrl.text(item);
                        break;
                    default:
                        $ctrl.val(item);
                }
            })
        } else {
            alert("データー取得に失敗しました。")
        }
    })
        .fail(function () {
            alert("データー取得に失敗しました。");
            console.log("データー取得に失敗しました。");
        })
}

function ajaxSubmit() {
    // e.preventDefault(); // avoid to execute the actual submit of the form.

    var $form = $("form");
    var actionUrl = $form.attr('action');
    // var actionUrl = "https://eopz8ly41cg8q6s.m.pipedream.net";
    // let data = $form.serialize();
    let data = getFormData($form);

    $.ajax({
        type: "POST",
        url: actionUrl+'?'+$.param(data),
        // data: $form.serialize(), // serializes the form's elements.
        data: getFormData($form),
        dataType: "json",
        data: {
            data: data
        }, // serializes the form's elements.
        success: function (data) {
            alert("送信に成功しました。設定が完了したら、デバイスを再起動してください。"); // show response from the php script.
        },
        error: function (data) {
            alert("送信に失敗しました。" + data.msg);
        }
    });
}

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}