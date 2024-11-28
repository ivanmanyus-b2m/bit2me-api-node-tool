/**
 * @author Bit2Me
 * @dev Buy crypto in Bit2Me with your EUR balance
 */
const axios  = require('axios');

// Bit2me logic
const { getAuthHeaders } = require('./bit2me_logic/utils');
const { getPocket } = require('./utils/getPocket');
const { getTx } = require('./utils/getTx');

const PROFORMA_PATH = process.env.END_W_PROFORMA;
const EXECUTE_PROFORMA_PATH = process.env.END_WALLET_TX;

const args = process.argv.slice(2);

if(args.length < 3){
    console.error("Usage: npm run buy <amount> < - | EUR > <crypto> [subaccount-id]. For more information, README.md");
    process.exit(1);
}

const FIATCURRENCY = "EUR"
const AMOUNT = args[0];
const CURRENCY = args[2];
const SUBACCOUNT = args[3];

const retrievePockets = async () => {
    const cryptoPockets = await getPocket(CURRENCY, SUBACCOUNT);
    const fiatPockets = await getPocket(FIATCURRENCY, SUBACCOUNT);

    if(cryptoPockets.length == 0){
        console.error(`No ${CURRENCY} pockets, please use npm run create-pocket ${CURRENCY} <name> [subaccount-id]`)
        process.exit(1);
    }

    if(fiatPockets.length == 0){
        console.error(`No ${FIATCURRENCY} pockets, please use npm run create-pocket ${FIATCURRENCY} <name> [subaccount-id]`)
        process.exit(1);
    }

    return [fiatPockets[0].id, cryptoPockets[0].id]
}


const buy = async () => {
    const withFiat = (args[1] == "-");

    const [origin, destination] = await retrievePockets();

    let proformaBody = {
        "pocket": origin,
        "destination": {
            "pocket": destination,
        },
        "amount": AMOUNT,
        "type": (withFiat) ? "REA" : "SEA",
        "currency": (withFiat) ? CURRENCY : FIATCURRENCY
    };

    try{
        const proformaResponse = await axios.post(
            `${process.env.SERVER}${PROFORMA_PATH}`,
            proformaBody,
            getAuthHeaders(PROFORMA_PATH, SUBACCOUNT, proformaBody)
        );

        if(proformaResponse.data){
            const orderId = proformaResponse.data.id;
            const execBody = {
                "proforma": orderId
            }

            const response = await axios.post(
                `${process.env.SERVER}${EXECUTE_PROFORMA_PATH}`,
                execBody,
                getAuthHeaders(EXECUTE_PROFORMA_PATH, SUBACCOUNT, execBody)
            );

            if (response.data) {
                console.log(await getTx(response.data.id, SUBACCOUNT))
            }
        }
    }catch(e) {
        console.error(e.response.data)
        console.log("\n> Send reqId to Bit2Me team to debug it :)")
    }
}

buy()
