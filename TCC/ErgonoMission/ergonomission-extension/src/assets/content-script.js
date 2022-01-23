import {STORAGE_FILTRO} from '../utils/constants';

const FILTRO_CLASS = 'filtro';

console.log('PINTO')

chrome.storage.onChanged.addListener(
    (changes, areaName) => { 
        if(areaName === "sync" && STORAGE_FILTRO in changes){
            handleFilter(changes[STORAGE_FILTRO]);
        }
    }
)

const handleFilter = (status) => {
    let classList = document.body.classList;

    if(!status){
        classList.remove(FILTRO_CLASS);
        return;
    }

    if(classList.contains(FILTRO_CLASS)){
        classList.add(FILTRO_CLASS);
    }
}