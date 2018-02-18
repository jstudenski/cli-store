var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var clc = require('cli-color');

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
        "Add New Product"
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
      default:
        console.log("Option Not Defined");
  }

  function viewProducts(){
    console.log("1");

  }

  function lowInventory(){
    //console.log("2");
    var table = new Table({
      head: ['ID', 'Item', 'Department', 'Price', 'QTY'], 
      colWidths: [4, 15, 15, 7, 5],
    });

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
    });


    


  }

  function addInventory(){
    console.log("3");

  }

  function newProduct(){
    console.log("4");

  }  
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


// var items = [];

// var displayItems = function() {

//   var gray = clc.xterm(8);
//   var logo1 = clc.xterm(226);
//   var logo2 = clc.xterm(27);
//   console.log(gray("┌──────────────────────────────────────────────────┐"));
//   console.log(gray("│       "+logo1(" _____     _      ")+logo2(" _____         _   ")+"      │"));
//   console.log(gray("│       "+logo1("|  _  |___| |_ ___")+logo2("|     |___ ___| |_ ")+"      │"));
//   console.log(gray("│       "+logo1("|   __| . | '_| -_")+logo2("| | | | .'|  _|  _|")+"      │"));
//   console.log(gray("│       "+logo1("|__|  |___|_,_|___")+logo2("|_|_|_|__,|_| |_|  ")+"      │"));


//   // create table
//   var table = new Table({
//       head: ['ID', 'Item', 'Department', 'Price', 'QTY'], 
//       colWidths: [4, 15, 15, 7, 5],
//       // chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}
//       chars: { 'top-left': '├' , 'top-right': '┤'}
//   });
   
//   connection.query("SELECT * FROM products", function(err, res) {
//     for (var i = 0; i < res.length; i++) {

//       var item_id = res[i].item_id;
//       var product = res[i].product_name;
//       var department = res[i].department_name;
//       var price = res[i].price; 
//       var qty = res[i].stock_quantity;

//       table.push([item_id, color(department, product), color(department, department), price, qty]);

//       storeItem = {
//         "name":color(department, product),
//         "value":item_id
//       }
//       items.push(storeItem);
//     }

//     console.log(table.toString());
//     //call;
//     //resolve();
//     customerPrompt();
//   });

// }


// function color(department, text) {
//   var msg;//  = clc.xterm(202).bgXterm(236);
//   switch(department) {
//     case 'Pokeballs':
//       msg = clc.xterm(32);
//       break;
//     case 'Potions':
//       msg = clc.xterm(133);
//       break;
//     case 'Item':
//       msg = clc.xterm(40);
//       break; 
//     case 'Medicine':
//       msg = clc.xterm(220);
//       break;  
//     case 'Repellents':
//       msg = clc.xterm(196);
//       break;         
//     default:
//       msg = clc.xterm(231);
//   }
//   return msg(text);

// }



