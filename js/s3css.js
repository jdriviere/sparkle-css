// ==========================================================
// S3CSS.js FRAMEWORK
// ==========================================================
$(document).ready(function() {
	// This is where all the S3CSS functions are implemented. Most of them will
	// serve to fix problems that occur within the CSS-only framework. This function
	// will load all the S3CSS framework functions.
	"use strict"; // Do not touch!!

	navClass();
	navDrop();
	navToggleAction();
    // navResizeFix();
    modalAction();
	menuToggle();
	vertMenu();
});

// -----------------------------
// FUNCTIONS
// -----------------------------
// This function sets up the dropdown menu functionality.
function navDrop() {
    var navdrop = $('nav li > a:not(:only-child)');

	navdrop.click(function(event) {
		$(this).siblings('.nav-dropdown').slideToggle();

        // Prevents multiple dropdowns to remain open at the same time.
		$('.nav-dropdown').not($(this).siblings()).hide();
		event.stopPropagation();
	});

	// Hides dropdown when user clicks anywhere within the HTML page.
	$('html').click(function() {
		$('.nav-dropdown').hide();
	});
} // End of NavDrop

// This function sets up the nav-toggle functionality.
function navToggleAction() {
    var navTog = $('#nav-toggle');
    var navUl = $('nav ul');

    navTog.click(function() {
        navUl.toggle();
    });
} // End of NavToggleAction

// This function fixes the disappearing navbar menu when resized to desktop.
// function navResizeFix () {
//     $(window).resize(function() {
//         if ($(window).width() > 640) {
//             $('nav ul').removeAttr('style');
//         }
//     });
// } // End of NavResizeFix

// This function controls the S3CSS modal functionality.
function modalAction () {
    // Get the modal
    var modal = $('#modal-box');

    // Get the <span> element that closes the modal
    var closeBtn = $('.modal-close');

    // When the user clicks on <span> (x), close the modal
    closeBtn.click(function() {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
} // End of ModalAction

function menuToggle () {
	var menuIcons = $('.s3css-menu-icon');

	for (var i = menuIcons.length - 1; i >= 0; i--) {
		var toggle = menuIcons[i];
		toggleHandler(toggle);
	}
} // End of MenuToggle

function toggleHandler (toggle) {
	var vert_menu = $('.vert-menu');
	var menu_icon = $('s3css-menu-icon');

	toggle.addEventListener("click", function(e) {
		e.preventDefault();
		(this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');

		vert_menu.toggleClass('show-menu');
	});
} // End of ToggleHandler

// This function controls the functionality of the vertical navigation bar,
// more precisely when a list item that has children is clicked: it controls
// the behavior of the submenu.
function vertMenu () {
	var vert_menu = $('.vert-menu li a:not(:only-child)');
	var vert_submenu = $('.vert-menu ul ul');

	vert_menu.click(function(event) {
		$(this).siblings(vert_submenu).toggle();

        // Prevents multiple dropdowns to remain open at the same time.
		$(vert_submenu).not($(this).siblings()).hide();
		event.stopPropagation();
	});

	// Hides dropdown when user clicks anywhere within the HTML page.
	$('html').click(function() {
		$(vert_submenu).hide();
	});
} // End of VertMenu

This function checks whether or not the nav class has the 'default' or
'dark' class, and fixes the links' color
function navClass() {
	var nav = $('.nav, nav');
	var brand = $('nav-brand a');
	var links = $('nav ul li a, nav.nav ul li a');

	// Check if nav has the proper class
	if (nav.hasClass('nav-default')) {
		brand.css('color', '#AAB2BD !important');
		links.css('color', '#AAB2BD');
	} else if (nav.hasClass('nav-dark')) {
		brand.css('color','#999 !important');
		links.css('color', '#999');
	} // End of IF-ELSE
} // End of NavClass
