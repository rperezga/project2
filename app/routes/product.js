var api_key = 'SEM3244D45AB8B28939534F5126E8135144A';
var api_secret = 'MTgzNjg3ZGQ2YTIyYmQ0MWM3MDUwYmQ4ZWZmYWE0NDA';
var sem3 = require('semantics3-node')(api_key, api_secret);


// Routes
module.exports = function (app) {


  app.get("/search/:data", function (req, res) {
    
    // Build the request
    sem3.products.products_field("search", req.params.data);

    // Run the request
    sem3.products.get_products(
      function (err, products) {
        if (err) {
          console.log("Couldn't execute request: get_products");
          return;
        }
        // View results of the request
        console.log( "Results of request:\n" + JSON.stringify( products ) );

        res.json(products);
      }
    );
  });


};

