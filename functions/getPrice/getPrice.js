const axios = require("axios");

exports.handler = function(event, context, callback) {
  const pass = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  // your server-side functionality
  const { CMC_KEY, CMC_ENDPOINT } = process.env;

  axios
    .get(CMC_ENDPOINT, {
      headers: {
        "X-CMC_PRO_API_KEY": CMC_KEY,
        params: {
          start: "1",
          limit: "5000",
          convert: "USD"
        }
      }
    })
    .then(function(response) {
      pass(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
