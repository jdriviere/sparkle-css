// ==========================================================
// Sparkle.js FRAMEWORK
// ==========================================================
// This is where all the Sparkle functions are implemented. Most of them will
// serve to fix problems that occur within the CSS-only framework. This function
// will load all the Rum framework functions. The Sparkle.js file is REQUIRED
// for the Sparkle Framework to function properly!

// -----------------------------
// MAIN
// -----------------------------
$(document).ready(function() {
	"use strict"; // Do not touch!!

	navDrop();
	navToggleAction();
    navResizeFix();
    modalAction();

    // Controls for inputs
    $('.form__input').each(function() {
        checkInput($(this));
    });

    $('.form__input').blur(function() {
        checkInput($(this));
    });
});

// -----------------------------
// FUNCTIONS
// -----------------------------
// This function sets up the dropdown menu functionality.
function navDrop() {
    var navdrop = $('li.nav__menu__item > a:not(:only-child)');
	var navdown = $('ul.nav__dropdown');

	navdrop.click(function(event) {
		$(this).siblings(navdown).slideToggle();

        // Prevents multiple dropdowns to remain open at the same time.
		$(navdown).not($(this).siblings()).hide();
		event.stopPropagation();
	});

	// Hides dropdown when user clicks anywhere within the HTML page.
	$('html').click(function() {
		$(navdown).hide();
	});
} // End of NavDrop

// This function sets up the nav-toggle functionality.
function navToggleAction() {
    var navTog = $('#nav__mobile');
    var navUl = $('.nav__menu');

    navTog.click(function() {
        navUl.slideToggle();
    });
} // End of NavToggleAction

// This function fixes the disappearing horizontal navbar menu when resized to desktop screen size.
function navResizeFix () {
    $(window).resize(function() {
		var navUl = $('.nav__menu');
		var dropdown = $('.nav__dropdown');

        if ($(window).width() > 639) {
            navUl.css('display', 'flex');
			dropdown.css('display', 'none');
        } else {
			navUl.css('display', 'none');
		} // End of ELSE-IF
    });
} // End of NavResizeFix

// This function controls the modal functionality.
function modalAction () {
    // When user clicks on element to open modal
    $('#modalOpen').click(function() {
        $('.modal').toggleClass('modal--show');
        console.log('Modal open');
    });

    // When the user clicks on <span> (x), close the modal
    $('.modal__close').click(function() {
        $('.modal').removeClass('modal--show');
    });

    // When the user clicks anywhere outside of the modal, close it
    // $('html').click(function() {
    //     $('.modal').removeClass('modal--show');
    // });
} // End of ModalAction

// This function controls the flow of the form field
function checkInput ($input) {
    // Checking to see if any input have any value
    if ($input.val() != '') {
        $input.addClass('has-value');
    } else {
        $input.removeClass('has-value');
    } // End of IF-ELSE
} // End of FormAction
