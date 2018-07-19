const request = require('request').defaults({ timeout: 20000 }),
      sample = '{\r\n  \"vars\": [\r\n    {\r\n      \"variable\": \"V1\",\r\n      \"expression\": \"em.random(1,4)\"\r\n    },\r\n    {\r\n      \"variable\": \"V2\",\r\n      \"expression\": \"em.random(3,9)\"\r\n    },\r\n    {\r\n      \"variable\": \"V3\",\r\n      \"expression\": \"em.random(10,15)\"\r\n    },\r\n    {\r\n      \"variable\": \"V4\",\r\n      \"expression\": \"em.random(20,29)\"\r\n    },\r\n    {\r\n      \"variable\": \"V5\",\r\n      \"expression\": \"em.random(18,23)\"\r\n    },\r\n    {\r\n      \"variable\": \"V6\",\r\n      \"expression\": \"em.random(14,18)\"\r\n    },\r\n    {\r\n      \"variable\": \"V7\",\r\n      \"expression\": \"em.random(6,9)\"\r\n    },\r\n    {\r\n      \"variable\": \"V8\",\r\n      \"expression\": \"em.random(3,6)\"\r\n    },\r\n    {\r\n      \"variable\": \"V9\",\r\n      \"expression\": \"em.random(1,3)\"\r\n    },\r\n    {\r\n      \"variable\": \"V10\",\r\n      \"expression\": \"@@V1@@+@@V2@@+@@V3@@+@@V4@@+@@V5@@+@@V6@@+@@V7@@+@@V8@@+@@V9@@\"\r\n    },\r\n    {\r\n      \"variable\": \"V11\",\r\n      \"expression\": \"@@V1@@+2*@@V2@@+3*@@V3@@+4*@@V4@@+5*@@V5@@+6*@@V6@@+7*@@V7@@+8*@@V8@@+9*@@V9@@\"\r\n    },\r\n    {\r\n      \"variable\": \"V12\",\r\n      \"expression\": \"em.round(@@V11@@\\\/@@V10@@)\"\r\n    },\r\n    {\r\n      \"variable\": \"V13\",\r\n      \"expression\": \"em.emJs(a=[[\\\"1\\\",@@V1@@],[\\\"2\\\",@@V2@@], [\\\"3\\\",@@V3@@],[\\\"4\\\",@@V4@@],[\\\"5\\\",@@V5@@],[\\\"6\\\",@@V6@@],[\\\"7\\\",@@V7@@],[\\\"8\\\",@@V8@@],[\\\"9\\\",@@V9@@]];\\nb = a.reduce((p, c) => { for (i=0;i<Number(c[1]);i++) p +=(c[0] + \',\'); return p; }, \\\"\\\"); b = b.substr(0, b.length -1); return \'\\\"\' + b +\\n \'\\\"\';return b;)\"\r\n    },\r\n    {\r\n      \"variable\": \"V14\",\r\n      \"expression\": \"@@V10@@\\\/2\"\r\n    },\r\n    {\r\n      \"variable\": \"V15\",\r\n      \"expression\": \"em.round(@@V14@@,0)\"\r\n    },\r\n    {\r\n      \"variable\": \"V16\",\r\n      \"expression\": \"em.getAV(@@V13@@,@@V15@@)\"\r\n    }\r\n  ]\r\n}',
      sampleLen = 16;

function requestPromise(url, contentType, body) {
    return new Promise((res, err) => {
        request.post({
            url,
            headers: {
                'Content-Type': contentType
            },
            body,
        }, (http_err, http_res, b) => {
            var errs = httpErrors(http_err, http_res, url);
            if (errs) return err(errs);

            b = JSON.parse(b);
            
            if (!(b.length && b.length === sampleLen))
                return err(`Corrupt Response:\n${b.length}\n`);
            
            res(b);
        });
    });
}

function httpErrors(http_err, http_res, url) {
    if (http_err)
        return http_err;
    else if (typeof http_res === 'undefined' || !http_res.hasOwnProperty('statusCode'))
        return 'Null HTTP Response Getting ' + url;
    else if (http_res.statusCode !== 200)
        return "HTTP Status Code '" + http_res.statusCode + "' Getting " + url;
}

function test(n, url) {
    console.log(`Testing at ${url}`);
    var promises = [],
        start = Date.now(),
        completed = 0,
        failed = 0,
        errors = {},
        promise = new Promise((res, err) => {
            var incr = b => () => {
                if (b) completed++; else failed++;
                if (completed + failed === n)
                    res();
            },
                suc = incr(true),
                er = incr(false);
            for (var i = 0; i < n; i++)
                setImmediate(() => promises.push(requestPromise(url, 'application/json', sample).then(suc, e => {
                    if (errors.hasOwnProperty(e))
                        errors[e]++;
                    else
                        errors[e] = 1;
                    er();
                })));
            
            console.log(`Sent ${n} requests, awaiting responses`);
        });
       
    return promise.then(() => {
        console.log(`${completed} successful, ${failed} failed, in ${Date.now() - start} ms`);
        if (Object.keys(errors).length !== 0)
            console.log(errors);
    });
}

test(1000, 'http://app-01.oli.cmu.edu:8000/sandbox'); //execute a production test
// test(1000, 'http://shattrath.oli.cmu.edu:8000/sandbox');  //execute a shattrath test
// test(1000, 'http://dev.local:8000/sandbox'); //execute a local test