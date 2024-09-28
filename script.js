const fromCurrDropDown = document.querySelector(".fromCurrSelect");
const toCurrDropDown = document.querySelector(".toCurrSelect");
const convertButton = document.querySelector(".convertOpt");
const inputAmount = document.querySelector(".amountInput");

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
        option.value = currency;
        option.text = currency;
        dropdown.appendChild(option);
    });
}

async function initializeDropdowns() {
    const data = await getExchangeRate(apiKey);
    if (data && data.conversion_rates) {
        exchangeRates = data.conversion_rates;
        const codesArray = Object.keys(data.conversion_rates);
      
        populateDropdown(fromCurrDropDown, codesArray);
        populateDropdown(toCurrDropDown, codesArray);
    }
}
initializeDropdowns();

function exchangeCurrency() {
    const amount = parseFloat(inputAmount.value); 
    const fromCurrency = fromCurrDropDown.value;
    const toCurrency = toCurrDropDown.value;

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    const convertedAmount = (amount / fromRate) * toRate;

    console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
    alert(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        exchangeCurrency();
    }
});

convertButton.addEventListener("click", exchangeCurrency);