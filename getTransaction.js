/**
 * @author Bit2Me
 * @dev Get transactions list or an specific transaction in Bit2Me
 */

// Bit2me logic
const { getTx } = require('./utils/getTx')

const args = process.argv.slice(2);

const SUBACCOUNT = args[1]

const getTransaction= async () => {
    console.log(await getTx(args[0], SUBACCOUNT))
}

getTransaction()