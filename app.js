document.querySelector('#loan-form').addEventListener('submit', calculateResults)


function calculateResults(e) {
  console.log("Calculating...")

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
  } else {
    console.log('Enter Proper numbers!')
  }

  e.preventDefault()
}