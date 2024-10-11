const fromCurrDropDown = document.querySelector(".fromCurrSelect");
const toCurrDropDown = document.querySelector(".toCurrSelect");
const convertButton = document.querySelector(".convertOpt");
const inputAmount = document.querySelector(".amountInput");
const cardElement = document.querySelector(".card")
const switchArrows = document.querySelector(".rotateSwitchArrows");

let exchangeRates = {};

async function getExchangeRate(apiKey) {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
getExchangeRate(apiKey);

function populateDropdown(dropdown, codesArray) {
    codesArray.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency.code;
        option.text = `${currency.code} - ${currency.name}`;
        dropdown.appendChild(option);
    });
}


async function initializeDropdowns() {
    const data = await getExchangeRate(apiKey);
    if (data && data.conversion_rates) {
        exchangeRates = data.conversion_rates;
      
        populateDropdown(fromCurrDropDown, codesArray);
        populateDropdown(toCurrDropDown, codesArray);
    }
}
initializeDropdowns();

function exchangeCurrency() {
    const amount = parseFloat(inputAmount.value); 
    const fromCurrency = fromCurrDropDown.value;
    const toCurrency = toCurrDropDown.value;

    let existingAlert = document.querySelector('.alert');
    
    if (isNaN(amount)) {
        if (!existingAlert) {
            const alert = document.createElement("p");
            const alertText = document.createTextNode("Please enter a valid amount");
            alert.appendChild(alertText);
            alert.classList.add('alert');
            cardElement.appendChild(alert);

            setTimeout(() => {
                alert.classList.add('show');
            }, 10);
    
        
        }
        return;
    }
    if (existingAlert) {
        existingAlert.remove();
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    const convertedAmount = (amount / fromRate) * toRate;

    console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
   
    const result = document.createElement("p");
    const resultText = document.createTextNode(`${convertedAmount.toFixed(2)} ${toCurrency}`)
    result.appendChild(resultText);
    result.classList.add('result');
    cardElement.appendChild(result)
    
    setTimeout(() => {
        result.classList.add('show');
    }, 10);
}


document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        exchangeCurrency();
    }
});
convertButton.addEventListener("click", exchangeCurrency);


function rotateArrows() {
    switchArrows.classList.toggle("rotate");
}
switchArrows.addEventListener("click", rotateArrows);

// function to exchange currency after switching using arrows

function exchangeCurrAfterSwitch() {
    const amount = parseFloat(inputAmount.value); 
    const fromCurrency = fromCurrDropDown.value;
    const toCurrency = toCurrDropDown.value;

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    const convertedAmount = (amount / toRate) * fromRate;

    console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${fromCurrency}`);

    const result = document.createElement("p");
    const resultText = document.createTextNode(`${convertedAmount.toFixed(2)} ${fromCurrency}`)
    result.appendChild(resultText);
    result.classList.add('result');
    cardElement.appendChild(result)
    
    setTimeout(() => {
        result.classList.add('show');
    }, 10);
    
}

switchArrows.addEventListener('click', exchangeCurrAfterSwitch)
