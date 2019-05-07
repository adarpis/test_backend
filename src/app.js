/*  BIG BIG BAND Software (test)
    Copyright (C) 2019  Adrian Arpi

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

"use strict";

class trip {
  constructor(persons) {
    if (persons > 0) {
      this.persons = persons;
      this.expenses = [];
      return true;
    } else {
      console.log("ERROR: The number of persons should be more or equal than 1");
      return false;
    }
  }
  set expense(val) {
    if (this.expenses.length<this.persons) {
      this.expenses.push(val);
    } else {
      console.log("WARNING: You are trying to insert more expenses than were assigned")
    }
  }
  get rest() {
    return this.calcRest();
  }
  calcRest(){
    let sum = 0;
    for (let val of this.expenses) {
      sum += val
    }
    let avg = sum/this.expenses.length;
    sum = 0;
    for (let val of this.expenses) {
      let diff = avg-val;
      if (diff>0) {
        sum += diff;
      }
    }
    return sum.toFixed(2);
  }
}

var trips = [];
const states = {
  init: 0,
  keybin: 1,
  filein: 2,
  test: 3,
  output: 4,
  default: NaN,
};
var state = states.init;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});
const print_menu = () => {
  console.log(`Menu, digite: 
    1: Ingresar desde teclado 
    2: Leer archivo
    3: Calcular valores a distribuir`);
}
const print_inper = () => {
  console.log('Ingrese numero de personas que viajaron: ');
}

rl.prompt();
print_menu();

const subState_keybin_menu = (opt) => {
  switch (opt) {
    case '1':
      print_inper();
      state = states.keybin;
      break;
    case '2':
      state = states.filein;
      break;
    case '3':
      state = states.output;
      break;
    case 'probar':
      state = states.test;
    case 'salir':
      rl.close();
      break;
    default:
      console.log(`'${opt}': Opcion invalida`);
  }
}

const subStates = {
  init: 0,
  insertExpenses: 1, 
  default: NaN,
};
var subState = subStates.init;

const subState_keybin = (opt) => {
  switch (subState) {
    case subStates.init:
      let num_persons = Number(opt);
      if (num_persons > 0) {
        trips.push(new trip(num_persons));
        subState_keybin.countExp = 0;
        subState = subStates.insertExpenses;
        console.log('Ingrese gastos por cada persona: ');
      } else if (num_persons < 0){
        console.log('Numero de personas debe ser mayor o igual a 0');
      } else {
        state = states.init;
        print_menu();
      }
      break;
    case subStates.insertExpenses:
      if (subState_keybin.countExp < trips[trips.length-1].persons && opt >= 0) {
        trips[trips.length-1].expense = Number(opt);
        subState_keybin.countExp++;
        console.log(`Registrado gasto ${subState_keybin.countExp}`);
        if (subState_keybin.countExp == trips[trips.length-1].persons) {
          print_inper();
          subState = subStates.init;
        }
      }
      break;
    default:
  }
}

rl.on('line', (line) => {
  switch (state) {
    case states.init:
      subState_keybin_menu(line);
      break;
    case states.keybin:
      subState_keybin(line);
      break;
    case states.init:
      break;
    default:
  }
  rl.prompt();
}).on('close', () => {
  console.log('Cerrado!');
  process.exit(0);
});
