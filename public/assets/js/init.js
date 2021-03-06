(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    $('.slider').slider({
    	full_width: false,
    	interval: 7000,
    });

    $('.dropdown-button').dropdown({
  		inDuration: 300,
  		outDuration: 225,
  		constrain_width: false, // Does not change width of dropdown to that of the activator
  		hover: true, // Activate on hover
      	gutter: 0, // Spacing from edge
  		belowOrigin: true, // Displays dropdown below the button
      }

    );

  }); // end of document ready
})(jQuery); // end of jQuery name space
