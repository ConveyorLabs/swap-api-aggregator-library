const https = require('https');
const crypto = require('crypto');
const querystring = require('querystring');

export async function buildQueryData(swapData) {
    //Get Header Config Data
    const { api_key, secret_key, passphrase, project } = swapData.headerData;
    const api_config = {
        api_key,
        secret_key,
        passphrase,
        project,
    };

    //Get Content Data
    const getRequestPath = '/api/v5/dex/aggregator/quote';
    const getParams = {
        chainId: swapData.chainId,
        amount: swapData.amount,
        toTokenAddress: swapData.toTokenAddress,
        fromTokenAddress: swapData.fromTokenAddress,
    };

    const { signature, timestamp } = createSignature("GET", getRequestPath, getParams);

    function preHash(timestamp, method, request_path, params) {
        // Create a pre-signature based on strings and parameters
        let query_string = '';
        if (method === 'GET' && params) {
            query_string = '?' + querystring.stringify(params);
        }
        if (method === 'POST' && params) {
            query_string = JSON.stringify(params);
        }
        return timestamp + method + request_path + query_string;
    }

    function sign(message, secret_key) {
        // Use HMAC-SHA256 to sign the pre-signed string
        const hmac = crypto.createHmac('sha256', secret_key);
        hmac.update(message);
        return hmac.digest('base64');
    }

    function createSignature(method, request_path, params) {
        // Get the timestamp in ISO 8601 format
        const timestamp = new Date().toISOString().slice(0, -5) + 'Z';
        // Generate a signature
        const message = preHash(timestamp, method, request_path, params);
        const signature = sign(message, api_config['secret_key']);
        return { signature, timestamp };
    }

    const quaryHeaderData = {
        api_config, signature, timestamp
    }

    return quaryHeaderData;
}
