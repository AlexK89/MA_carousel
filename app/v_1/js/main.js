var img_number = 0
var timer = null
var $images = $(".images").children()
var $images_amount = $images.length - 1

//change_img_number - changing and display chosen image and dot
function change_img_number() {
    if(this.classList.contains("next")) {
        next_img()
    } else {
        previous_img()
    }
}

function next_img() {
    if(img_number < $images_amount) {
        img_number++
    } else {
        img_number = 0
    }
    $(".left_img").css("z-index", -10)
    active_dot()
    show_image()
}

function previous_img() {
    if(img_number > 0) {
        img_number--
    } else {
        img_number = $images_amount
    }
    $(".right_img").css("z-index", -10)

    active_dot()
    show_image()
}

//create_dots - generate dots section
function create_dots() {
    var dot_block = "";
    for(var i = 0; i < $images_amount + 1; i++) {
        dot_block += "<li class=\"dots_navigation\">" +
                        "<a href=\"#\" data-img_number=\""+ i + "\">" +
                        "<img src=\"images/dot.svg\" alt=\"\"></a></li>"
    }
    $(".dots").append(dot_block)
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
    clearTimeout(timer)
    $(".active_img").removeClass("active_img")
    styling_left_right()
    $images.eq(img_number).addClass("active_img").css({
        "left": "0",
        "z-index": "5"
    })
    timer = setTimeout(next_img, 7000)
    left_right_img()
}

/*
* left_right_img -  calculate size of carousel window,
*                   resetting left and right classes, run functions
*                   for positioning images in carousel
*/

function left_right_img() {
    $(".left_img").removeClass("left_img")
    $(".right_img").removeClass("right_img")

    left_img()
    right_img()
    unused_img()
}

function styling_left_right() {
    var $left_right_float = $(window).width() * .6

    $(".left_img").css({
        "left": ($left_right_float * -1),
        "z-index": 0
    })
    $(".right_img").css({
        "left": $left_right_float,
        "z-index": 0
    })
}
/*
*  left_img - adding class to left img and position it
*  @param $left_right_float - width of carousel window
*/
function left_img() {
    if(img_number > 0) {
        $images.eq(img_number - 1).addClass("left_img")
    } else {
        $images.eq($images_amount).addClass("left_img")
    }
    styling_left_right()
}

//right_img - adding class to right img and position it
//@param $left_right_float - width of carousel window
function right_img() {
    if(img_number === $images_amount) {
        $images.eq(0).addClass("right_img")
    } else {
        $images.eq(img_number + 1).addClass("right_img")
    }
    styling_left_right()
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

function chosen_image() {
    $(".left_img").removeClass("left_img")
    $(".active_img").addClass("left_img")
    img_number = parseInt($(this).attr("data-img_number"))
    show_image()
    active_dot()
}

$(".dots").on("click", "a", chosen_image)

document.querySelectorAll(".arrow").forEach(function (item) {
    item.addEventListener("click", change_img_number)
})

document.addEventListener("DOMContentLoaded", function () {
    unused_img()
    create_dots()
    left_right_img()

    timer = setTimeout(next_img, 7000)
})
window.addEventListener("resize", left_right_img);