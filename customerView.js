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


  displayItems()//.then();


});

var items = [];

var displayItems = function(){
  clear();
  // create table
  var table = new Table({
      head: ['ID', 'Item', 'Department', 'Price', 'QTY'], 

  // chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
  //        , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
  //        , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
  //        , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  //style: { 'padding-left': 0, 'padding-right': 0 },
      colWidths: [5, 15, 15, 7, 5]
  });
   
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
      storeItem = {
        "name":res[i].product_name,
        "value":res[i].item_id
      }
      items.push(storeItem);
    }

    console.log(table.toString());
    //call;
    resolve();
    //customerPrompt();
  });

}


function customerPrompt() {
  inquirer.prompt([{
    type: "list",
    name: "id",
    message: "What item would you like to buy?",
    choices: items,
  },{      
    type: "text",
    name: "qty",
    message: "Quantity?"
  }])
  .then(function(resp) {
    checkStock(resp.id, resp.qty);
  });
}

function checkStock(id, qty) {
  connection.query("SELECT * FROM products WHERE ?", {item_id: id}, function(err, res) {
    if (err) throw err;
      if(qty > res[0].stock_quantity){ // insufficient qty
        console.log("You wany "+qty+" "+res[0].product_name+" when only "+res[0].stock_quantity+" are avaliable!");
      } else {

        //console.log("Desired Quantity "+qty);
        //console.log("Avaliable Quantity "+res[0].stock_quantity);
        updateStock(id, res[0].stock_quantity-qty);

        console.log("Purchase Made!");
        console.log("Item Cost: "+res[0].price)
        console.log("Quantity: "+qty)
        console.log("Total Cost: "+(res[0].price*qty));

        //displayCost(id, qty);
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
      console.log("inventory updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      //deleteProduct();
    
  });

}

function displayCost(id, qty) {


}