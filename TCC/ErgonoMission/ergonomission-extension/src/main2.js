let DOMTimer = document.querySelector('#timer');
let DOMBtns = document.querySelectorAll('button');

class Timer{
    constructor(/*dom = null*/){
        this.time = 0;
        this.duration = null;
        //this.DOM = dom;
        this._instance = null;

        /* Events */
        this.onTick = [];
        this.onStart = [];
        this.onEnd = [];
        this.onFinish = [];
        this.onPause = [];

        /* States */
        this.isPaused = false;
    }

    start(duration=null){
        if(this.isPaused){
            this.isPaused = false;
        } else {
            if(duration){
                this.duration = duration;
            }

            this.time = 0;
            this._call(this.onStart);

        }
        this._instance = setInterval(()=>{this._tick()}, 1000)

    }

    _tick(){
        this._call(this.onTick);
        if(this.time >= this.duration){
            this.end(true);
        }
        this.time+=1;
    }

    end(finished=false){
        clearInterval(this._instance);
        this._instance = null;

        if(finished){
            this._call(this.onFinish);
            return;
        }
        this._call(this.onEnd);
    }

    pause(){
        if(this.isPaused){
            return;
        }
        this._call(this.onPause);
        clearInterval(this._instance);
        this._instance = undefined;
        this.isPaused = true;
    }

    _call(event){
        for(let func of event){
            func.call(this, this);
        }
    }

    getTime(){
        let val = [];
        for(let i = 0; i < 3; i++){
            val.push(Math.floor(this.time / 60**i) % 60);
        }
        return {
            "raw": this.time,
            "hours": val[2],
            "minutes": val[1],
            "seconds": val[0]
        }
    }

    getFormattedTime(){
        let time = this.getTime();
        for(let v in time){
            time[v] = ((time[v] / 10 < 1) ? '0':'') + time[v];
        }
        return `${time.hours} : ${time.minutes} : ${time.seconds}`;
    }
}

class Pomodoro extends Timer{
    constructor(titulo/*, duration*/){
        super();
        this.title = titulo;
        this.duration = 120;
        this.lastBreak = 0;
        
        /* Constants */
        this.SHORT_BREAK = 5;
        this.LONG_BREAK = 15;
        this.BREAK_INTERVAL = 25;

        /* Events */
        this.onTick.push(this._checkState);
        this.onStart.push(this._pomodoroOnStart);
        this.onFinish.push(this._pomodoroOnFinish);
        this.onBreakStart = [];
        this.onBreakEnd = [];

        /* States */
        this.isOnBreak = false;
    }

    _checkState(){
        if(this.isOnBreak && this.time - this.lastBreak == this.SHORT_BREAK){
            this.isOnBreak = false;
            this.lastBreak = this.time;
            this._call(this.onBreakEnd);
        }

        if(this.time - this.lastBreak == this.BREAK_INTERVAL){
            this.isOnBreak = true;
            this.lastBreak = this.time;
            this._call(this.onBreakStart);
        } 
    }

    _pomodoroOnStart(){
        console.log(`Pomodoro "${this.title}" started!`);
        this.lastbreak = 0;
        this.isOnBreak = false;
    }

    _pomodoroOnFinish(){
        console.log(`You finished "${this.title}", congratz!`);
    }
}

/* Configuração dos botoes */

let pomodoro = new Pomodoro('Pomodoro');
pomodoro.onTick.push((timer)=>{
    DOMTimer.innerText = timer.getFormattedTime();
});
pomodoro.onBreakStart.push(()=>{
    alert('Hora da Pausa!\nDuração: 5min');
});
pomodoro.onBreakEnd.push(()=>{
    alert('Fim da Pausa! :)')
});

DOMBtns[0].addEventListener("click", ()=>{
    let title = document.querySelector('input').value;
    if(title.length > 0){
        pomodoro.title = title;
    }
    pomodoro.start();
});

DOMBtns[1].addEventListener("click", ()=>{
    pomodoro.pause();
});

DOMBtns[2].addEventListener("click", ()=>{
    DOMTimer.innerText = "Finished";
    pomodoro.end();
});