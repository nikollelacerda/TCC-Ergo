import { Component, OnDestroy, OnInit } from '@angular/core';
import { PomodorosService } from 'src/controllers/pomodoros.service';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import DefaultComponent from 'src/app/utils/default-component';
import PopupDefault from 'src/app/componentes/popup/default';
import Timer, { Pomodoro } from 'src/app/utils/timer';
import { POMODORO_TITULO_PADRAO } from 'src/app/utils/constants';
import { CookieService } from 'ngx-cookie-service';
import * as bg from "src/background";

//TODO: sincronizar titulo
// resetar o pomodoro quando sair
// mover o hasStarted para o timer em si

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
})
export class PomodoroComponent extends DefaultComponent implements OnInit, OnDestroy {

  endFunction = (finished: boolean) => {
    let data = {
      //Completo ou Encerrado
      status: finished ? "C" : "E",
      duracao: this.pomodoro.getTime().seconds,
      titulo: this.pomodoro.title,
      usuario: this.user.uid
    }
    const token = this.cookie.get('token');
    console.log(token)
    this.subscriptions.push(this.pomodoroService.createPomodoro(data, token).subscribe(
      data => {
        this.popupService.open({
          content: PopupDefault,
          data: {
            title: `Terminou ${this.pomodoro.title}!`,
            message: `Parabéns você ganhou ${data.pontos} pontos!`
          }
        });
      },
      error => {
        console.log(error)
      }
    ));
    chrome.storage.sync.set({ [bg.STORAGE_POMODORO]: null });
    chrome.alarms.clearAll();
    chrome.notifications.clear(bg.NOTIFICATION_POMODORO);
    chrome.notifications.clear(bg.NOTIFICATION_POMODORO_END);
    chrome.notifications.clear(bg.NOTIFICATION_POMODORO_BREAK);
  }

  user: any;
  timerText: String = '';
  public pomodoro: Pomodoro
  waitTime: number = 0;

  hasStarted = false;
  isPaused = false;

  startBtnStatus = false;
  pauseBtnStatus = true;
  endBtnStatus = true;
  setBtnStatus() {
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
      this.popupService.open({ content: PopupDefault, data: { title: 'Hora da Pausa!', message: 'Duração de 5 minutos.' } });
    });
    this.pomodoro.onBreakEnd.push(() => {
      this.popupService.open({ content: PopupDefault, data: { title: 'Fim da pausa', message: 'Espero que tenha descansado :)' } });
    });

    this.pomodoro.onEnd.push(() => this.endFunction(false));
    this.pomodoro.onFinish.push(() => this.endFunction(true));

    chrome.storage.sync.get(bg.STORAGE_POMODORO)
      .then((itens) => {
        let pomodoro = itens[bg.STORAGE_POMODORO];
        if (pomodoro) {
          this.pomodoro.title = pomodoro['title'];
          this.pomodoro.duration = pomodoro['duration'];
          this.pomodoro.isPaused = pomodoro['isPaused'];
          this.pomodoro.hasFinished = pomodoro['hasFinished'] || false;

          this.waitTime = pomodoro['waitTime'];
          let timeDif = Date.now() - pomodoro['waitStart'];
          this.pomodoro.time = pomodoro['time'] + timeDif;

          this.pomodoro.hasStarted = !this.pomodoro.hasFinished;
          this.isPaused = this.pomodoro.isPaused;
          this.setBtnStatus();

          if (this.pomodoro.hasFinished) {
            this.pomodoro._call(this.pomodoro.onFinish);
          } else {
            this.pomodoroStart(this.pomodoro.title);
          }

          chrome.alarms.clearAll();
          chrome.notifications.clear(bg.NOTIFICATION_POMODORO);
          chrome.notifications.clear(bg.NOTIFICATION_POMODORO_END);
          chrome.notifications.clear(bg.NOTIFICATION_POMODORO_BREAK);
        }
    })
  }

  ngOnInit(): void {

  }

  override ngOnDestroy(): void {
    clearInterval(this.pomodoro._instance);
    this.pomodoro.isPaused = false;
    this.pomodoro._instance = null;
    if (this.hasStarted) {
      chrome.runtime.sendMessage({ name: bg.MSG_POMODORO, pomodoro: this.pomodoro });
    }
    this.unsubscribeFromAll();
  }

  pomodoroStart(title: String): void {
    if (this.hasStarted) {
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
    if (this.isPaused) {
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

window.onbeforeunload = () => {
  console.log('funciona')
};