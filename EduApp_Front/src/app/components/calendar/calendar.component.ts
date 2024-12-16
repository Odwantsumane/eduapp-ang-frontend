import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

class dates {
  constructor(public day: string, public month: string, public dayNums: number[]) {}
}

class month {
  constructor(public start: string, public month: string, public numOfdays: number) {}
}

class year {
  constructor(public year: number, public dates: dates, public leap: boolean) {}
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  daysNums:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                            11, 12, 13, 14, 15, 16, 17, 18, 19,
                            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  days:Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // months:Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
  years: Array<year> = [];
  months: Array<month> = [
    {start: "", month: "January", numOfdays: 31}, {start: "", month: "February", numOfdays: 28}, {start: "", month: "March", numOfdays: 31},
    {start: "", month: "April", numOfdays: 30}, {start: "", month: "May", numOfdays: 31}, {start: "", month: "June", numOfdays: 30},
    {start: "", month: "July", numOfdays: 31}, {start: "", month: "August", numOfdays: 31}, {start: "", month: "September", numOfdays: 30},
    {start: "", month: "October", numOfdays: 31}, {start: "", month: "November", numOfdays: 30}, {start: "", month: "December", numOfdays: 31},
  ]
  dates:Array<dates> = []

  today = {
    time: new Date().getTime(),
    day: new Date().getDay(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    date: new Date().getDate(),
    days: new Array<number>
  }

  week1 : Array<number> = [];
  week2 : Array<number> = [];
  week3 : Array<number> = [];
  week4 : Array<number> = [];
  week5 : Array<number> = [];


  constructor() { 
  }

  ngOnInit(): void { 
     
    // console.log(this.days[this.today.day - 1]);
    // console.log(this.months[this.today.month]);
    // console.log(this.today.date);

    this.today.days = this.daysNums.splice(0, this.months[this.today.month].numOfdays-1);
    var j = 0;
    this.today.days.forEach(day => {
      if(day  <= 7){
        this.week1.push(day);
      }
      if(day > 7 && day  <= 14){
        this.week2.push(day);
      }
      if(day > 14 && day  <= 21){
        this.week3.push(day);
      }
      if(day > 21 && day <= 28){
        this.week4.push(day);
      }
      if(j > 28){
        this.week5.push(day);
      }
      j++;
    })

    this.months.forEach(month => { 
      var dayNums = [1, 2, 3, 4, 5, 6, 7, 8, 9,
        11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]; 

      this.dates.push({day: "", month: month.month, dayNums: dayNums.splice(0, month.numOfdays-1)})
    });

    let i = 0;
    this.dates.forEach(date => { 
      var years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
        2018, 2019, 2020, 2021, 2022, 2023, 2024];

        this.years.push({year: years[i], dates: date, leap: false});
        i++;
    }); 
  }


}
