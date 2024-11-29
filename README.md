# Bit2Me API Tool (BETA)
> **NOTE**: For this quickstart you MUST use NodeJS version > 21.7.3. If you use a previous version, you MUST install dotenv & crypto@1.0.1 (this lib is deprecated and built-in. Recommend: update node version).

> **DISCLAIMER**: This guide is for using Bit2Me Broker, **NOT** Bit2Me PRO. For a _how to use_ of Bit2Me PRO, please check [this documentation](https://api.bit2me.com/trading-spot-rest) and [this repository](https://github.com/bit2me-devs/trading-spot-samples).

> **TIP**: `<>` is for required data, `[]` is for optional data.

## How to use this tool
1. Change `API_KEY` and `SECRET` in `.env` file with yours.
2. Execute `npm i`.

### Currency and market information
- To **get all available currencies** in Bit2Me, with available actions, its networks and withdrawal fees, execute `npm run list-currencies`. This script retrieves all currencies information and may take some time.
    - We strongly recommend that you store the output in a file: `npm run --silent list-currencies > currencies.json`.
- To **get information and currency quotes**, execute `npm run market-quote [currency]`. If `currency` is empty, will return market currencies quotes in EUR. If you want to use USD instead, change line 11 in `./marketQuotes.js`.

### Subaccount management
- To **create a subaccount**:
    1. Change `body` values in `./createSubaccount.js` file.
    2. Execute `npm run create-subaccount`.
        - Successful response example: `{ userId: subaccount-id }`.
- To **set an alias**, execute `npm run set-alias <alias> [subaccount-id]`. If `subaccount-id` is empty, alias will be set to main account.
- To **list subaccounts**, execute `npm run list-subaccounts`.
- To **read an account**, execute `npm run read-account [subaccount-id]`. If `subaccount-id` is empty, will return the main account data.

### KYC
> KYC process for main accounts MUST be passed by Bit2Me UI.

For subaccounts:
- To **pass KYC process**, execute `npm run kyc <subaccount-id>`. After that, you can pass KYC process in our embed solution.

### Credit cards management
- To **add credit card**, execute `npm run add-card [subaccount-id]`. After that, you can add a credit card in the URL you'll see in the response. If `subaccount-id` is empty, credit card will be added for main account.
- To **list credit cards**, execute `npm run list-cards [subaccount-id]`. If `subaccount-id` is empty, will return main account credit cards.

### Pocket management
- To **create pocket**, execute `npm run create-pocket <currency> <name> [subaccount-id]`. If `subaccount-id` is empty, `currency` pocket will be created for main account.
- To **list pockets**, execute `npm run list-pockets [currency] [subaccount-id]`. If `subaccount-id` is empty, pockets list from main account will be returned. If `currency` is empty, will return the whole list of your pockets.
- To **get your balance**, execute `npm run balance [currency] [subaccount-id]`. If `subaccount-id` is empty, balance from main account will be returned. If `currency` is empty, will return the whole balance from your account.

### Deposit EUR
- To **deposit EUR**, execute `npm run deposit-eur <amount> <credit-card-id> [subaccount-id]`. If `subaccount-id` is empty, `credit-card-id` MUST be from main account and EUR will still be deposited into the main account.

### Deposit crypto
- To **deposit crypto**, execute `npm run deposit <crypto> <network> [subaccount-id]`. If `subaccount-id` is empty, will return main account addresses.

### Get transaction information
- To **get a transaction**, execute `npm run read-tx <tx-id> [subaccount-id]`. If `subaccount-id` is empty, `tx-id` will be searched in main account transaction list.
- To **get your transaction list**, execute `npm run list-tx [subaccount-id]`. If `subaccount-id` is empty, will be returned the transaction list of main account.

### Buy crypto
- To **buy crypto**, execute `npm run buy <amount> < - | EUR > <crypto> [subaccount-id]`. If `subaccount-id` is empty, an attempt will be made to buy for the main account. If you want to know all the available `crypto`, you can execute `npm run list-currencies`.
    - You can buy `<amount> <crypto>` or `<amount> EUR <crypto>`. Examples: 
        - I want to buy 0.01 ETH ➙ `npm run buy 0.01 - ETH [subaccount-id]`.
        - I want to buy 5 EUR in ETH ➙ `npm run buy 5 EUR ETH [subaccount-id]`.

### Swap crypto
- To **swap crypto for another crypto**, execute `npm run swap <amount> <crypto-origin> <crypto-destination> [subaccount-id]`. If `subaccount-id` is empty, an attempt will be made to swap `crypto-origin ➙ crypto-destination` for the main account. If you want to know all the available `crypto`, you can execute `npm run list-currencies`.
    - Examples: 
        - I want to swap 0.01 ETH to BTC ➙ `npm run swap 0.01 ETH BTC [subaccount-id]`.
        
### Sell crypto
- To **sell crypto**, execute `npm run sell <amount> <crypto> [subaccount-id]`. If `subaccount-id` is empty, an attempt will be made to sell crypto for the main account.
    - Examples: 
        - I want to sell 0.01 ETH ➙ `npm run sell 0.01 ETH [subaccount-id]`.

### 2FA
> If you want to configure 2FA in main account you MUST use Bit2Me UI.

> **2FA is needed for ANY WITHDRAW operation**

- To **get TOTP code**, execute `npm run get-totp <subaccount-id>`. After that, configure `secret` in your auth app to generate valid 2FA codes.
    - `{ secret: secret-id }`

- To **finish TOTP configuration**, execute `npm use set-2fa <subaccount-id> <TOTP>`.
    - Response example: `{ result: true | false }`

### Withdraw crypto
- To **withdraw crypto**, execute `npm run wd-crypto <amount> <crypto> <network> <address> <TOTP> [subaccount-id]`. If `subaccount-id` is empty, withdraw operation will be executed in main account.

### Withdraw fiat
- To **withdraw fiat to a bank account**, execute `npm run wd-fiat <amount> <TOTP> [subaccount-id]`. Due to console writing lack of security, you need to change `body` in `./withdrawFiat.js`. If `subaccount-id` is empty, fiat withdraw operation will be executed for main account.

### Social-Pay (Soon)

---

_Happy hacking!_
