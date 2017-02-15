// ==========================================================
// S3CSS.js FRAMEWORK
// ==========================================================
$(document).ready (function() {
	// This is where all the S3CSS functions are implemented. Most of them will
	// serve to fix problems that occur within the CSS-only framework. This function
	// will load all the S3CSS framework functions.
	navDrop();
	navToggleAction();
});

// -----------------------------
// FUNCTIONS
// -----------------------------
// This function sets up the dropdown menu functionality.
function navDrop() {
	$('nav ul li > a:not(:only-child)').click (function (e) {
		$(this).siblings('.nav-dropdown').toggle();
		// Prevents multiple dropdowns to remain open at the same time.
		$('.nav-dropdown').not($(this).siblings()).hide();
		e.stopPropagation();
	});
	
	// Hides dropdown when user clicks anywhere within the HTML page.
	$('html').click(function() {
		$('.nav-dropdown').hide();
	});
} // End of NavDrop

// This function sets up the nav-toggle functionality.
function navToggleAction() {
	$('#nav-toggle').on('click', function() {
		$(this).toggleClass('active');
	});
} // End of NavToggleAction

// This function fixes navigation by forcing the mobile navigation to disappear
// when the navigation bar reaches Desktop size, when it is already opened.
function navResizeFix () {} // End of NavResizeFix
