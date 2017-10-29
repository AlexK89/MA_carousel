var img_number = 0;
var $images = $(".images").children()
var $images_amount = $images.length - 1

//change_img_number - changing and display chosen image and dot
function change_img_number() {
    if(this.classList.contains("next")) {
        if(img_number < $images_amount) {
            img_number++
        } else {
            img_number = 0
        }
        $(".left_img").css("z-index", -10)
    } else {
        if(img_number > 0) {
            img_number--
        } else {
            img_number = $images_amount
        }
        $(".right_img").css("z-index", -10)
    }
    active_dot()
    show_image()
}

//create_dots - generate dots section
function create_dots() {
    var dot_block = "<li class=\"dots_navigation\">"
    dot_block += "<a href=\"#\"><img src=\"images/dot.svg\" alt=\"\"></a>"
    dot_block += "</li>"

    for(var i = 0; i < $images_amount + 1; i++) {
        $(".dots").append(dot_block)
    }
    $('.dots_navigation').eq(0).addClass("active")
}

//active_dot - change styling for chosen dot
function active_dot() {
    var $dot_item = $('.dots_navigation')

    $(".active").removeClass("active")
    $dot_item.eq(img_number).addClass("active")
}

//show_image - display chosen image
function show_image() {
    $(".active_img").removeClass("active_img")
    $images.eq(img_number).addClass("active_img").css({
        "left": "0",
        "z-index": "5"
    })
    left_right_img()
}

/*
* left_right_img -  calculate size of carousel window,
*                   resetting left and right classes, run functions
*                   for positioning images in carousel
*/

function left_right_img() {
    var $left_right_float = $(window).width() * .6

    $(".left_img").removeClass("left_img")
    $(".right_img").removeClass("right_img")

    left_img($left_right_float)
    right_img($left_right_float)
    unused_img()
}


/*
*  left_img - adding class to left img and position it
*  @param $left_right_float - width of carousel window
*/
function left_img($left_right_float) {
    if(img_number > 0) {
        $images.eq(img_number - 1).addClass("left_img")
    } else {
        $images.eq($images_amount).addClass("left_img")
    }
    $(".left_img").css("left", ($left_right_float * -1))
}

//right_img - adding class to right img and position it
//@param $left_right_float - width of carousel window
function right_img($left_right_float) {
    if(img_number === $images_amount) {
        $images.eq(0).addClass("right_img")
    } else {
        $images.eq(img_number + 1).addClass("right_img")
    }
    $(".right_img").css("left", $left_right_float)
}

//unused_img - hide unused images in carousel
function unused_img() {
    $images.each(function (item) {
        var $img = $($images[item])
        if(!($img.hasClass("right_img") || $img.hasClass("left_img") || $img.hasClass("active_img"))) {
            $img.css("display", "none")
        } else {
            $img.css("display", "block")
        }
    })
}

document.querySelector(".next").addEventListener("click", change_img_number)
document.querySelector(".back").addEventListener("click", change_img_number)
document.addEventListener("DOMContentLoaded", function () {
    unused_img()
    create_dots()
    left_right_img()
})
window.addEventListener("resize", left_right_img);