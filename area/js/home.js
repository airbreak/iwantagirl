$(function () {
    getMyToken(function () {
        recordViewInfo(0);
    });
    setShareToFriendsInfo('girl', 0);
    new Igirl($('#wrapper'));
});
var Igirl = function ($wrapper) {
    this.$wrapper = $wrapper;
    this.tipsInterval = null;
    this.catchType = 'girl';  //性别
    this.loadingGame();

    var that = this;
    this.$wrapper.on('click', '#genderBtns img', $.proxy(this, 'selectGender'));

    //点中人物了
    this.$wrapper.on('touchend', '.person', function () {
        var gender = $(this).data('gender');
        that.catchType=gender;
        that.getRandomPerson(gender);
    });

    //查看宝典内容
    this.$wrapper.on('touchend', '#hisihiDictionary', function () {
        that.$wrapper.find('#hisihiDictionaryCon').show();
    });

    //使用宝典
    this.$wrapper.on('touchend', '#useDictionaryBtn', function () {
        var len = that.$wrapper.find('.person').length,
            $con = that.$wrapper.find('#hisihiDictionaryCon');
        if (len >= 2) {
            var $error = $con.find('.errorInfo');
            $error.show();
            window.setTimeout(function () { $con.add($error).hide() }, 700);
        } else {
            $con.hide();
            that.addOneMorePerson();
        }
    });

    //分享和重来
    this.$wrapper.on('touchend', ' .shareAndGiveUpBtns img', function () {
        var index = $(this).index();
        if (index == 0) {
            that.$wrapper.find('#shareTips').show();
            setShareToFriendsInfo(that.catchType, that.selectectedPersondex);
        }
        else {
            var $gamePage = that.$wrapper.find('#gamePage'),
                    $person = $gamePage.find('.horizontal');
            $person.length > 1 && $person.eq(1).remove();
            that.$wrapper.find('#gamePage').addClass('active').show().siblings().removeClass('active').hide();
        }
    });

    this.$wrapper.on('touchend', ' #shareTips', function () {
        $(this).hide();
    });

    this.$wrapper.on('touchend', '#hisihiLogoH', function () {
        that.catchType = 'hi';
        that.getRandomPerson('hi');
    });

    $('.btn').on('touchstart', function () { });
};

Igirl.prototype = {
    selectGender: function (e) {
        var $target = $(e.currentTarget),
            index = $target.index(),
            url = 'imgs/game/3.png',
            gender = 'girl';
        if (index == 1) {
            url = 'imgs/game/2.png';
            gender = 'boy';  //性别
        }
        this.$wrapper.find('.person').attr({ 'src': url, 'data-gender': gender });
        this.startGame();
    },

    /*等待游戏*/
    loadingGame: function () {
        this.$wrapper.find('#loadingPage').addClass('active').show().siblings().removeClass('active').hide();
        this.changeTipImg();
        var that = this;
        window.setTimeout(function () {
            that.$wrapper.find('#homePage').addClass('active').show().siblings().removeClass('active').hide();
        }, 3000);
    },

    /*开始游戏*/
    startGame: function () {
        var that = this;
        this.$wrapper.find('#gameDesciption').addClass('active').show().siblings().removeClass('active').hide();
        window.setTimeout(function () {
            that.$wrapper.find('#gamePage').addClass('active').show().siblings().removeClass('active').hide();
        }, 8050);
    },

    /*更换提示背景图*/
    changeTipImg: function () {
        var $img = this.$wrapper.find('#loadingTips img'),
            flag = true,
            src = '';
        var that = this;

        that.tipsInterval = window.setInterval(function () {
            if (flag) {
                src = 'imgs/loading/6.png';
                flag = false;
            } else {
                src = 'imgs/loading/5.png';
                flag = true;
            }
            $img.attr('src', src);
        }, 2000);
        //},2000);
    },

    /*添加一个人物*/
    addOneMorePerson: function () {
        var $clone = this.$wrapper.find('.horizontal').clone(true);
        this.$wrapper.find('#gamePage').append($clone);
    },

    /*得到随机人物*/
    getRandomPerson: function (gender) {
        var index, result = null, $resultPage = this.$wrapper.find('#resultPage');
        if (gender=='hi') {
            index =0;
        }
        else {
            index = this.getRandomNum(6, 0);
        }
        result = allPersonInfo[gender][index];
        $resultPage.find('.nameFiled').html(result.n);
        $resultPage.find('.hInfo').text(result.h);
        $resultPage.find('.wInfo').text(result.w);
        $resultPage.find('.resultInfoItem .level').attr('src', 'imgs/gameover/star/' + result.l + '.png');
        $resultPage.find('.imgContainer img').attr('src', 'imgs/gameover/' + result.img);
        $resultPage.find('.description p').text(result.d);
        $resultPage.show().siblings().hide();
        this.selectectedPersondex = index;
    },

    /*
    *得到随机数
    *Parameters:
    *minNum - {int} 可能出现的最小值
    *maxNum - {int} 可能出现的最大值
    *Returns:
    *num - {int} 得到的随机数
    */
    getRandomNum: function (maxNum, minNum) {
        if (!minNum) {
            minNum = 0;
        }
        var range = maxNum - minNum;
        var index = Math.round(Math.random() * range) + minNum;
        return index;
    },



};

/*分享信息*/
function setShareToFriendsInfo(strType, index) {
    var result = allPersonInfo[strType][index];
    if (strType == 'boy' || strType=='hi') {
        strType = '男仆';
    } else {
        result = allPersonInfo.girl[index];
        strType = '妹子';
    }
    window.hisihiShareInfo = {
        title: '让我命犯桃花的就是这只【' + result.t + '】',
        desc: '光棍节到了，快进来捉一只' + strType + '，结束你的单身生活！',
        link: '',
        imgUrl: '',
        type: 'link',
        dataUrl: '',
        shareCallback: function () {
            recordViewInfo(1);
        }
    }
}

function recordViewInfo(index) {
    var urlType = ['http://api.hisihi.com/v1/online/pv+1', 'http://api.hisihi.com/v1/online/share+1', 'http://api.hisihi.com/v1/online/download+1'],
        formData = [{ "oid": 4, "channel": 1 }],
        token = window.localStorage.getItem('myToken');
    $.ajax({
        type: 'PUT',
        url: urlType[index],
        dataType: 'json',
        data: JSON.stringify(formData[0]),
        contentType: 'application/json',  //必须要加
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "basic " + token);
        },
        success: function (e) {
            console.log(e);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

/*数据使用，令牌申请*/
function getMyToken(callback) {
    var storage = window.localStorage,
        token = storage.getItem('myToken'),
        formData = '{"uid":"BbMKbida","secret":"lmfyDAow","type":"1"}';
    if (!token) {
        $.post('http://api.hisihi.com/v1/token', formData, function (data) {
            storage.setItem('myToken', base64encode(data.token + ':'));
            callback();
        });
    } else {
        callback();
    }
}

//编码的方法
function base64encode(str) {
    var out, i, len, base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}


var allPersonInfo = {
    boy: [
        { n: '暖男型', t: '暖男', h: '175~180', w: '55~65kg', d: '干净清秀，洗衣做饭，样样精通', l: '2', img: '1.jpg' },
        { n: '宅男型', t: '宅男', h: '168~180', w: '55~65kg', d: '宅在家里打游戏，却不敢违抗你的命令', l: '2', img: '2.jpg' },
        { n: '肌肉型', t: '肌肉男', h: '170~180', w: '70~80kg', d: '身材匀称自然，有着健康的生活态度', l: '3', img: '3.jpg' },
        { n: '学霸型', t: '学霸', h: '170~175', w: '55~65kg', d: '督促你学习，让你远离挂科烦恼', l: '2', img: '4.jpg' },
        { n: '霸道总裁型', t: '霸道总裁', h: '172~185', w: '70~80kg', d: '整个鱼塘都是我的，你也是我的', l: '5', img: '5.jpg' },
        { n: '高富帅型', t: '高富帅', h: '180~190', w: '75~85kg', d: '将你视做小公举一样，宠着你', l: '4', img: '6.jpg' }
        
    ],
    girl: [
        { n: '萌妹纸', t: '萌妹纸', h: '155~160', w: '40~50kg', d: '无辜的眼神是最大杀器，小小一只像甜甜的棉花糖', l: '2', img: '7.jpg' },
        { n: '小萝莉', t: '小萝莉', h: '150~155', w: '35~45kg', d: '天性古怪，调皮搞怪,像小动物一样萌萌软软，每天给你爱的抱抱', l: '2', img: '8.jpg' },
        { n: '御姐', t: '御姐', h: '168~175', w: '40~50kg', d: '背得熟职场宝典，使得出御夫绝招', l: '4', img: '9.jpg' },
        { n: '腹黑妹纸', t: '腹黑妹纸', h: '160~172', w: '40~50kg', d: '花样心机，让人不可救药的爱上，整人招式每天都有新花样，让生活充满刺激想象', l: '5', img: '10.jpg' },
        { n: '小清新妹纸', t: '小清新妹纸', h: '155~165', w: '35~45kg', d: '干净清爽、单纯可人，像初夏的清新凉风，让每一天都像喝过一口蜜糖', l: '2', img: '11.jpg' },
        { n: '凤姐', t: '凤姐', h: '150~160', w: '50~60kg', d: '……挺好的', l: '4', img: '12.jpg' }
    ],
    hi: [{ n: '小嘿', t: '小嘿', h: '无限', w: '无限', d: '百万设计师都认识的设计大神', l: '1', img: '7.png' }]
};

//wx.config({
//    debug: false,
//    appId: '<?php echo $signPackage["appId"];?>',
//    timestamp: <?php echo $signPackage["timestamp"];?>,
//nonceStr: '<?php echo $signPackage["nonceStr"];?>',
//signature: '<?php echo $signPackage["signature"];?>',
//jsApiList: [
//  // 所有要调用的 API 都要加到这个列表中
//    'checkJsApi','chooseImage','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','onMenuShareTimeline'
//]
//});

