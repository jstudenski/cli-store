var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var clc = require('cli-color');
var clear = require('clear');
var header = require('./tableHeaders.js');


var tableOptions = {
  head: ['ID', 'Item', 'Department', 'Price', 'QTY'], 
  colWidths: [4, 15, 15, 7, 5],
  chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '', 'top-left': '├' , 'top-right': '┤'}
}

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "storeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  managerPrompt();
});

function managerPrompt() {
  inquirer.prompt([
    {
      type: "list",
      message: "Manager Options:",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Remove Product"
      ],
      name: "choice",
    }
  ]).then(function(res) {
    switch(res.choice) {
      case "View Products for Sale":
        viewProducts();
        break;
      case "View Low Inventory":
        lowInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        newProduct();
        break;
      case "Remove Product":
        removeProduct();
        break;
      default:
        console.log("Option Not Defined");
  }



  });
} 


function viewProducts(){
  displayItems();
}

function lowInventory(){
  clear();
  header('low');

  var table = new Table(tableOptions);

  connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      var item_id = res[i].item_id;
      var product = res[i].product_name;
      var department = res[i].department_name;
      var price = res[i].price; 
      var qty = res[i].stock_quantity;

      table.push([item_id, color(department, product), color(department, department), price, qty]);

    // storeItem = {
    //   "name":color(department, product),
    //   "value":item_id
    // }
    // items.push(storeItem);

  }

    console.log(table.toString()); 
    managerPrompt();
  });
}



function addInventory(){
  console.log("3");

}  

function removeProduct(){
  inquirer.prompt([
      {
      type: "text",
      message: "Remove item number:",
      name: "item"
    }
  ]).then(function(res) {
  
    connection.query(
      "DELETE FROM products WHERE ?",
      {
        item_id: res.item
      },
      function(err, res) {
        console.log(res.affectedRows + " products deleted!\n");
        // Call readProducts AFTER the DELETE completes
        managerPrompt();
      }
    );
  });
}

function newProduct(){
  inquirer.prompt([
    {
      type: "text",
      message: "Product name:",
      name: "name"
    },
    {
      type: "list",
      message: "Department:",
      choices: [
        "Pokeballs",
        "Potions",
        "Items",
        "Medicine",
        "Repellents"
      ],
      name: "dept",
    },
    {
      type: "text",
      message: "Price:",
      name: "price"
    },
    {
      type: "text",
      message: "Quantity:",
      name: "qty"
    }
  ]).then(function(res) {

    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('"+res.name+"', '"+res.dept+"', '"+res.price+"', '"+res.qty+"')", function(err, res) {
      managerPrompt();
      //console.log(res.affectedRows + " product added!\n");
    }); 

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
    case 'Items':
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

var displayItems = function() {
  clear();
  header('items');
  var table = new Table(tableOptions);
   
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {

      var item_id = res[i].item_id;
      var product = res[i].product_name;
      var department = res[i].department_name;
      var price = res[i].price; 
      var qty = res[i].stock_quantity;

      table.push([item_id, color(department, product), color(department, department), price, qty]);

      // storeItem = {
      //   "name":color(department, product),
      //   "value":item_id
      // }
      // items.push(storeItem);
    }

    console.log(table.toString());

    managerPrompt();
  });



}

