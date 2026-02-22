
const form = document.querySelector('form');
 
function displayMessage(msg) {
	document.querySelector('.msg').textContent = msg;
}

function validateCreditCard(number) {
	return number === '1234123412341234';
}

function submitHandler(event) {
	event.preventDefault();
    let errorMessage = "";
	displayMessage('');

    let cardNumber = document.querySelector('#card-nummber');
    const cardNum = cardNumber.value.trim();
    
    //validation checks from form prep assignment
    if (!/^\d{16}$/.test(cardNum)) {
        errorMessage += 'Card number must be 16 digits\n';
    } else if (!validateCreditCard(cardNum)) {
        errorMessage += 'Card number is not valid\n';
    }
    
    const expirationYear = Number(document.querySelector('#year').value);
    const expirationMonth = Number(document.querySelector('#month').value);
    const currentDate = new Date();

    if (2000 + expirationYear < currentDate.getFullYear() || (2000 + expirationYear === currentDate.getFullYear() && expirationMonth <= (currentDate.getMonth()))
    ) {
        errorMessage += 'Card is expired\n';
    }

    if (errorMessage !== '') {
		displayMessage(errorMessage);
		return;
    }

    const page = document.querySelector('body');
    page.innerHTML = `<div class="purchace-msg"><h1>Thanks for shopping with us!</h1><p>Purchace Successful</p></div>`;
}
  
form.addEventListener('submit', submitHandler);