/**
 * @author Bit2Me
 * @dev Resource to get embed token
 */
const axios  = require('axios');

// Bit2me logic
const { getAuthHeaders } = require('./utils');

const EMBED = process.env.END_EMBED;
const AUTH = process.env.END_AUTH;

//TODO: Check wss getAuthHeaders logic
const getEmbedToken = async (subaccount, wss = false) => {
    const body = (subaccount) ? { 'userId': subaccount } : {};
    const config = (wss) ? getAuthHeaders(EMBED, subaccount, body) : getAuthHeaders(EMBED, "", body);

    const response = await axios.post(
        `${process.env.SERVER}${EMBED}`,
        body,
        config
    );

    return (response.status !== 200) ? null : response.data.accessToken.token;
}

const getAuthToken = async (accessToken, wss = false) => {
    if(!accessToken) return null;

    const body = {
        "accessToken" : accessToken
    }
    const config = (wss) ? getAuthHeaders(AUTH, subaccount, body) : getAuthHeaders(AUTH, "", body);

    const response = await axios.post(
        `${process.env.SERVER}${AUTH}`,
        body,
        config
    );

    return (response.status !== 200) ? null : response.data.accessToken.token;

}

module.exports = { getEmbedToken, getAuthToken };
