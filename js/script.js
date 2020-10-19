// on dom load focus first input and update color options in tshirts
window.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('#name').focus();
    displayColors('default');
})

// text field utilities

const hideElement = (element) => {
    element.style.display = 'none';
}
// display field function
const showElement = (element) => {
    element.style.display = 'block';
}    

// hide element to begin
hideElement(document.querySelector('#other-title'))

//when job title is changed
document.querySelector('#title').addEventListener('change', (e) => {
    //check if selection === other
    if (e.target.value === 'other'){
        //display other text field
        showElement(e.target.nextElementSibling);
    } else {
        //hide other text field
        hideElement(e.target.nextElementSibling);
    }
});
    
//TSHIRT OPTIONS

//add option for the case of no theme selected
const option = document.createElement('option');
const textNode = document.createTextNode('Please select a T-shirt theme');
option.appendChild(textNode);
option.value = 'pleaseSelect';
option.id = 'empty';
document.querySelector('div#shirt-colors #color').appendChild(option);


const displayColors = (theme) => {
    //gets HTML collection of all option elements
    const options = document.querySelector('div#shirt-colors #color').children;

    // helper function to display Colors
    const displayCorrectColors = (list) => {
        //for all options in list display / else hide
        for (let i = 0; i < options.length; i++){
            if(list.includes(options[i].value)){
                options[i].style.display = 'block';
            } else {
                options[i].style.display = 'none';
            }
             //for all elements with selected attribute remove selected
            if(options[i].hasAttribute('selected')){
                options[i].removeAttribute('selected');
            }
        }
       
        //grab the first color and set attribute to selected
        for (let i = 0; i < options.length; i++){
            if(options[i].style.display === 'block'){
                options[i].setAttribute('selected', true);
                break;
            }
        }
    }

    //conditional for different design value possibilities
    if(theme === "js puns"){
       displayCorrectColors(["cornflowerblue", "darkslategrey", "gold"]);
    }else if (theme === "heart js"){
        displayCorrectColors(["tomato", "steelblue", "dimgrey"]);
    } else {
        displayCorrectColors(['pleaseSelect']);
    }
}

//event listener - on changes to the design select element
document.querySelector('#design').addEventListener('change', e => {
    displayColors(e.target.value);
});




//ACTIVITIES

// document.querySelector('.activities').addEventListener('change', (e) => {
//     if (e.target.parentElement.parentElement === 'fieldset'){
//         console.log('button checked');
//     }
// });

const inputs = document.querySelectorAll('.activities input');

//HELPER FUNCTON returns the day of the week as a string
const getDayOfActivity = (input) => {
    const day = input.getAttribute('data-day-and-time').split(' ')[0];
    return day;
};

//HELPER FUNCTION - reuturns a list of the hours that are active 
//(for example 9am-12pm => [9, 10, 11])
const getActiveHours = (input) => {
    let hoursString = input.getAttribute('data-day-and-time').split(' ')[1];
    const regEx = /(\d+)\w{2}-(\d+)\w{2}/;
    hoursString = hoursString.replace(regEx, '$1 $2');
    const hoursList = hoursString.split(' ');
    //create [9, 10, 11] from ['9', '12']
    const activeHours = [];
    let index = 0;
    for (let i = parseInt(hoursList[0]); i < parseInt(hoursList[1]); i++ ){
        activeHours[index] = i;
        index++;
    }
    return activeHours;
};


//DISPLAY TOTAL COST
const costHTML = `
    <h2>Total Cost: $<span id='totalCost'>0</span></h2>
`;
const activities = document.querySelector('.activities');
activities.insertAdjacentHTML('afterend', costHTML);

// GLOBAL COST variable
let cost = 0;
const totalCost = document.querySelector('#totalCost');

//ADD EVENT LISTENER TO ALL LABELS
for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('change', (e) => {

        //if box is checked, remove checked attribute
        if (e.target.hasAttribute('checked')){
            e.target.removeAttribute('checked');
            //remove from cost
            cost -= parseInt(e.target.getAttribute('data-cost'));
            totalCost.textContent = cost;
        // else if box is unchecked, add checked attribute
        } else {
            e.target.setAttribute('checked', true);
            //add to cost
            cost += parseInt(e.target.getAttribute('data-cost'));
            totalCost.textContent = cost;
        }
        
        //only if date and time exist
        if(e.target.hasAttribute('data-day-and-time')){
             //get day of the week for changed box
            const day = getDayOfActivity(e.target);
            //gets list hours for changed box
            const hoursActive = getActiveHours(e.target);

            //loop through checkboxes and ultimately toggle checkboxes that confilict
            for (let j = 1; j < inputs.length; j++){
                //get iteration input
                const input = inputs[j];
                //skip if iteration and target are the same
                if (input.name === e.target.name){
                    continue;
                }
                //make sure label has a date and time
                if (input.hasAttribute('data-day-and-time')){
                    //if our day match this iterations day
                    if (day === getDayOfActivity(input)){
                        // get ActiveHours for input
                        const labelHours = getActiveHours(input);
                        //if current hours list has any element that is included in input
                        if (hoursActive.some(hour => labelHours.includes(hour))) {
                            //if target is checked 
                            if (e.target.hasAttribute('checked')){
                                //set this input diabled
                                input.setAttribute('disabled', true);
                            }else {
                                //remove disable
                                input.removeAttribute('disabled');
                            }
                        }
                    }
                }
            };
        }
    });
}

//display payments

const creditCardDiv = document.querySelector('#credit-card');
const paypalDiv = document.querySelector('#paypal');
const bitcoinDiv = document.querySelector('#bitcoin'); 

payment.addEventListener('change', e => {
    if (e.target.value === "credit card"){
        creditCardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === "paypal"){
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === "bitcoin"){
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    } else {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    }
});

//default payment settings
payment.value = 'credit card';
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

//disable default option in payment select
payment.firstElementChild.setAttribute('disabled', true);

//event listeners

//validate on keyup
//elements - keyup listeners in text fields - some fields declared in validators.js
const nameField = document.querySelector('#name').addEventListener('keyup', validateNameField);
const emailField = document.querySelector('#mail').addEventListener('keyup', validateEmail);
creditCardField.addEventListener('keyup', validateCreditCard);
zipField.addEventListener('keyup', validateCreditCard);
cvvField.addEventListener('keyup', validateCreditCard);

//validate on checkbox change
//checkbox - node list - declared in validators.js
checkBoxes.forEach(input => {
    input.addEventListener('change', validateCheckBoxes);
});

//final validation
//register button
document.querySelector('button').addEventListener('click', (e) => {
    if( validateNameField(e) &&
        validateEmail(e) &&
        validateCheckBoxes(e) && 
        validateCreditCard(e)) {
            e.preventDefault();
            console.log('successful submit');
            window.location.reload(false); 
        //call validation again to display errors
        } else {
            e.preventDefault();
            validateNameField(e);
            validateEmail(e);
            validateCheckBoxes(e);
            validateCreditCard(e);
        }
});