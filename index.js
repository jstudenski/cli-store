

for (var i=0; i<10; i++) {
var rand1 = 38//Math.floor((Math.random() * 250) + 1);
var rand2 = 197//Math.floor((Math.random() * 250) + 1);

var color1 = "\x1b[38;5;"+rand1+"m";
var color2 = "\x1b[38;5;"+rand2+"m";

console.log(
  color1+"  _______   ____ "+color2+" ______________  ___  ____"+ '\n' +
  color1+" / ___/ /  /  _/ "+color2+"/ __/_  __/ __ \\/ _ \\/ __/"+ '\n' +
  color1+"/ /__/ /___/ /  "+color2+"_\\ \\  / / / /_/ / , _/ _/ "+ '\n' +
  color1+"\\___/____/___/ "+color2+"/___/ /_/  \\____/_/|_/___/ "+"\x1b[0m");

console.log(rand1);
console.log(rand2);

}










