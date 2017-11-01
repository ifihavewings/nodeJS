console.log('business.js-- is --working');
console.log('***************************');
// 轮播图
window.onload = function() {
    var mySwiper = new Swiper ('#swiper1', {
        direction: 'horizontal',
        // loop: true,
        autoplay: 3000,
        // 如果需要分页器
        pagination: '#swiper-pagination1',
        // 如果需要前进后退按钮
        nextButton: '#swiper-button-next1',
        prevButton: '#swiper-button-prev1',
    });  
    setSwiperBackground({
        swiperId :'swiper1',
        bgNum : 4,
        picExt :'jpg',
        aHref:[
            'http://www.baidu.com',
            'http://www.sina.com',
            'http://www.163.com',
            'http://www.qq.com'
        ]
    })
}
    
    /** 轮播图背景设置
 *   {
 *      swiperId : 轮播图id,
 *      bgNum : 轮播单元的数量,
 *      picExt : 图片后缀名如 'jpg',
 *      aHref: 每个轮播单元对应的跳转链接
 *   } 
 **/
function setSwiperBackground (obj) {
    var id = obj.swiperId;
    var n = obj.bgNum + 1;
    for(var i = 1; i<n ; i++) {
        var eqIndex = i-1;
        var bgUrl = 'url(/images/banner' + i + '.'+ obj.picExt +')';
        var aTag = $('#' +id + ' .swiper-slide a').eq(eqIndex);
        aTag.css({'backgroundImage': bgUrl});
        aTag.attr('href',obj.aHref[i]);
    }
}