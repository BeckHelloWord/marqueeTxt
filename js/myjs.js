/**
 * Created by yuwei on 2016/5/19.
 */
(function ($) {
    var defaults = {
        dom: '.box .li-list',
        interval: 1000
    };

    $.fn.txtRoll = function (options) {
        var timer = null;
        var options = $.extend(defaults, options);
        $(options.dom).html($(options.dom).html() + $(options.dom).html());

        var fun = function () {
            $(options.dom).stop().animate({"margin-top": -$(options.dom).find('li').outerHeight(true)}, 500, function () {
                $(options.dom).find('li').first().appendTo($(options.dom));
                $(options.dom).css('margin-top', 0);
            });
        }

        clearInterval(timer);
        timer = setInterval(fun, options.interval);

        $(options.dom).on('mouseover', function () {
            clearInterval(timer);
        });
        $(options.dom).on('mouseout', function () {
            timer = setInterval(fun, options.interval);
        });
    }

})(jQuery)