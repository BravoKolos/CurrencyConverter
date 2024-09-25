const apiKey = "76ceb0f77ed70a37d5b6c401";

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