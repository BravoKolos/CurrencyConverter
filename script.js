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

codesArray.array.forEach((currency) => {
    const option = document.createElement("option")
    option.value = currency;
    option.text = currency;
    fromCurrDropDown.addEventListener(option);
});