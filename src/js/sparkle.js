// ==========================================================
// Sparkle.js
// ==========================================================
// This is where all the Sparkle functions are implemented. Most of them will
// serve to fix problems that occur within the CSS-only framework. This function
// will load all the Sparkle framework functions. The Sparkle.js file is REQUIRED
// for the Sparkle Framework to function properly!

// -----------------------------
// MAIN
// -----------------------------
$(document).ready(function() {
	"use strict"; // Do not touch!!

    toggleHamburger();
    toggleMenu();
    // navResizeFix();
    // navDrop();
    modalAction();
    closeMedia();
});

// -----------------------------
// FUNCTIONS
// -----------------------------
// This function sets up the hamburger icon functionality
function toggleHamburger() {
    $('.nav__mobile__icon').click(function() {
        $(this).toggleClass('nav__mobile__icon--active');
    });
} // End of ToggleHamburger

// This function sets up the nav-toggle functionality.
function toggleMenu() {
    $('.nav__mobile__icon').click(function() {
        $('.nav__menu').slideToggle();
    });
} // End of ToggleMenu

// This function fixes the disappearing horizontal navbar menu when resized to desktop screen size.
function navResizeFix () {
    $(window).resize(function() {
        // Fixes disappearing nav when resizing
        if ($(window).width() > 767) {
            $('.nav__menu').css('display', 'flex');
			$('.nav__dropdown').css('display', 'none');
            $('.nav__mobile__icon').removeClass('nav__mobile__icon--active');
        } else {
			$('.nav__menu').css('display', 'none');
            $('.nav__mobile__icon').removeClass('nav__mobile__icon--active');
		} // End of ELSE-IF
    });
} // End of NavResizeFix

// This function sets up the dropdown menu functionality.
// function navDrop() {
//     $('li.nav__menu__item > a:not(:only-child)').click(function(event) {
// 		$(this).siblings($('ul.nav__dropdown')).slideToggle();

//         // Prevents multiple dropdowns to remain open at the same time.
// 		$('ul.nav__dropdown').not($(this).siblings()).hide();
// 		event.stopPropagation();
// 	});

// 	// Hides dropdown when user clicks anywhere within the HTML page.
// 	$('html').click(function() {
// 		$('ul.nav__dropdown').hide();
// 	});
// } // End of NavDrop

// This function controls the modal functionality.
function modalAction () {
    // When user clicks on element to open modal
    $('#modalOpen').click(function() {
        $('.modal').addClass('modal--active');
    });

    // When the user clicks on <span> (x), close the modal
    $('.modal__close').click(function() {
        $('.modal').removeClass('modal--active');
    });

    // When the user presses the ESC button, close the modal
    $(document).keydown(function(event) {
        if (event.keyCode == 27) {
            $('.modal').removeClass('modal--active');
        } // End of IF
    });
} // End of ModalAction

// This function closes the media, if close--button is found
function closeMedia () {
    $('.button--close').click(function() {
       $(this).parent().hide().css('display', 'none');
    });
} // End of CloseMedia
