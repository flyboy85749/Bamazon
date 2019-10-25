const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "l5heLWmUs0j5zE2",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Established");
    displayResults();

});
// connection.end();

let displayResults = function () {

    // query the database and display all the items for the user to pick from
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("Item id: | Product Name: | Department Name: | Price: | Quantity in Stock:");
        console.log("---------------------------------------------------------------------------");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "      |   " + res[i].product_name + " |     " + res[i].department_name + "  |   " + res[i].price + "    |     " + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------");
        }

        // now, we need to know what item they want
        promptUserChoice(res);
    })
}

// this funciton will ask the user the needed questions
let promptUserChoice = function (res) {
    inquirer
        .prompt([{
            name: "itemChoice",
            type: "input",
            message: "What would you like to purchase? (enter item id)"

        }]).then(function (answer) {
            var product;
            var correct = false;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id == answer.itemChoice) {
                    // console.log(res[i].item_id);
                    correct = true;
                    product = res[i];
                    var id = i;
                    // console.log(product);
                    inquirer
                        .prompt({
                            name: "howMany",
                            type: "input",
                            message: "How many of these items do you want?"

                        }).then(function (answer) {
                            let choice;
                            if ((product.stock_quantity - answer.howMany) > 0) {
                                let queryString = "Update products SET stock_quantity='" + (product.stock_quantity - answer.howMany) + "' WHERE product_name ='" + product.product_name + "'"
                                // console.log(queryString);
                                connection.query(queryString, function (err, res2) {
                                    // console.log(err);
                                    console.log("Product Purchased!");
                                    displayResults();
                                    console.log("Your total cost is $" + (product.price * answer.howMany));
                                })
                            } else {
                                console.log("We only have " + product.stock_quantity + " of those available!");
                                promptUserChoice(res);
                            }
                        })
                }
            }
        })

}

