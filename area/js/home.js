$(function () {
    new Igirl($('#wrapper'));
});
var Igirl = function ($wrapper) {
    this.$wrapper = $wrapper;
    this.tipsInterval = null;
    this.catchType = 'girl';  //性别
    //this.loadingGame();

    var that = this;
    this.$wrapper.on('click', '#genderBtns img', $.proxy(this, 'selectGender'));

    //点中人物了
    this.$wrapper.on('touchend', '.person', function () {
        that.getRandomPerson();
    });

    //查看宝典内容
    this.$wrapper.on('touchend', '#hisihiDictionary', function () {
        that.$wrapper.find('#hisihiDictionaryCon').show();
    });

    //使用宝典
    this.$wrapper.on('touchend', '#useDictionaryBtn', function () {
        var len = that.$wrapper.find('.person').length,
            $con=that.$wrapper.find('#hisihiDictionaryCon');
        if (len >= 2) {
            var $error=$con.find('.errorInfo');
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
        }
        else {
            var $gamePage = that.$wrapper.find('#gamePage'),
                    $person = $gamePage.find('.horizontal');
            $person.length > 1 && $person.eq(1).remove();
            $gamePage.addClass('active').show().siblings().removeClass('active').hide();
        }
    });

    this.$wrapper.on('touchend', ' #shareTips', function () {
        $(this).hide();
    });

    $('.btn').on('touchstart', function () { });
};

Igirl.prototype = {
    selectGender: function (e) {
        var $target = $(e.currentTarget),
            index = $target.index(),
            url = 'imgs/game/3.png'
           
        if (index == 1) {
            url = 'imgs/game/2.png';
            this.catchType = 'boy';  //性别
        }
        this.$wrapper.find('.person').attr('src', url);
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
        this.$wrapper.find('#gamePage').addClass('active').show().siblings().removeClass('active').hide();
    },

    /*更换提示背景图*/
    changeTipImg: function () {
        var $img = this.$wrapper.find('#loadingTips img'),
            flag = true,
            src='';
        var that = this;

            that.tipsInterval = window.setInterval(function () {
                if (flag) {
                    src = 'imgs/loading/6.png';
                    flag = false;
                }else{
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
    getRandomPerson: function () {
        var index = this.getRandomNum(6, 0),
            result = null,
            $resultPage = this.$wrapper.find('#resultPage');
        if (this.catchType == 'boy') {
            result = allPersonInfo.boy[index];
        }
       else{
            result = allPersonInfo.girl[index];
        }
        $resultPage.find('.nameFiled').html(result.n);
        $resultPage.find('.hInfo').text(result.h);
        $resultPage.find('.wInfo').text(result.w);
        $resultPage.find('.resultInfoItem .level').attr('src', 'imgs/gameover/star/' + result.l+'.png');
        $resultPage.find('.imgContainer img').attr('src', 'imgs/gameover/' + result.img);
        $resultPage.find('.description p').text(result.d);
        $resultPage.show().siblings().hide();
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

var allPersonInfo = {
    boy: [
        { n: '暖男型', h: '175~180',w:'55~65kg', d: '干净清秀，洗衣做饭，样样精通', l: '2', img: '1.jpg' },
        { n: '宅男型', h: '168~180', w: '55~65kg', d: '宅在家里打游戏，却不敢违抗你的命令', l: '2', img: '2.jpg' },
        { n: '肌肉型', h: '170~180', w: '70~80kg', d: '身材匀称自然，有着健康的生活态度', l: '3', img: '3.jpg' },
        { n: '学霸型', h: '170~175', w: '55~65kg', d: '督促你学习，让你远离挂科烦恼', l: '2', img: '4.jpg' },
        { n: '霸道总裁型', h: '172~185', w: '70~80kg', d: '整个鱼塘都是我的，你也是我的', l: '5', img: '5.jpg' },
        { n: '高富帅型', h: '180~190', w: '75~85kg', d: '将你视做小公举一样，宠着你', l: '4', img: '6.jpg' }
    ],
    girl: [
        { n: '萌妹纸', h: '155~160', w: '40~50kg', d: '无辜的眼神是最大杀器，小小一只像甜甜的棉花糖', l: '2', img: '7.jpg' },
        { n: '小萝莉', h: '150~155', w: '35~45kg', d: '天性古怪，调皮搞怪,像小动物一样萌萌软软，每天给你爱的抱抱', l: '2', img: '8.jpg' },
        { n: '御姐', h: '168~175', w: '40~50kg', d: '背得熟职场宝典，使得出御夫绝招', l: '4', img: '9.jpg' },
        { n: '腹黑妹纸', h: '160~172', w: '40~50kg', d: '花样心机，让人不可救药的爱上，整人招式每天都有新花样，让生活充满刺激想象', l: '5', img: '10.jpg' },
        { n: '小清新妹纸', h: '155~165', w: '35~45kg', d: '干净清爽、单纯可人，像初夏的清新凉风，让每一天都像喝过一口蜜糖', l: '2', img: '11.jpg' },
        { n: '凤姐', h: '150~160', w: '50~60kg', d: '……挺好的', l: '4', img: '12.jpg' }

    ]
};