const waitSeconds = 2;

const axios = require('axios');
const fs = require('fs');


const sleep = ms => new Promise(r => setTimeout(r, ms));

const checkResponseTime = async () => {
    let rawdata = fs.readFileSync('urlList.json');
    const urlList = JSON.parse(rawdata);
    let start, end, response, request;

    while(true) {
        for (let i = 0; i < urlList.length; ++i) {
            request = {
                url: urlList[i],
                method: 'get',
                timeout: 10000
            }
            try {
                start = Date.now();
                await axios(request);
                end = Date.now();
                console.log(`${end - start}ms: ${request.url} [${response.data.length}]`);
            } catch (err) {
                console.log(`Axios Error ${err.message}: cannot fetch ${request.url}`);
            }

            await sleep(waitSeconds * 1000);
        }

        
    }    
}

checkResponseTime();
