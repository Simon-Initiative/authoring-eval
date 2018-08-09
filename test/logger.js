var successful = 0;

module.exports = {
    log: function (requestParams, response, context, ee, next) {
        var errs = httpErrors(response);

        if (errs)
            return console.log(errors);
        
        response.body = JSON.parse(response.body);

        if (!(response.body && response.body.length && response.body.length === 16))
            return console.log(`Erroneous response: ${response.body}`);
        
        console.log(++successful + ' successful requests');
    }
};

function httpErrors(http_res) {
    if (typeof http_res === 'undefined' || !http_res.hasOwnProperty('statusCode'))
        return 'Null HTTP Response';
    else if (http_res.statusCode !== 200)
        return "HTTP Status Code '" + http_res.statusCode + "'";
}