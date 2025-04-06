let currentRole = '';
let currentRound = 0;

const roleData = {
    'Engineer': [
        '🔧 You manage energy and repairs.',
        'Alert: Power systems are down 20%. What will you do?'
    ],
    'Biologist': [
        '🌱 You manage food and water.',
        'Alert: Crop growth is stunted due to dust storm.'
    ],
    'Communicator': [
        '📡 You manage updates and signals.',
        'Alert: Earth reports possible solar flare. Prepare comms.'
    ],
    'Navigator': [
        '🧭 You handle terrain and rovers.',
        'Alert: Rover battery low and terrain is rocky ahead.'
    ]
};

function selectRole(role) {
    currentRole = role;
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('role-title').textContent = role;
    updateRoleContent();
}

function updateRoleContent() {
    const content = roleData[currentRole][currentRound];
    document.getElementById('role-content').textContent = content;
}

function nextRound() {
    if (currentRound < roleData[currentRole].length - 1) {
        currentRound++;
        updateRoleContent();
    } else {
        document.getElementById('role-content').textContent = '✅ Mission Complete. Well done!';
    }
}
