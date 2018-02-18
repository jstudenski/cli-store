var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var clear = require('clear');
var clc = require('cli-color');

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



// var totalStyle = clc.xterm(46) // .bgXterm(236); // 
// console.log(totalStyle('Orange text on dark gray background'));

var items = [];

var displayItems = function() {
  //clear();
  // create table
  var table = new Table({
      head: ['ID', 'Item', 'Department', 'Price', 'QTY'], 
      colWidths: [4, 15, 15, 7, 5]
  });
   
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {

      var item_id = res[i].item_id;
      var product = res[i].product_name;
      var department = res[i].department_name;
      var price = res[i].price; 
      var qty = res[i].stock_quantity;

      table.push([item_id, color(department, product), color(department, department), price, qty]);

      storeItem = {
        "name":color(department, product),
        "value":item_id
      }
      items.push(storeItem);
    }

    console.log(table.toString());
    //call;
    //resolve();
    customerPrompt();
  });

}


function color(department, text) {
  var msg;//  = clc.xterm(202).bgXterm(236);
  switch(department) {
    case 'Pokeballs':
      msg = clc.xterm(32);
      break;
    case 'Potions':
      msg = clc.xterm(133);
      break;
    case 'Item':
      msg = clc.xterm(40);
      break; 
    case 'Medicine':
      msg = clc.xterm(220);
      break;  
    case 'Repellents':
      msg = clc.xterm(196);
      break;         
    default:
      msg = clc.xterm(231);
  }
  return msg(text);

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
        console.log("You want "+qty+" "+res[0].product_name+" when only "+res[0].stock_quantity+" are avaliable!");
      } else {

        //console.log("Desired Quantity "+qty);
        //console.log("Avaliable Quantity "+res[0].stock_quantity);
        updateStock(id, res[0].stock_quantity-qty);

        var receipt = new Table({
            head: ['Item', 'Price', 'QTY', 'Total'], 
            colWidths: [15, 7, 5, 7]
        });
        receipt.push([res[0].product_name, res[0].price, qty, res[0].price*qty]);
        console.log(receipt.toString());

        // console.log("Purchase Made!");
        // console.log("Item Cost: "+)
        // console.log("Quantity: "+)
        // console.log("Total Cost: "+());

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
      },{
        item_id: id
      }
    ],
    function(err, res) {
      // console.log("inventory updated!\n");
      console.log("Have a nice day!\n");   
  });

}

function displayCost(id, qty) {


}