import { Component, Injectable, OnInit } from '@angular/core';
import Timer from 'src/app/utils/timer';


@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
})

export class PomodoroComponent implements OnInit {
  timerText : String = '';
  private pomodoro : Pomodoro

  constructor() {
    this.pomodoro = new Pomodoro('Pomodoro');

    this.pomodoro.onTick.push((timer: Timer) => {
      this.timerText = timer.getFormattedTime();
    });

    this.pomodoro.onBreakStart.push(() => {
      alert('Hora da Pausa!\nDuração: 5min');
    });
    this.pomodoro.onBreakEnd.push(() => {
      alert('Fim da Pausa! :)')
    });
  }
  data: any;

  ngOnInit(): void {
    
  }
  pomodoroStart(title: String): void {
    if (title.length > 0) {
      this.pomodoro.title = title;
    }
    this.pomodoro.start();
  }

  pomodoroPause(): void{
    this.pomodoro.pause();
  }

  pomodoroEnd(): void{
    this.timerText = "Finished";
    this.pomodoro.end();
  }
}

/* TODO: Botar em arquivo separado */


class Pomodoro extends Timer {
  title : String;
  lastBreak : number = 0;

  /* Constants */
  SHORT_BREAK : number = 5;
  LONG_BREAK : number = 15;
  BREAK_INTERVAL : number = 25;

  /* Events */
  onBreakStart : Function[] = [];
  onBreakEnd   : Function[] = [];

  /* States */
  isOnBreak : boolean = false;

  constructor(titulo : String, duration : number = 120) {
    super();
    this.title = titulo;
    this.duration = duration;

    /* Defining Events */
    this.onTick.push(this._checkState);
    this.onStart.push(this._pomodoroOnStart);
    this.onFinish.push(this._pomodoroOnFinish);
  }

  _checkState() : void{
    if (this.isOnBreak && this.time - this.lastBreak == this.SHORT_BREAK) {
      this.isOnBreak = false;
      this.lastBreak = this.time;
      this._call(this.onBreakEnd);
    }

    if (this.time - this.lastBreak == this.BREAK_INTERVAL) {
      this.isOnBreak = true;
      this.lastBreak = this.time;
      this._call(this.onBreakStart);
    }
  }

  _pomodoroOnStart() : void{
    console.log(`Pomodoro "${this.title}" started!`);
    this.lastBreak = 0;
    this.isOnBreak = false;
  }

  _pomodoroOnFinish() : void{
    console.log(`You finished "${this.title}", congratz!`);
  }
}


