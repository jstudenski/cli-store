var clc = require('cli-color');

module.exports = function(type) { 

  var gray = clc.xterm(8);
  var logo1 = clc.xterm(226); // yellow
  var logo2 = clc.xterm(27); // blue
  console.log(gray("┌──────────────────────────────────────────────────┐"));

  switch(type) {
    case 'low':
        console.log(gray("│                   "+logo2("LOW INVENTORY")+"                  │"));
        break;
    case 'items':
        console.log(gray("│                   "+logo1("CURRENT STOCK")+"                  │"));
        break;
    // case n:
    //     code block
    //     break;
    default:
        console.log(gray("│       "+logo1(" _____     _      ")+logo2(" _____         _   ")+"      │"));
        console.log(gray("│       "+logo1("|  _  |___| |_ ___")+logo2("|     |___ ___| |_ ")+"      │"));
        console.log(gray("│       "+logo1("|   __| . | '_| -_")+logo2("| | | | .'|  _|  _|")+"      │"));
        console.log(gray("│       "+logo1("|__|  |___|_,_|___")+logo2("|_|_|_|__,|_| |_|  ")+"      │"));
  }
    
 // console.log(type);


};


  //console.log(gray("┌──────────────────────────────────────────────────┐"));



