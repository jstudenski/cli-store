var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var clear = require('clear');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "storeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  displayItems();
});

function displayItems() {

  // create table
  var table = new Table({
      head: ['ID', 'Item', 'Department', 'Price', 'QTY'], colWidths: [5, 15, 15, 7, 5]
  });
   
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    customerPrompt();
  });

}

function customerPrompt() {

  inquirer.prompt([{
      type: "text",
      name: "id",
      message: "What product would you like to buy? (ID)"
    },{      
      type: "text",
      name: "qty",
      message: "Quantity?"
    }])
    .then(function(resp) {
      console.log(resp.id);
      console.log(resp.qty);

      checkStock(resp.id, resp.qty);

      // switch (answer.action) {
      //   case "Find songs by artist":
      //     artistSearch();
      //     break;

      //   case "Find all artists who appear more than once":
      //     multiSearch();
      //     break;

      //   case "Find data within a specific range":
      //     rangeSearch();
      //     break;

      //   case "Search for a specific song":
      //     songSearch();
      //     break;

      //   case "Find artists with a top song and top album in the same year":
      //     songAndAlbumSearch();
      //     break;
      // }
    });
}

function checkStock(id, qty) {
  connection.query("SELECT * FROM products WHERE ?", {item_id: id}, function(err, res) {
    if (err) throw err;

      if(qty > res[0].stock_quantity){
        console.log("NOT ENOUGH AVALIABLE");
        console.log("YOU WANT "+qty);
        console.log("WHEN  "+res[0].stock_quantity+ " ARE AVALIABLE");
      } else {
        console.log("Purchase Made!");
        //console.log("Desired Quantity "+qty);
        //console.log("Avaliable Quantity "+res[0].stock_quantity);
        updateStock(id, res[0].stock_quantity-qty);
      }

    //connection.end();
  });

}

function updateStock(id, newQty) {

    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQty
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      //deleteProduct();
    
  });

}