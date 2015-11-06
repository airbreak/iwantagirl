$(function () {
    new Igirl($('#wrapper'));
});
var Igirl = function ($wrapper) {
    this.$wrapper = $wrapper;
    this.$wrapper.on('click', '#genderBtns img', $.proxy(this, 'startGame'));
    $('.btn').on('touchstart', function () { });
};

Igirl.prototype = {
    startGame: function (e) {
        var $target = $(e.currentTarget),
            index = $target.index();
        if (index == 0) { }

        else {

        }
        this.loadingGame();
    },

    loadingGame: function () {
        this.$wrapper.find('#loadingPage').show().siblings().hide();
    },

};