var ILLYCIRCOLO = {};
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$.each(window._q, function(i, f){ $(f); });

var _SETEFI = {
    oldIE : $('html').hasClass('lte-ie8') 
};


/* gallery HP */
$(function() {

    var w = 100;

    if ($('#hpcarousel').length) {

        var gallery = $('#hpcarousel'),
            list    = gallery.find('ul'),
            items   = list.find('li'),
            len     = items.length,
            current = 1,
            first   = items.filter(':first'),
            last    = items.filter(':last'),
            triggers;


        /* la gallery ha più di una foto da scorrere */
        if (len > 1) {
            $('<button type="button" class="prev">indietro</button>' +
              '<button type="button" class="next">avanti</button>').appendTo(gallery);

            list.css('left', -w + '%');
        }
        triggers = $('button');

        /* 1. Cloning first and last item */
        first.before(last.clone(true)); 
        last.after(first.clone(true)); 

        if (_SETEFI.oldIE) {
            var ll = list.find('li').length;
            list.css('width', (100 * ll) + '%');
            list.find('li').css('width', (100 / ll) + '%');
            w = 100 / ll;
        }


        /* 2. Set button handlers */
        triggers.on('click', function() {

            if (list.is(':not(:animated)')) {

                var cycle = false,
                    delta = (this.className === "prev")? -1 : 1;
                    /* in the example buttons have id "prev" or "next" */  

                list.animate({ left: "+=" + (-100 * delta) + "%" }, function() {

                    current += delta;

                    /** 
                     * we're cycling the slider when the the value of "current" 
                     * variable (after increment/decrement) is 0 or when it exceeds
                     * the initial list length
                     */          
                    cycle = !!(current === 0 || current > len);

                    if (cycle) {
                        /* we switched from image 1 to 4-cloned or 
                           from image 4 to 1-cloned */
                        current = (current === 0)? len : 1; 
                        list.css({left:  (-100 * current) + "%" });
                    }
                });   
            }

        });
    }


    /* box primo piano */

    if ($('#primopiano').length) {

        var ppwrapper = $('#primopiano');
        var tabs = ppwrapper.find('p[id]'),
            titles =  ppwrapper.find('h3');

        tabs.eq(0).addClass('current');
        titles.eq(0).addClass('current');

        ppwrapper.on('click', 'a[href^="#"]', function(ev) {

            ev.preventDefault();

            var tab = $(this).attr('href');
            if ($(tab).length) {
                tabs.removeClass('current').hide();
                titles.removeClass('current');

                $(tab).addClass('current').show();
                $(this).parent().addClass('current');

                ppwrapper.removeClass().addClass("curr-" + tab.substring(1));
            }
        });

    }

});
