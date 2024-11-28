/**
 * @author Bit2Me
 * @dev List all cryptocurrencies Bit2Me data in the selected currency
 */
const axios  = require('axios');

const PATH = process.env.END_QUOTES;
const args = process.argv.slice(2);

//! You can change this variable if you want to use USD for example
const DEFAULT = "EUR"
const currency = (args[0]) ? args[0] : DEFAULT;

const marketQuotes = async () => {
    try {
        const ts = Date.now();
        const response = await axios.get(`${process.env.SERVER}${PATH}?currency=${currency}&_=${ts}`,);
        console.log(response.data);
    }
    catch(e) {
        console.error(e.response.data)
        console.log("\n> Send reqId to Bit2Me team to debug it :)")
    }
}

marketQuotes()
