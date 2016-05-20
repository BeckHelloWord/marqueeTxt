/**
 * Created by yuwei on 2016/5/19.
 * 注意：当使用过渡效果滚动（way=false）时，需要将interval改为1000或更大的值
 */

(function ($) {

    var defaults = {
        interval: 40,
        way: true    //滚动方式ture为默认滚动，flase为过渡滚动
    };

    $.fn.txtRoll = function (options) {
        var options = $.extend(defaults, options);

        var timer = null, _this = $(this);
        _this.html(_this.html() + _this.html());

        //判断复制后内容是否超出盒子高度
        if (_this.height() > _this.parent().height()) {
            //滚动
            var fun = function () {
                _this.stop().animate({'margin-top': options.way ? '-=1' : -_this.find('li').outerHeight(true)}, options.way ? 0 : 500, function () {
                    if (options.way) {
                        //每滚动一次判断一下是否等于一条内容的高度，如果是将第一条移动到最后，外边据清零
                        var gap = parseInt(_this.css("margin-top"));
                        if (gap === -_this.find('li').outerHeight(true)) {
                            _this.find('li').first().appendTo(_this);
                            _this.css('margin-top', 0);
                        }
                    } else {
                        _this.find('li').first().appendTo(_this);
                        _this.css('margin-top', 0);
                    }
                })
            }

            //定时
            clearInterval(timer);
            timer = setInterval(fun, options.interval);

            //停止
            _this.mouseenter(function () {
                clearInterval(timer);
            }).mouseleave(function () {
                timer = setInterval(fun, options.interval);
            })
        }
    }

})(jQuery)