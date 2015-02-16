// Kristin Skelton script.js
// This jQuery code controls what is visible on the index.html page.

$(document).ready(function() { 
	
	var popupTimer;

	// Creates the about dialog box. The dialog box will not open until the about-tag is selected.
	$('.about').dialog({
			modal: true,
			autoOpen: false,
			width: 500,
			height: 450			
	});

	//Creates the prices dialog box. This dialog box will not open untl the prices-tag is selected.
	$('.prices').dialog({
			
			modal: true,
			autoOpen: false,
			width: 500,
			height: 450			
	});

	//Creates the confirm dialog box. This dialog box will not open until 10 seconds have gone by after the contact-tag is selected.
	$('#confirm').dialog({
			
			modal: true,
			autoOpen: false,
			buttons: [{
				
				//The Keep Working button resets the timer for the confirm dialog box to display in 10 seconds.
				text: "Keep working",
				click : function() {
					popupTimer = setTimeout(function() {
						$('#confirm').dialog('open');
					}, 10000);
					$(this).dialog('close');}
				},
				{
					//The exit button redirects the page to google.com
					text: "Exit",
					click : function() {
					clearTimeout(popupTimer);
					$(this).dialog('close');
					window.location.href = "https://www.google.com";
				}
			}]
	});

	//Creates the contact dialog box. This dialog box will not display until the contact-tag is selected.
	$('.contactForm').dialog({
			modal: true,
			autoOpen: false,
			width: 600,
			height: 450,
			
			buttons: [{
				//The submit button validates the users entries and displays creates error messages if needed.
				text: "Submit",
				click : function() {					
					//Set valid variable to true. If there is an error with validating 
					//an input, the value will change to false which will prevent the 
					//form from being submitted.
					var isValid = true;

					//Validate that the user entered text into the name input field. Ensure that the length of the name value is not equal to 0.
					if($("#name").val().length == 0) {
						
						//If the name value length is 0, there is no input and an error message will be displayed. 
						$("#nameError").text("This field is required.");
						
						//add class to name input so the border is changed to red
						$("#name").addClass("errorInput");
						
						//IsValid is also set to false so the form is not submitted.
						isValid = false;			
					
					} else {
						//There is no error, so set error message to no text
						$("#nameError").text("");
						
						//Remove border styling in case the form is submitted a second time and the second entry is valid
						$("#name").addClass("noBorder");
					}


					//Validate that the user entered text into the address input field. Ensure that the length of the address value is not equal to 0.
					if($("#address").val().length == 0) {
						
						//If the address value length is 0, there is no input and an error message will be displayed. 
						$("#addressError").text("This field is required.");
						
						//Add class to address input so the border is changed to red
						$("#address").addClass("errorInput");

						//IsValid is also set to false so the form is not submitted.
						isValid = false;
						
					} else {
						
						//There is no error, so set error message to no text
						$("#addressError").text("");
						
						//Remove border styling in case the form is submitted a second time and the second entry is valid
						$("#address").addClass("noBorder");
					}

					//Validate that the user entered text into the email input field. Ensure that the length of the email value is not equal to 0.
					if($("#email").val().length == 0) {
						
						//If the email value length is 0, there is no input and an error message will be displayed. 
						$("#emailError").text("This field is required.");
						
						//Add class to email input so the border is changed to red			
						$("#email").addClass("errorInput");

						//IsValid is also set to false so the form is not submitted.
						isValid = false;
					} 
					//Validate that the user's entry is a valid email address by using the indexOf method to determine the @ symbol is in the string
					else if ($("#email").val().indexOf("@") == -1) {
						
						//If the @ symbol is not part of the string it is not a valid email address and an error message will be displayed. 
						$("#emailError").text("Please enter a valid email address.");
						
						//Add class to email input so the border is changed to red
						$("#email").addClass("errorInput");

						//IsValid is also set to false so the form is not submitted.
						isValid = false;
					} 
					//There is no error, set text to none and remove any error borders
					else {
						$("#emailError").text("");
						$("#email").addClass("noBorder");
					}


					//Validate that the user entered text into the phone input field. Ensure that the length of the phone value is not equal to 0.
					if($("#phone").val().length == 0) {
						
						//If the phone value length is 0, there is no input and an error message will be displayed. 
						$("#phoneError").text("This field is required.");
						
						//Add class to email input so the border is changed to red
						$("#phone").addClass("errorInput");

						//IsValid is also set to false so the form is not submitted.
						isValid = false;
					} 
					//There are no errors
					else {
						$("#phoneError").text("");
					}


					//Declare variables for phone number array. Split the string so each character in the string is it's own array element.
					var phoneData = $("#phone").val();
					var number = phoneData.split("");
					var areaCode = "";
					var firstThreeNumbers = "";
					var lastFourNumbers = "";
					
					//The for loop runs through each element of the number array
					for(var i=0; i < number.length; i++) {
						
						//Store the first three elements in the areaCode string
						if (i < 3) {
							areaCode = areaCode + number[i];
						} 

						//Store the 4th through the 6th element in the firstThreeNumbers string
						else if (i >= 3 && i < 6) {
							firstThreeNumbers = firstThreeNumbers + number[i]; 
							
						} 

						//Store the remaining numbers in the lastFourNumbers string
						else {
							lastFourNumbers = lastFourNumbers + number[i];
							
						}
					}



					//If all elements validated replace the text fields with the user input values and display a thank you message when the form is submitted.
					if(isValid) {
						$("#name").replaceWith($("#name").val());
						$("#address").replaceWith($("#address").val());
						$("#phone").replaceWith("(" + areaCode + ") " + firstThreeNumbers + "-" + lastFourNumbers);
						$("#email").replaceWith($("#email").val());			
						$("#submitMessage").replaceWith(" Thank you for contacting me! I will contact you soon.");
					}

				}
				},
				{
					//The exit button clears the timer so the confirm dialog box will no longer show. It also closes the dialog box.
					text: "Exit",
					click : function() {
					clearTimeout(popupTimer);
					$(this).dialog('close');
				}
			}],
			dialogClass: "noOverlayDialog",
	});

	//When the about-tag is clicked, open the about dialog box.
	$('.about-tag').click(function() {
		$('.about').dialog('open');
		$('.noOverlayDialog').next('div').css( {'opacity':0.0} );
		
	});

	//When the prices-tag is clicked, open the prices dialog box.
	$('.prices-tag').click(function() {
		$('.prices').dialog('open');
		$('.noOverlayDialog').next('div').css( {'opacity':0.0} );
		
	});

	//When the contact-tag is selected, open the contact dialog box and set the timer so that the confirm box will popup after 10 seconds.
	$('.contact-tag').click(function() {
		$('.contactForm').dialog('open');
		$('.noOverlayDialog').next('div').css( {'opacity':0.0} );
		popupTimer = setTimeout(function() {
			$('#confirm').dialog('open');
		}, 10000);
		
		//Creates tooltips for the form elements
		$('#name').tooltip({position: { my: "left+15 center", at: "right center" }});
		$('#address').tooltip({position: { my: "left+15 center", at: "right center" }});
		$('#phone').tooltip({position: { my: "left+15 center", at: "right center" }});
		$('#email').tooltip({position: { my: "left+15 center", at: "right center" }});
		
		//When the user is typing into the phone number input field a red box will be placed around the input field until they reach 10 numbers
		$("#phone").keyup(function() {
			
			if($("#phone").val().length < 10) {
				$("#phone").addClass("errorInput");
			
			} else {
				$("#phone").removeClass("errorInput");
				$("#phone").addClass("addInput");
			}
		});
	});

	

});

