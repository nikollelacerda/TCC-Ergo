import { Component, Injectable, OnInit } from '@angular/core';


@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
})

@Injectable({
  providedIn: 'root'
})
export class PomodoroComponent implements OnInit {
  timerText : String = '';

  constructor(private pomodoro : Pomodoro) {
    pomodoro = new Pomodoro('Pomodoro');

    pomodoro.onTick.push((timer: Timer) => {
      this.timerText = timer.getFormattedTime();
    });

    pomodoro.onBreakStart.push(() => {
      alert('Hora da Pausa!\nDuração: 5min');
    });
    pomodoro.onBreakEnd.push(() => {
      alert('Fim da Pausa! :)')
    });
  }

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
class Timer {
  time : number = 0;
  duration : number = 0;
  _instance : any;

  /* Events */
  onTick   : Function[] = [];
  onStart  : Function[] = [];
  onEnd    : Function[] = [];
  onFinish : Function[] = [];
  onPause  : Function[] = [];

  /* States */
  isPaused : boolean = false;

  constructor() {}

  start(duration : number = 0) : void{
    if (this.isPaused) {
      this.isPaused = false;
    } else {
      if (duration != 0) {
        this.duration = duration;
      }

      this.time = 0;
      this._call(this.onStart);

    }
    this._instance = setInterval(() => { this._tick() }, 1000)

  }

  _tick() : void{
    this._call(this.onTick);
    if (this.time >= this.duration) {
      this.end(true);
    }
    this.time += 1;
  }

  end(finished : boolean = false) : void{
    clearInterval(this._instance);
    this._instance = null;

    if (finished) {
      this._call(this.onFinish);
      return;
    }
    this._call(this.onEnd);
  }

  pause() : void{
    if (this.isPaused) {
      return;
    }
    this._call(this.onPause);
    clearInterval(this._instance);
    this._instance = undefined;
    this.isPaused = true;
  }

  _call(event : Function[]) : void{
    for (let func of event) {
      func.call(this, this);
    }
  }

  getTime() : Object{
    let val = [];
    for (let i = 0; i < 3; i++) {
      val.push(Math.floor(this.time / 60 ** i) % 60);
    }
    return {
      "raw": this.time,
      "hours": val[2],
      "minutes": val[1],
      "seconds": val[0]
    }
  }

  getFormattedTime() : String{
    let time : any  = this.getTime();
    for (let v in time) {
      time[v] = ((time[v] / 10 < 1) ? '0' : '') + time[v];
    }
    return `${time.hours} : ${time.minutes} : ${time.seconds}`;
  }
}

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


