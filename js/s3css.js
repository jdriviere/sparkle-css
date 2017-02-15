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
	$('nav ul li > a:not(:only-child)').click(function (e) {
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
	
	document.querySelector('#nav-toggle').addEventListener('click', function() {
		$(this).toggleClass('active');
	});

	$('#nav-toggle').click(function() {
		$('nav ul').slideToggle();
	});
} // End of NavToggleAction

// This function fixes navigation by forcing the mobile navigation to disappear
// when the navigation bar reaches Desktop size, when it is already opened.
function navResizeFix () {} // End of NavResizeFix

// This function controls the S3CSS modal functionality.
function modalAction() {
    // Get the modal
    var modal = document.getElementById('modal-box');

    // Get the <span> element that closes the modal
    var close-btn = document.getElementsByClassName("modal-close");

    // When the user clicks on <span> (x), close the modal
    close-btn.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
