import { Component, Injectable, OnInit } from '@angular/core';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import DefaultComponent from 'src/app/utils/default-component';
import Timer from 'src/app/utils/timer';
import { PomodorosService } from 'src/controllers/pomodoros.service';


@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
})

export class PomodoroComponent extends DefaultComponent implements OnInit {
  timerText : String = '';
  private pomodoro : Pomodoro
  endFunction = (finished:boolean) => {
    //this.subscriptions.push(this.pomodoroService.)
  }

  constructor(
    private popupService:PopupService,
    private pomodoroService:PomodorosService
  ) {
    super();
    this.pomodoro = new Pomodoro('Pomodoro');

    this.pomodoro.onTick.push((timer: Timer) => {
      this.timerText = timer.getFormattedTime();
    });

    this.pomodoro.onBreakStart.push(() => {
      this.popupService.open({content: PopupDefault, data:{title:'Hora da Pausa!', message:'Duração de 5 minutos.'}});
    });
    this.pomodoro.onBreakEnd.push(() => {
      this.popupService.open({content: PopupDefault, data:{title:'Fim da pausa', message:'Espero que tenha descansado :)'}});
    });

    this.pomodoro.onEnd.push(()=>this.endFunction(false));
    this.pomodoro.onFinish.push(()=>this.endFunction(true));
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
    this.lastBreak = 0;
    this.isOnBreak = false;
  }
}


