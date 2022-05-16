var swiper = new Swiper(".welcome-slider", {
    effect: "fade",
    speed: 900,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});


var caseSlider = new Swiper(".case-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        993: {
            slidesPerView: 4,
            spaceBetween: 22,
        },
    },
});

//badge
window.onscroll = function() {badgeHide()};

function badgeHide() {
    var badges = document.querySelectorAll(".badge");

    for (const badge of badges) {
        var fixed = badge.offsetTop;

        if (window.pageYOffset > fixed) {
            
            badge.classList.add("badge-hide");
        } else {
            badge.classList.remove("badge-hide");
        }
    }
}


//menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-wrap');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', function(event) {
    event.preventDefault();

    menu.classList.toggle('is-active');
    this.classList.toggle('is-active');
    document.body.classList.toggle('body-overflow');
});

//counter animate
const pure = new PureCounter({
    // Setting that can't' be overriden on pre-element
    selector: ".counter", // HTML query selector for spesific element
    
    // Settings that can be overridden on per-element basis, by `data-purecounter-*` attributes:
    start: 0, // Starting number [uint]
    duration: 2, // The time in seconds for the animation to complete [seconds]
    delay: 10, // The delay between each iteration (the default of 10 will produce 100 fps) [miliseconds]
    once: true, // Counting at once or recount when the element in view [boolean]
    pulse: false, // Repeat count for certain time [boolean:false|seconds]
    decimals: 0, // How many decimal places to show. [uint]
    legacy: true, // If this is true it will use the scroll event listener on browsers
    filesizing: false, // This will enable/disable File Size format [boolean]
    currency: false, // This will enable/disable Currency format. Use it for set the symbol too [boolean|char|string]
    formater: "de-DE", // Number toLocaleString locale/formater, by default is "en-US" [string|boolean:false]
    separator: false, // This will enable/disable comma separator for thousands. Use it for set the symbol too [boolean|char|string]
});



//aos
AOS.init({
    duration: 1200,
})

//list-number-dropdown
if(document.querySelector('.list-number__btn')) {
    const dropdownBtn = document.querySelector('.list-number__btn');

    dropdownBtn.addEventListener('click', function(e){
        e.preventDefault();

        let dropdownCont = this.closest('.list-number');
        let dropdown = dropdownCont.querySelector('.list-number-dropdown');

        this.classList.toggle('is-active');
        if (dropdown.style.maxHeight){
            dropdown.style.maxHeight = null;
            dropdown.classList.remove('is-active');
        } else {
            dropdown.style.maxHeight =  dropdown.scrollHeight + "px";
            dropdown.classList.add('is-active');
        } 
    });
}

var aboutSlider = new Swiper(".about-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 0,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1300: {
            slidesPerView: 3,
            spaceBetween: 95,
        },
    },
});

//modal
const modalBtnItems = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const modalsClose = document.querySelectorAll('.modal-close');

for (const modalBtn of modalBtnItems) {
    modalBtn.addEventListener('click', function(event) {
        event.preventDefault();

        for (const modal of modals) {
            modal.classList.remove('is-active');
            overlay.classList.remove('is-active');
            document.body.classList.remove('body-overflow');
        }

        const modalActive = document.getElementById(this.getAttribute('href')); 
        modalActive.classList.add('is-active');
        overlay.classList.add('is-active');
        document.body.classList.add('body-overflow');
    });
}

for (const modalClose of modalsClose) {
    modalClose.addEventListener('click', function(event) {
        event.preventDefault();

        for (const modal of modals) {
            modal.classList.remove('is-active');
            overlay.classList.remove('is-active');
            document.body.classList.remove('body-overflow');
        }
    });
}
//scroll feedback and text
var senseSpeed = 5;
var previousScroll = 0;

$(window).scroll(function(event){
   var scroller = $(this).scrollTop();
   if (scroller-senseSpeed > previousScroll){
      $("a.feedback").filter(':not(:animated)').slideUp();
   } else if (scroller+senseSpeed < previousScroll) {
      $("a.feedback").filter(':not(:animated)').slideDown();
   }
   previousScroll = scroller;

});


