// Bit2me logic
const { getEmbedToken, getAuthToken } = require('./embedAuth');

const WebSocket = require("ws")
const ws = new WebSocket(process.env.WSS);

const openWss = async (action = "listen") => {
    ws.addEventListener ('error', err => {
        console.error ('websocket error:', err);
    });
    
    ws.addEventListener ('open', async () => {
        try{
            const embed = await getEmbedToken();
            if(!embed) return ;
            ws.send (JSON.stringify ({ type: 'authenticate', payload: { token: await getAuthToken(embed) }}));
        }
        catch(e){
            console.error(e.response.data);
        }
    });
    
    ws.addEventListener ('message', message => {
        const msg = JSON.parse(message.data);

        if(msg.type === action){
            console.log(`wss message ${action} has arrived correctly. Bye`)
            ws.close();
        }
        //! Uncomment the following line for better debugging of the wss
        // console.log (`websocket message: type: ${msg.type}, id: ${msg.payload.id}, time: ${msg.payload.time}`); 
    });
    
    ws.addEventListener ('close', evt => {
        if (evt.code === 4000) {
            console.log (`Error while authenticating: ${evt.code}/${evt.reason}`);
        }
        else if (evt.code === 4001) {
            console.log (`Error rate limit: ${evt.code}/${evt.reason}`);
        }
    });
}

module.exports = { openWss }