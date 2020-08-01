define(['jquery','getData'], function($, getData) {
    'use strict';
    //初始化
    function init(){
        getData.getDataDetails();
    }
    return {
        init:init
    }
});