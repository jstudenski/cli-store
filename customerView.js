var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "storeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  displayItems();
 // console.log('customerView');
});






function displayItems() {

  // instantiate table
  var table = new Table({
      head: ['ID', 'Item', 'Department', 'Price', 'QTY'], colWidths: [5, 15, 15, 7, 5]
  });
   
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
  });


}





