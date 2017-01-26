
$.ajaxSetup({ dataType: 'text' });
(function () {
    var lastTime=0;
    if (!window.requestAnimationFrame_1)
        window.requestAnimationFrame_1 = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
} ());


$.fn.attachScrollbar = function (options) {
    var $this = $(this);
    setTimeout(function(){
    var $scrollview = $('.scrollview', $this);
    if ($scrollview.length == 0 && $this.hasClass('scrollview')) {
        $scrollview = $this;
    }
    if ($('.viewport', $scrollview).iScroll) {
        $('.viewport', $scrollview).iScroll(options);
        $scrollview.addClass('native');
    } else {
        $scrollview.tinyscrollbar({ sizethumb: $('.thumb', $scrollview).height(), size: $('.scrollbar', $scrollview).height() });
        setTimeout(function () {
            $scrollview.tinyscrollbar_update();
        }, 10);
    }
    },100);
    return this;
}

$.fn.resetClass = function (className) {
    var $this = $(this)
    $(this).removeClass(className);
    setTimeout(function () {
        $this.addClass(className);
    }, 1);
}
$.fn.setState = function (newState) {
    $(this).removeClass(function (index, css) {
        return (css.match(/\bstate-\S+/g) || []).join(' ');
    }).resetClass('state-' + newState);
}

$.fn.tabs = function (o) {
    var $tab_pages_container = $('>.tab-pages-container', this);
    var $tab_pages = $('>.tab-pages', $tab_pages_container);
    var $tab_links = $('>.tab-links', this);
    var $tab_titles = o.titles || $('>.tab-titles', this);
    var $tab_container = $(this);
    $tab_container.addClass('tab-container');
    var that = this;
    var $scroller;
    this.removeTab = function (index) {
        $('>li:eq(' + (index) + ")", $tab_links).remove();
        $('>ul>li:eq(' + (index) + ")", $tab_titles).remove();
        $('>div:eq(' + (index) + ')', $tab_pages).remove();
        $scroller.refresh();
    }
    var dontSelectTab = false;
    this.selectTab = function (index) {
        scrolling = true;
        $scroller.scrollToPage(0, index, 0);
    }
    var scrolling = false;
    function onScrollEnd() {
        if (!scrolling || app.unloading) return;
        scrolling = false;
        var index = this.currPageY;
        requestAnimationFrame_1(function () {
            try {
                function removeClasses() {
                    $tab_container.removeClass(function (index, css) {
                        return (css.match(/\bactive-tab-\S+/g) || []).join(' ');
                    })
                    $('>div', $tab_pages).removeClass('active');
                    $('>li', $tab_links).removeClass('active');
                    $('>ul>li', $tab_titles).removeClass('active');
                }
                function addClasses() {
                    $tab_container.addClass('active-tab-' + index);
                    $('>li:eq(' + (index) + ")", $tab_links).addClass('active');
                    $('>ul>li:eq(' + (index) + ")", $tab_titles).addClass('active');
                    $('>div:eq(' + (index) + ')', $tab_pages).addClass('active');
                }
                removeClasses()
                addClasses();

                if (o && o.tabchange) {
                    try {
						   if(index==1){
						     $('.text0').css("display","none");
							 $('.text').css("display","block");
						   }else{
							 $('.text').css("display","none");
						     $('.text0').css("display","block");
							 
						   }
						   
                        o.tabchange.call($('>div:eq(' + (index) + ')', $tab_pages).get(0), index);
                    } catch (ex) {
                        alert(ex);
                    }
                    app.footer.buttons.refresh();
                }
            }
            catch (ex) {
            }
        });
    }
    $scroller = $tab_pages_container.iScroll({ snap: true, momentum: false, zoom: false, hideScrollbar: true, vScrollbar: false, onScrollEnd: onScrollEnd, onTouchEnd: onScrollEnd,
        onScrollMove: function () {
            scrolling = true;
        }

    });
    // setTimeout(function () {
    //     $scroller.destroy();
    // }, 100);
    $('>li>a', $tab_links).click(function () {
        if ($(this).closest('li').hasClass('active')) return;
        scrolling = true;
        that.selectTab($(this).parent().index(), false);
    });
    return this;
}

var LANG = {
    tables: { global: {} },
    add: function (tableName, table) {
        if (tableName instanceof Object) {
            LANG.tables.global = $.extend(LANG.tables.global, {}, tableName);
        } else {
            LANG.tables[tableName] = $.extend(LANG.tables[tableName], {}, table);
        }
    }
};

var app = {
    imagesToLoad:[],
    showSignOff: false,
    slides: {
        summarySlideId: "",
        currentSlideId: "",
        load: function () { }
    },
    
    lang: {
        rewire: function (container, table) {
            container = container || document.body;
            $('[data-langid]', container).each(function () {
                var langid = $(this).data('langid');
                var strTable = $(this).closest('[data-lang-table]').data('lang-table') || 'global';
                table = table || LANG.tables[strTable];
                var value = table[langid];
                if (value)
                    $(this).html(value);
            });
        },
        load: function () {
            app.lang.rewire();
        }
    },
    
}

function pageUnload() {
    $('.enable_gpu').removeClass('enable_gpu');
}
function getChildPageNumber()
{
    location.queryString = {};
    location.search.substr(1).split("&").forEach(function (pair) {
        if (pair === "") return;
        var parts = pair.split("=");
        location.queryString[parts[0]] = parts[1] &&
        decodeURIComponent(parts[1].replace(/\+/g, " "));
    });
}



$.fn.initSubTabPages=function(){
    var container=this;
    $('ul.sub-links>li',container).each(function(){
        $(this).click(function(){
            container.selectSubPage($(this).index());
        });
    });
}
$.fn.selectSubPage=function(index){
    $('ul.sub-links>li',this).removeClass('active');
    $('ul.sub-links>li:eq('+index+')',this).addClass('active');
    $('div.sub-pages',this).removeClass().addClass('sub-pages active-subpage-'+index);
}

if ('ontouchmove' in document)
    document.addEventListener('touchmove', function (e) { e.preventDefault(); });



$(window).load(function () {
    // app.slides.summarySlideId='Pristiq_10.00';
    var $footer = $('.body #footer');
    getChildPageNumber();
    app.slides.load();
    app.lang.load();
    $('.sign_off_layer .page_number').text(app.slides.currentSlideId);
    // app.footer.buttons.refresh();
});

window.onerror = function (errorMsg, url, lineNumber) {
    try {
        console.error(errorMsg + "\n" + url + ": " + lineNumber);
    } catch (ex) {
    }
    return false;
}