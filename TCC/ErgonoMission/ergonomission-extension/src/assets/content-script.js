const STORAGE_FILTRO = 'filtroStatus';
const FILTRO_CLASS = 'filtro';

console.log('Ergonomission está rodando nesta pagina!');

chrome.storage.onChanged.addListener(
    (changes, areaName) => {
        console.log(changes, areaName)
        if (areaName === "sync" && changes[STORAGE_FILTRO] != undefined) {
            console.log('matches')
            handleFilter(changes[STORAGE_FILTRO].newValue);
        }
    }
)

chrome.storage.sync.get(STORAGE_FILTRO,
    (itens) => {
        itens[STORAGE_FILTRO] != undefined &&
            handleFilter(itens[STORAGE_FILTRO])
    }
);

const handleFilter = (status) => {
    console.log('Filtro:', status);
    let classList = document.body.classList;

    if (!status) {
        classList.remove(FILTRO_CLASS);
        return;
    }

    if (classList.contains(FILTRO_CLASS)) {
        classList.add(FILTRO_CLASS);
    }
}