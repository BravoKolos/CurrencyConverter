const fromCurrDropDown = document.querySelector(".fromCurrSelect")
const toCurrDropDown = document.querySelector(".toCurrSelect")

async function getExchangeRate(apiKey) {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
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
        const codesArray = Object.keys(data.conversion_rates);
      
        populateDropdown(fromCurrDropDown, codesArray);
        populateDropdown(toCurrDropDown, codesArray);
    }
}

initializeDropdowns();