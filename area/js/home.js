$(function () {
    new Igirl($('#wrapper'));
});
var Igirl = function ($wrapper) {
    this.$wrapper = $wrapper;
    this.$wrapper.on('click', '#genderBtns img', $.proxy(this, 'selectGender'));
    var that = this;
    this.$wrapper.find('#homePage').addClass('active');

    //点中人物了
    this.$wrapper.on('touchend', '#person', function () {
        that.$wrapper.find('#homePage').addClass('active').show().siblings().removeClass('active').hide();
    });
    //查看宝典内容
    this.$wrapper.on('touchend', '#hisihiDictionary', function () {
        that.$wrapper.find('#hisihiDictionaryCon').show();
    });
    //使用宝典
    this.$wrapper.on('touchend', '#useDictionaryBtn', function () {
        that.$wrapper.find('#hisihiDictionaryCon').hide();
        that.addOneMorePerson();
    });
    this.tipsInterval = null;
    this.catchType = 'girl';  //性别
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
        this.loadingGame();
    },

    /*等待游戏*/
    loadingGame: function () {
        this.$wrapper.find('#loadingPage').addClass('active').show().siblings().removeClass('active').hide();
        this.changeTipImg();
        var that = this;
        window.setTimeout(function () {
            that.startGame.call(that);
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

};