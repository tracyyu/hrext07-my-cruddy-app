$(document).ready(function(){

	// Grab an array of words representing types of business cards
	var RandomCategoralText = [
		'Auto Repair',
		'Home Services',
		'Technology',
		'Accountant',
		'Finance Consultant',
		'Banker',
		'VP Sales',
		'Software Engineer',
		'Corporate Lawyer',
		'Freelancer',
		'Babysitter',
		'Doctor',
		'Interior Designer',
		'Personal Assistant',
		'Taxi Cab',
		'Public Relations',
		'Account Executive',
		'Graphic Designer',
		'Sales Representative',
		'Hair Stylist',
		'Dry Cleaner'
	];

	var nIntervId;


	var generateText = function(){

		// Randommly generate the word in a set Interval
		var randomIndex = Math.floor( Math.random() * RandomCategoralText.length);

		// and display it out on the underline span tag
		return RandomCategoralText[randomIndex];
	}

	var setSpanText = function(str){

		console.log(str);

		$('.generate-text').text(str);
	}


	var displayNextText = function(){
		setSpanText( generateText() );
	}

	var changeText = function() {
      nIntervId = setInterval(displayNextText, 1000);
    }

    var $arrow = $('.next-page');
	var $enterContainer = $('.enter-container');

	changeText();

	// Animation for clicking the right arrow on homepage
    $arrow.on('click', function(){

    	$enterContainer.addClass('slideoutHomePage');
        clearInterval(nIntervId);
        setTimeout(function(){
        	window.location.href ='file:///Users/tracyyu/hrext07/hrext07-my-cruddy-app/index.html';
        } , 250);
    });

});