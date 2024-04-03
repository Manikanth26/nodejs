//import {Vehicle} from "./classtask1"
const Vehicle = require("./classtask1");

class Car extends Vehicle {
    #make;
    constructor(make) {
      super();
      this.#make = make;
    }
    get make() {
      return this.#make;
    }
    honk() {
      console.log("Beep beep!");
    }
  }
  
  let myCar = new Car("Toyota");
  console.log(myCar.make); // "Toyota"
  myCar.accelerate(50);
  console.log(myCar.speed); // 50
  myCar.brake(20);
  console.log(myCar.speed); // 30
  myCar.honk();  // "Beep beep!"
  console.log(myCar._speed); // 30 (protected member)