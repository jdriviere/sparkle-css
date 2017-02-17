// ==========================================================
// S3CSS.js FRAMEWORK
// ==========================================================
$(document).ready(function() {
	// This is where all the S3CSS functions are implemented. Most of them will
	// serve to fix problems that occur within the CSS-only framework. This function
	// will load all the S3CSS framework functions.
	navDrop();
	navToggleAction();
    modalAction();
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

// This function fixes navigation by forcing the mobile navigation to disappear
// when the navigation bar reaches Desktop size, when it is already opened.
// function navResizeFix () {} // End of NavResizeFix

// This function controls the S3CSS modal functionality.
function modalAction() {
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
