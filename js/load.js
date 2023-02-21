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
                if ($ctrl && $ctrl.length > 0) {
                    switch ($ctrl.prop("type")) {
                        case "radio":
                        case "checkbox":
                            $ctrl.each(function () {
                                if ($(this).attr('value') == item) {
                                    $(this).attr("checked", 'checked').change();
                                }
                            })
                            break;
                        //By Jerry 20230217
                        case undefined:
                            $ctrl.text(item);
                            break;
                        default:
                            $ctrl.val(item).change();
                    }
                }
            })
            //20230220 处理 date+time和其他新增
            if (window.location.href.includes("index")){
                let date = data.data.date;
                let time = data.data.time;
                $('[name=datetime]').val(date + ' ' + time);

                let ipType = data.data.ipSync;
                let $ctrIp = $('[name=ipType]');
                ipType == "0" ? $ctrIp.val("固定IP") : $ctrIp.val("DHCP");

                let $ctrCard = $('[name=cardType]');
                let cardType = data.data.cardEncrypt;
                cardType == "1" ? $ctrCard.val("有効") : $ctrCard.val("無効");
            }
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
        url: actionUrl + '?' + $.param(data),
        // data: $form.serialize(), // serializes the form's elements.
        // data: getFormData($form),
        dataType: "json",
        data: {
            data: data
        }, // serializes the form's elements.
        success: function (data) {
            if (data && !data.ret && !isNaN(data.ret)) {
                alert("送信に成功しました。" ); // show response from the php script.
            } else {
                alert("送信に失敗しました。" + data.msg);
            }
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