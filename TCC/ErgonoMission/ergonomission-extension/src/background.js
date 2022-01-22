
/* ********************* */
/* ***** Constants ***** */
/* ********************* */

export const STORAGE_POMODORO = "pom__instance";
export const MSG_POMODORO = "pom_msg";

export const ALARM_POMODORO = "pom_alarm";
export const ALARM_POMODORO_BREAK = "pom_alarm_break";

export const NOTIFICATION_POMODORO = "pom_notification";
export const NOTIFICATION_POMODORO_BREAK = "pom_notification_break";
export const NOTIFICATION_POMODORO_END = "pom_notification_end";

const basicNotificationOptions = {
  iconUrl: "./assets/img/play.png",
  requireInteraction: true,
  priority: 2,
}

/* ****************** */
/* ***** Events ***** */
/* ****************** */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ [STORAGE_POMODORO]: null });
  console.log('Succefully running Ergonomission service-worker!');
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.name === MSG_POMODORO) {
      console.log('Mensagem recebida: ', MSG_POMODORO, '\n', request);
      registerPomodoro(request.pomodoro);
    }
    sendResponse();
  }
);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name == ALARM_POMODORO) {
    pomodoroAlarmHandler();
  }

  if (alarm.name == ALARM_POMODORO_BREAK) {
    chrome.storage.sync.get("pom__notification_time", (time) => {
      let newT = time.pom__notification_time + 1;
      chrome.notifications.update(NOTIFICATION_POMODORO_BREAK, { progress: newT });
      chrome.storage.sync.set({ "pom__notification_time": newT })
    })
  }

});

chrome.notifications.onButtonClicked.addListener((id) => {
  if (id === ALARM_POMODORO_BREAK) {
    chrome.storage.sync.set({"redirect": "alongamentos" }, ()=>{
      chrome.windows.create({ 'url': 'index.html', 'type': 'popup', 'width': 800, 'height': 600 });
    })
  }
});


/* ********************* */
/* ***** Functions ***** */
/* ********************* */

const registerPomodoro = (pomodoro) => {
  const waitTime = 60000 - pomodoro.time % 60000;
  pomodoro.waitTime = waitTime;
  pomodoro.waitStart = Date.now();
  chrome.storage.sync.set({
    [STORAGE_POMODORO]: pomodoro
  }).then(() => {
    chrome.alarms.create(ALARM_POMODORO, { when: Date.now() + waitTime, periodInMinutes: 1 });
    console.log(`Sucesso ao criar alarme para o ciclo ${pomodoro.title}!`);
    chrome.notifications.create(NOTIFICATION_POMODORO, {
      type: "progress",
      title: pomodoro.title,
      message: "Ciclo em andamento...",
      progress: parseInt(pomodoro.time / pomodoro.duration, 10),
      ...basicNotificationOptions
    });
  })
}

const pomodoroAlarmHandler = () => {
  chrome.storage.sync.get([STORAGE_POMODORO])

    .then((itens) => {
      const pomodoro = itens[STORAGE_POMODORO];
      if (pomodoro.waitTime > 0) {
        pomodoro.time += pomodoro.waitTime;
        pomodoro.waitTime = 0;
      } else {
        pomodoro.time += 60 * 1000;
      }
      chrome.notifications.update(NOTIFICATION_POMODORO,
        { progress: parseInt(pomodoro.time / pomodoro.duration, 10) });

      if (pomodoro.time >= pomodoro.duration) {
        pomodoro.hasFinished = true;
        _pomodoroFinish(pomodoro);
      }

      pom_checkState(pomodoro).then(() => {
        chrome.storage.sync.set({ pom__instance: pomodoro });
      });

    });
}

const _pomodoroFinish = (pom) => {
  chrome.alarms.clear(ALARM_POMODORO)

    .then(() => {
      chrome.notifications.create(NOTIFICATION_POMODORO_END, {
        type: "basic",
        title: `Concluiu ${pom.title}!`,
        message: "Parabéns! 🎉👏",
        contextMessage: "Vá ao ErgonoMission para checar seus pontos ganhos.",
        ...basicNotificationOptions,
      });
    });
}

const _pomodoroBreakStart = () => {
  console.log('...Break Started');
  chrome.notifications.create(NOTIFICATION_POMODORO_BREAK, {
    type: "progress",
    title: `Hora da Pausa!`,
    message: "Bom trabalho, agora descanse um pouco 👍",
    contextMessage: "Cheque alguns alongamentos para fazer durante a pausa clicando no botão.",
    buttons: [{
      title: "Ver alongamentos"
    }],
    ...basicNotificationOptions,
  }, () => {
    chrome.storage.sync.set({ "pom__notification_time": 0 }, () => {
      chrome.alarms.create(ALARM_POMODORO_BREAK, { periodInMinutes: 3 / 60 });
    });
  });
};
const _pomodoroBreakEnd = () => {
  console.log('...Break Ended');
  chrome.notifications.create(NOTIFICATION_POMODORO_BREAK, {
    type: "basic",
    title: `Fim da Pausa!`,
    message: "Hora de voltar ao trabalho!",
    requireInteraction: false,
    priority: 2
  });
}


/* ***** Pomodoro ***** */

const pom_checkState = (pom) => {
  console.log('Cheking State...');
  if (pom.isOnBreak && pom.time - pom.lastBreak == pom.SHORT_BREAK) {
    pom.isOnBreak = false;
    pom.lastBreak = pom.time;
    _pomodoroBreakEnd();
  }

  if (pom.time - pom.lastBreak == pom.BREAK_INTERVAL) {
    pom.isOnBreak = true;
    pom.lastBreak = pom.time;
    _pomodoroBreakStart();
  }

  return new Promise((resolve) => {
    resolve(pom);
  });
}