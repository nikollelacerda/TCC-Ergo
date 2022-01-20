import { POMODORO_DURACAO_PADRAO, POMODORO_INTERVALO_PAUSA, POMODORO_PAUSA_LONGA, POMODORO_TITULO_PADRAO } from "./constants";

export default class Timer{
    time: number = 0;
    duration: number = 0;
    _instance: any;

    /* Events */
    onTick: Function[] = [];
    onStart: Function[] = [];
    onEnd: Function[] = [];
    onFinish: Function[] = [];
    onPause: Function[] = [];

    /* States */
    isPaused: boolean = false;

    constructor() { }

    start(duration: number = 0): void {
        if(this._instance) {
            return;
        }

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

    _tick(): void {
        this._call(this.onTick);
        if (this.time >= this.duration) {
            this.end(true);
        }
        this.time += 1;
    }

    end(finished: boolean = false): void {
        clearInterval(this._instance);
        this._instance = null;
        this.isPaused = false;

        if (finished) {
            this._call(this.onFinish);
            return;
        }
        this._call(this.onEnd);
    }

    pause(): void {
        if (this.isPaused || !this._instance) {
            return;
        }
        this._call(this.onPause);
        clearInterval(this._instance);
        this._instance = undefined;
        this.isPaused = true;
    }

    _call(event: Function[]): void {
        for (let func of event) {
            func.call(this, this);
        }
    }


    getTime() : {
        raw:number,
        hours:number,
        minutes:number,
        seconds:number
    } {
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

    getFormattedTime(): String {
        let time: any = this.getTime();
        for (let v in time) {
            time[v] = ((time[v] / 10 < 1) ? '0' : '') + time[v];
        }
        return `${time.hours} : ${time.minutes} : ${time.seconds}`;
    }
}

export class Pomodoro extends Timer {
    title: String;
    lastBreak: number = 0;
  
    /* Constants */
    SHORT_BREAK: number = POMODORO_INTERVALO_PAUSA;
    LONG_BREAK: number = POMODORO_PAUSA_LONGA;
    BREAK_INTERVAL: number = POMODORO_INTERVALO_PAUSA;
  
    /* Events */
    onBreakStart: Function[] = [];
    onBreakEnd: Function[] = [];
  
    /* States */
    isOnBreak: boolean = false;
  
    constructor(titulo?: String, duration?: number) {
      super();
      this.title = titulo || POMODORO_TITULO_PADRAO;
      this.duration = duration || POMODORO_DURACAO_PADRAO;
  
      /* Defining Events */
      this.onTick.push(this._checkState);
      this.onStart.push(this._pomodoroOnStart);
    }
  
    _checkState(): void {
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
  
    _pomodoroOnStart(): void {
  
      this.lastBreak = 0;
      this.isOnBreak = false;
    }

    static checkForPause(){

    }
  }