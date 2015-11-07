$(function () {
    new Igirl($('#wrapper'));
});
var Igirl = function ($wrapper) {
    this.$wrapper = $wrapper;
    this.$wrapper.on('click', '#genderBtns img', $.proxy(this, 'selectGender'));
    var that = this;
    this.$wrapper.on('click', '#person', function () {
        console.log(that.catchType);
        that.$wrapper.find('#homePage').show().siblings().hide();
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
        this.$wrapper.find('#person').attr('src', url);
        this.loadingGame();
    },

    loadingGame: function () {
        this.$wrapper.find('#loadingPage').show().siblings().hide();
        this.changeTipImg();
        var that = this;
        window.setTimeout(function () {
            that.startGame.call(that);
        }, 7000);
    },

    /*开始游戏*/
    startGame: function () {
        this.$wrapper.find('#gamePage').show().siblings().hide();
    },

    /*更换背景图*/
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

};