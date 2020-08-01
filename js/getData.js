define(['jquery'], function ($) {
    'use strict';
    //获取商品列表数据
    function $ajax1(address) {
        $.ajax({
            url: `./data/${address}.json`,
            dataType: "json",
            success: function (obj) {
                let str1 = "";
                for (var i = 0; i < obj.length; i++) {
                    str1 += `
                    <li>
                    <a href="${obj[i].details}">
                            <img src="${obj[i].img}">
                            <p>${obj[i].describe}</p>
                            <span>￥${obj[i].price}</span>
                        </a>
                    </li>
                    `;
                    $(".tab-bottom").html(str1);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    //获取今日特价选项卡数据
    function $ajax2(address) {
        $.ajax({
            url: `./data/${address}.json`,
            dataType: "json",
            success: function (obj) {
                let str2 = "";
                let str3 = "";
                //今日特价左边
                str3 += `<a href="${obj[0].details}">
                <img src="${obj[0].img}">
                <p>${obj[0].describe}</p>
                <span>￥${obj[0].price}</span>
                </a>`;
                $(".commodity-show-left").html(str3);
                for (var i = 1; i < 5; i++) {
                    //今日特价右边
                    str2 += `
                    <li>
                    <a href="${obj[i].details}">
                    <img src="${obj[i].img}">
                    <p>${obj[i].describe}</p>
                    <span>￥${obj[i].price}</span>
                    </a>
                    </li>
                    `;
                    $(".commodity-show-right").html(str2);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    //获取商品详情页的数据
    function getDataDetails() {
        $.ajax({
            url: "./data/details.json",
            dataType: "json",
            success: function (arr) {
                for (let i = 0; i < arr.length; i++) {
                    let str1 = "";
                    let str2 = "";
                    str1 += `<div class="section-show clear_fix">
                    <div class="section-show-left">
                    <img src="${arr[i].left}" alt="">
                                </div><ul class="section-box"> `;
                    for (let j = 0; j < arr[i].right.length; j++) {
                        str2 += `<li>
                                    <a href="${arr[i].right[j].address}">
                                        <img src="${arr[i].right[j].img}" alt="">
                                        <p>
                                            <span>￥${arr[i].right[j].priceLeft}</span>
                                            <span>￥${arr[i].right[j].priceCenter}</span>
                                            <span>闪降${arr[i].right[j].priceRight}元</span>
                                        </p>
                                    </a>
                                </li>`;
                    }
                    str1 = str1 + str2 + `</ul></div>`
                    $(str1).appendTo(".section-con")
                }
                ;
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    //获取购物车列表页的数据
    

    return {
        $ajax1: $ajax1,
        $ajax2: $ajax2,
        getDataDetails, getDataDetails,
    }
});