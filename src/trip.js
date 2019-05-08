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
  
module.exports = trip;