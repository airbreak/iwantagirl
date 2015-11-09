wx.ready(function () {
    // 在这里调用 APIs
    wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: 'http://game.hisihi.com/solo/start.php', // 分享链接
        imgUrl: 'http://game.hisihi.com/solo/area/images/home/sharelogo.png', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        trigger: function () {
            this.title = window.hisihiShareInfo.title;
            this.desc = window.hisihiShareInfo.desc;
        },
        success: function () {
            window.hisihiShareInfo.shareCallback();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQQ({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: 'http://game.hisihi.com/solo/start.php', // 分享链接
        imgUrl: 'http://game.hisihi.com/solo/area/images/home/sharelogo.png', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        trigger: function () {
            this.title = window.hisihiShareInfo.title;
            this.desc = window.hisihiShareInfo.desc;
        },
        success: function () {
            window.hisihiShareInfo.shareCallback();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareWeibo({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: 'http://game.hisihi.com/solo/start.php', // 分享链接
        imgUrl: 'http://game.hisihi.com/solo/area/images/home/sharelogo.png', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        trigger: function () {
            this.title = window.hisihiShareInfo.title;
            this.desc = window.hisihiShareInfo.desc;
        },
        success: function () {
            window.hisihiShareInfo.shareCallback();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQZone({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: 'http://game.hisihi.com/solo/start.php', // 分享链接
        imgUrl: 'http://game.hisihi.com/solo/area/images/home/sharelogo.png', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        trigger: function () {
            this.title = window.hisihiShareInfo.title;
            this.desc = window.hisihiShareInfo.desc;
        },
        success: function () {
            window.hisihiShareInfo.shareCallback();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: 'http://game.hisihi.com/solo/start.php', // 分享链接
        imgUrl: 'http://game.hisihi.com/solo/area/images/home/sharelogo.png', // 分享图标	 
        trigger: function () {
            this.title = window.hisihiShareInfo.title + window.hisihiShareInfo.desc;
        },
        success: function () {
            window.hisihiShareInfo.shareCallback();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.checkJsApi({
        jsApiList: ['chooseImage', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
    });
});

/*  weixin://contacts/profile/wxe567cacaccd3a88f*/

wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});