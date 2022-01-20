
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ instancePomodoro: undefined });
  console.log('Succefully running Ergonomission service-worker!');
});

const registerPomodoro = (pomodoro) => {
  waitTime = (60 - t % 60) * 1000; //Em Milisegundos
  chrome.storage.sync.set({
    pom__instance: pomodoro,
    pom__time: pomodoro.time,
    pom__duration: pomodoro.duration
  }).then(() => {
    chrome.alarms.create("pomodoro", { wait: waitTime, periodInMinutes: 1,  });
    console.log(`Sucesso ao criar alarme para o ciclo ${pomodoro.title}!`);
  })

}

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.sync.get(["pom__time", "pom__duration"], (itens) => {
    itens.pom__time += 60;
    if (itens.pom__time >= itens.pom__duration ){
      itens.elapsedTime = itens.duration;
      chrome.alarms.clear("pomodoro", ()=>{
        chrome.notifications.create("pomodoro", {
          type: "basic",
          title: "Acabou o pomodoro",
          message: "Parabens cara isso ai",
        });
      });
    }
      chrome.storage.sync.set({ elapsedTime: itens.elapsedTime })
  }); */
  console.log('Alarmante!')
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name === "pomodoro"){
      registerPomodoro(request.pomodoro);
    }
    sendResponse();
  }
);
