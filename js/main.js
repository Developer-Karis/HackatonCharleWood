const videos = [
    { name: 'payement sans contact' },
    { name: 'reconnaissance faciale' },
    { name: 'empreinte digitale' },
    { name: 'wifi 6' },
    { name: '5G' },
    { name: 'cloud' },
]

const list = document.getElementById('list');

const searchInput = document.getElementById('search');

function setList(group) {
    clearList();
    for (const video of group) {
        const item = document.createElement('a');
        item.setAttribute('href', './pages/' + video.name + '.html');
        item.classList.add('list-group-item');
        const text = document.createTextNode(video.name);
        item.appendChild(text);
        list.appendChild(item);
    }
    if (group.length === 0) {
        setNoResults();
    }
}

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function setNoResults() {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const text = document.createTextNode('Aucun résultat trouvé !');
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else if (value.includes(searchTerm)) {
        return 0;
    }
}

searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(videos.filter(video => {
            return video.name.includes(value);
        }).sort((videoA, videoB) => {
            return getRelevancy(videoB.name, value) - getRelevancy(videoA.name, value);
        }));
    } else {
        clearList();
    }
});