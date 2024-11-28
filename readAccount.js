/**
 * @author Bit2Me
 * @dev Get an account in Bit2Me
 */
const axios  = require('axios');

// Bit2me logic
const { getAuthHeaders } = require('./bit2me_logic/utils');

const PATH = process.env.END_ACCOUNT;

const args = process.argv.slice(2);
const SUBACCOUNT = args[0]

const readAccount = async () => {
    try {
        const response = await axios.get(
            `${process.env.SERVER}${PATH}`,
            getAuthHeaders(PATH, SUBACCOUNT)
        );
        console.log(response.data);
    }
    catch(e) {
        console.error(e.response.data)
        console.log("\n> Send reqId to Bit2Me team to debug it :)")
    }
}

readAccount()
