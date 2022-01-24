const STORAGE_FILTRO = 'filtroStatus';
const FILTRO_CLASS = 'ergonomission-filtro';

console.log('Ergonomission está rodando nesta pagina!');

chrome.storage.onChanged.addListener(
    (changes, areaName) => {
        areaName === "sync" &&
            STORAGE_FILTRO in changes &&
            handleFilter(changes[STORAGE_FILTRO].newValue);

    }
)

chrome.storage.sync.get(STORAGE_FILTRO,
    (itens) => {
        itens[STORAGE_FILTRO] != undefined &&
            handleFilter(itens[STORAGE_FILTRO])
    }
);

const handleFilter = (status) => {
    let classList = document.body.parentElement.classList;

    if (!status) {
        classList.remove(FILTRO_CLASS);
    } else if (!classList.contains(FILTRO_CLASS)) {
        classList.add(FILTRO_CLASS);
    }

    document.body.parentElement.classList = classList;
}