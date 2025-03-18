let connectionMode = false;
let selectedElement = null;
let currentConfigElement = null;
let connections = [];

// Ajoute un équipement
function addEquipment(type) {
    const networkArea = document.getElementById('network-area');
    const equipment = document.createElement('div');
    equipment.className = 'equipment';
    equipment.innerHTML = `<div class="type">${type}</div><div class="info">IP: <br>Masque: </div>`;
    equipment.style.top = `${Math.random() * 400}px`;
    equipment.style.left = `${Math.random() * 700}px`;
    equipment.dataset.type = type;
    equipment.dataset.ip = '';
    equipment.dataset.subnetMask = '';

    equipment.addEventListener('dblclick', () => openConfigPanel(equipment));
    equipment.addEventListener('click', () => selectEquipment(equipment));

    networkArea.appendChild(equipment);
}

// Ouvre le panneau de configuration
function openConfigPanel(element) {
    currentConfigElement = element;
    const configPanel = document.getElementById('config-panel');
    configPanel.classList.remove('hidden');
    document.getElementById('ip-address').value = element.dataset.ip || '';
    document.getElementById('subnet-mask').value = element.dataset.subnetMask || '';
}

// Enregistre la configuration IP et masque de sous-réseau
function saveConfiguration() {
    const ipAddress = document.getElementById('ip-address').value;
    const subnetMask = document.getElementById('subnet-mask').value;

    if (currentConfigElement) {
        currentConfigElement.dataset.ip = ipAddress;
        currentConfigElement.dataset.subnetMask = subnetMask;
        
        // Met à jour le texte d'affichage de l'IP et du masque
        currentConfigElement.querySelector('.info').innerText = `IP : ${ipAddress}\nMasque : ${subnetMask}`;
    }
    closeConfigPanel();
}


// Ferme le panneau de configuration
function closeConfigPanel() {
    document.getElementById('config-panel').classList.add('hidden');
    currentConfigElement = null;
}

// Active/désactive le mode de connexion
function toggleConnectionMode() {
    connectionMode = !connectionMode;
    if (connectionMode) {
        alert('Mode Connexion Activé: Cliquez sur deux équipements pour les connecter.');
    }
}

// Sélectionne un équipement pour la connexion
function selectEquipment(element) {
    if (connectionMode) {
        if (selectedElement) {
            createConnection(selectedElement, element);
            selectedElement = null;
        } else {
            selectedElement = element;
        }
    }
}

// Crée une connexion entre deux équipements
function createConnection(element1, element2) {
    const networkArea = document.getElementById('network-area');
    const line = document.createElement('div');
    line.className = 'connection-line';

    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    const offsetX = networkArea.getBoundingClientRect().left;
    const offsetY = networkArea.getBoundingClientRect().top;

    const x1 = rect1.left + rect1.width / 2 - offsetX;
    const y1 = rect1.top + rect1.height / 2 - offsetY;
    const x2 = rect2.left + rect2.width / 2 - offsetX;
    const y2 = rect2.top + rect2.height / 2 - offsetY;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1);

    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}rad)`;

    // Ajoute un écouteur pour supprimer la ligne au clic
    line.addEventListener('click', () => deleteConnection(line));

    connections.push({ line, element1, element2 });
    networkArea.appendChild(line);
}

// Supprime la connexion
function deleteConnection(line) {
    line.remove();
    connections = connections.filter(connection => connection.line !== line);
}

// Supprime toutes les connexions sélectionnées
function deleteSelectedConnections() {
    connections.forEach(connection => connection.line.remove());
    connections = [];
}
