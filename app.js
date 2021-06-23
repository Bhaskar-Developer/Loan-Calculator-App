document.querySelector('#loan-form').addEventListener('submit', (e) => {
  // we will first show the loading gif for 2 seconds. After 2 seconds we will call the calculateResults() method which will remove the loader and then display the result on UI

  //Remove result if present from previous calculations
  document.querySelector('#results').style.display = 'none'

  //show the loader as soon as calculate is clicked
  document.querySelector('#loading').style.display = 'block'

  //calculate results and show them on UI after 2 seconds 
  //we are delaying the calcuateResults function by 2 seconds
  //This function will also remove the loader
  setTimeout(calculateResults, 2000)

  e.preventDefault()
})


function calculateResults(e) {
  //console.log("Calculating...")

  // UI variables

  //Input Variables
  const amount = document.querySelector('#amount')
  const interest = document.querySelector('#interest')
  const years = document.querySelector('#years')

  //OutPut variables
  const monthlyPayment = document.querySelector('#monthly-payment')
  const totalPayment = document.querySelector('#total-payment')
  const totalInterest = document.querySelector('#total-interest')

  //Parsing the UI input variables as Float
  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12

  //calculate monthly payments value
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  //The calculated Monthly payments might be an infinite value.
  //We check if its an infinite value and based on that we calculate and display the the total payment and total interest amount
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2) // show the value with upto 2 decimal places
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
    //remove loader from UI
    document.querySelector('#loading').style.display = 'none'
    //show results on UI
    document.querySelector('#results').style.display = 'block'
  } else {
    //Remove results if present from previous calculation
    document.querySelector('#results').style.display = 'none'
    //show Error on UI
    showError('Please check your inputs!')
  }
}

//Show error to UI
function showError(errorMessage) {
  //We will create a div containing the error message.
  //This div will be shown on UI whenever no or improper inputs are given
  //This error message will dissappear from UI after a time of 2-5 seconds

  //creating div for the error message
  const errorDiv = document.createElement('div')

  //give the errorDiv two bootstrap classes that are used for alerts and errors
  errorDiv.className = 'alert alert-danger'

  //append the error message as a text node to this error div
  errorDiv.appendChild(document.createTextNode(errorMessage))

  //we want to insert this error in the card but just before the header. We first select the card and header and then insert the error div before the heading by using card as the reference parent.

  //this will be the reference parent
  const mainCard = document.querySelector('.card')

  //this will be the element before which we insert the error div
  const heading = document.querySelector('.heading')

  //this function inserts the error div before heading by using the card as the reference parent
  mainCard.insertBefore(errorDiv, heading)

  //Remove loader as soon as error div is shown
  document.querySelector('#loading').style.display = 'none'

  //remove the error div from the UI after 5 seconds
  //this is done by the setTimeout() window method
  setTimeout(removeError, 3000) // 5000 here means 5 sec as 5000ms = 5 sec
}

function removeError() {
  //this line below will remove the error div
  document.querySelector('.alert').remove()
}