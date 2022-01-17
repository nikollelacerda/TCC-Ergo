import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PomodorosService } from 'src/controllers/pomodoros.service';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import DefaultComponent from 'src/app/utils/default-component';
import PopupDefault from 'src/app/componentes/popup/default';
import Timer from 'src/app/utils/timer';
import { POMODORO_DURACAO_PADRAO, POMODORO_TITULO_PADRAO } from 'src/app/utils/constants';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
})
export class PomodoroComponent extends DefaultComponent implements OnInit {
  
  endFunction = (finished: boolean) => {
    console.log(this.pomodoro.getTime())
    let data = {
      //Completo ou Encerrado
      status: finished ? "C" : "E",
      duracao: this.pomodoro.getTime().seconds,
      titulo: this.pomodoro.title,
      usuario: this.user.uid
    }
    const token = this.cookie.get('token');
    this.subscriptions.push(this.pomodoroService.createPomodoro(data, token).subscribe(
      data => {
        this.popupService.open({content: PopupDefault, data:{title:`Terminou ${this.pomodoro.title}!`, message:`Parabéns você ganhou ${data.pontos} pontos!`}})
      },
      error => {
        console.log(error)
      }
      ));
    }
    
    user: any;
    timerText: String = '';
    private pomodoro: Pomodoro

    hasStarted = false;
    isPaused = false;

    startBtnStatus = false;
    pauseBtnStatus = true;
    endBtnStatus = true;
    setBtnStatus(){
      //Desabilitado -> quando começou
      this.startBtnStatus = this.hasStarted;
      //Desabilitado -> quando pausado ou quando não começou
      this.pauseBtnStatus = this.isPaused || !this.hasStarted;
      //Desabilitado -> quando não começou e não está pausado
      this.endBtnStatus = !this.hasStarted && !this.isPaused;
    }

  constructor(
    private popupService: PopupService,
    private pomodoroService: PomodorosService,
    private cookie: CookieService
  ) {
    super();
    this.pomodoro = new Pomodoro();

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

  ngOnInit(): void {

  }

  pomodoroStart(title: String): void {
    if(this.hasStarted){
      return;
    }

    if (title?.length > 0) {
      this.pomodoro.title = title;
    } else {
      this.pomodoro.title = POMODORO_TITULO_PADRAO;
    }
    this.pomodoro.start();
    this.hasStarted = true;
    this.isPaused = false;
    this.setBtnStatus();
  }

  pomodoroPause(): void {
    if(this.isPaused){
      return;
    }
    this.pomodoro.pause();
    this.hasStarted = false;
    this.isPaused = true;
    this.setBtnStatus();
  }

  pomodoroEnd(): void {
    this.timerText = "Desistiu de " + this.pomodoro.title;
    this.pomodoro.end();
    this.isPaused = false;
    this.hasStarted = false;
    this.setBtnStatus();
  }
}

/* TODO: Botar em arquivo separado */


class Pomodoro extends Timer {
  title: String;
  lastBreak: number = 0;

  /* Constants */
  SHORT_BREAK: number = 5;
  LONG_BREAK: number = 15;
  BREAK_INTERVAL: number = 25;

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
}


