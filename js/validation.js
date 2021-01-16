//HELPER FUNCTIONS TO CREATE AND HIDE ERROR MESSAGES
//these are called from the validation functions below
//which are in turn called by keyup and submit event listeners in script.js

//create and show error (location,  msg)
const createError = (location, message) => {
	if (!location.previousElementSibling.classList.contains('error-danger')) {
		//create p element
		const errorMessage = document.createElement('p');
		//create and append message and className
		const textNode = document.createTextNode(message);
		errorMessage.appendChild(textNode);
		errorMessage.className = 'error-danger';
		//insert before location given as parameter
		location.parentElement.insertBefore(errorMessage, location);
	}
};

//clear error (location)
const clearError = location => {
	//if element above has class='error-danger'
	if (location.previousElementSibling.classList.contains('error-danger')) {
		location.previousElementSibling.remove();
	}
};

//VALIDATE name - cant be blank, contain numbers, spaces or be greater than 12 characters
const validateNameField = e => {
	// get current name
	const nameField = document.querySelector('#name');

	//validate name
	if (nameField.value === '') {
		clearError(nameField);
		createError(nameField, '* Please enter a name');
		return false;
	}
	if (nameField.value.search(/\d/) != -1) {
		clearError(nameField);
		createError(nameField, '* Name cannot contain numbers');
		return false;
	}
	if (nameField.value.search(/\s/) != -1) {
		clearError(nameField);
		createError(nameField, '* Name cannot contain spaces');
		return false;
	}
	if (nameField.value.length > 12) {
		clearError(nameField);
		createError(nameField, '* Name cannot be more than 12 characters');
		return false;
	} else {
		clearError(nameField);
		return true;
	}
};

//validate email two groups of a-z, -, _ characters separated by one @ symbol.
// followed by a '.' and 2-5 characters
const validateEmail = e => {
	// get current name
	const emailField = document.querySelector('#mail');

	//Email RegExp
	const emailRegExp = /^[\w-_]+@[\w-_]+\.[\w]{3}$/;

	//validate email
	if (emailField.value === '') {
		clearError(emailField);
		createError(emailField, '* Email is empty');
		return false;
	}
	if (!emailRegExp.test(emailField.value)) {
		clearError(emailField);
		createError(emailField, '* Please enter a valid email');
		return false;
	} else {
		clearError(emailField);
		return true;
	}
};

// get all checkbox inputs
const checkBoxes = document.querySelectorAll('.activities input');

//checks that at least one checkbox is checked
const validateCheckBoxes = e => {
	let checked = false;
	//loop through checkboxes and make sure at least one is checked
	checkBoxes.forEach(input => {
		if (input.hasAttribute('checked')) {
			checked = true;
		}
	});

	//validate
	if (checked === false) {
		//create error on the label of firrst checkbox
		createError(checkBoxes.item(0).parentElement, '* Please choose at least one activity');
		return false;
	} else {
		clearError(checkBoxes.item(0).parentElement);
		return true;
	}
};

//only runs if payment is credit card
//checks credit card(13-16 digits), cvv(3 digits) and, zipcode(5 digits)
//runs everytime there is a change in any of the three fields - scripts.js listeners
const creditRegExp = /^\d{13,16}$/;
const zipRegExp = /^\d{5}$/;
const cvvRegExp = /^\d{3}$/;

const creditCardField = document.querySelector('#cc-num');
const zipField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');
const payment = document.querySelector('#payment');

const validateCreditCard = e => {
	if (payment.value === 'credit card') {
		let pass = true;

		// validate cc
		if (!creditRegExp.test(creditCardField.value)) {
			createError(creditCardField, '* Please enter a valid credit card');
			pass = false;
		} else {
			clearError(creditCardField);
		}

		// validate zip
		if (!zipRegExp.test(zipField.value)) {
			createError(zipField, '* Please enter a valid zip');
			pass = false;
		} else {
			clearError(zipField);
		}

		// validate cvv
		if (!cvvRegExp.test(cvvField.value)) {
			createError(cvvField, '* Please enter a valid cvv');
			pass = false;
		} else {
			clearError(cvvField);
		}

		if (pass === true) {
			return true;
		} else {
			return false;
		}
	}
	return true;
};
