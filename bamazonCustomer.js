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
        console.log("-----------------------------------------------");
        
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "|" + res[i].product_name + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity);
            console.log("-------------------------------------------");
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
            var correct = false;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id == answer.itemChoice) {
                    console.log(res[i].item_id);
                    correct = true;
                    var product = answer.itemChoice;
                    var id = i;
                    inquirer
                        .prompt({
                            name: "howMany",
                            type: "input",
                            message: "How many of these items do you want?",
                            validate: function (value) {
                                if (isNan(value) == false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }

                        }).then(function (answer) {
                            if ((res[i].stock_quantity - answer.howMany) > 0) {
                                connnection.query("Update products SET stock_quantity='" + (res[id].stock_quantity - answer.howMany) + "' WHERE product_name = '" + product + "'", function (err, res2) {
                                    console.log("Product Purchased!");
                                    displayResults();
                                })
                            } else {
                                console.log("Please enter a valid choice");
                                promptUserChoice(res);
                            }
                        })
                }
            }
        })
    
}

