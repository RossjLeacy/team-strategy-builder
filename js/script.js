let currentRole = '';
let scenarioIndex = 0;
let score = 0;
let studentResponses = [];

const scenarios = {
    'Engineer': [
        {
            text: "Power systems are down by 20%. What action will you take?",
            choices: ["Redirect power from labs", "Shut down non-essential systems", "Ignore and monitor"],
            effects: [2, 1, -1]
        },
        {
            text: "A dust storm has clogged the solar panels. How do you respond?",
            choices: ["Clean them manually", "Wait it out", "Switch to backup generators"],
            effects: [2, -1, 1]
        }
    ],
    'Biologist': [
        {
            text: "Crop growth is stunted. What’s your plan?",
            choices: ["Re-seed using reserves", "Adjust grow lights", "Use emergency rations"],
            effects: [1, 2, 0]
        },
        {
            text: "Water supply is contaminated. How will you ensure safety?",
            choices: ["Filter and boil", "Use stored water", "Delay water use"],
            effects: [2, 1, -1]
        }
    ],
    'Communicator': [
        {
            text: "Earth reports a solar flare. Communications may fail.",
            choices: ["Boost signal now", "Shut down systems temporarily", "Ignore it"],
            effects: [2, 1, -1]
        },
        {
            text: "Another team is requesting help. How do you respond?",
            choices: ["Send supplies", "Send advice only", "Ignore request"],
            effects: [2, 1, -2]
        }
    ],
    'Navigator': [
        {
            text: "The rover is stuck on a rocky path. What’s your plan?",
            choices: ["Navigate alternate route", "Force through", "Abandon rover"],
            effects: [2, -1, -2]
        },
        {
            text: "New area detected with possible resources. Investigate?",
            choices: ["Yes, scout it", "Send drone", "Ignore"],
            effects: [2, 1, 0]
        }
    ]
};

function selectRole(role) {
    currentRole = role;
    document.getElementById("role-selection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("role-title").textContent = role;
    loadScenario();
}

function loadScenario() {
    const currentScenario = scenarios[currentRole][scenarioIndex];
    document.getElementById("scenario-text").textContent = currentScenario.text;
    document.getElementById("choices").innerHTML = "";

    currentScenario.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => makeChoice(index);
        document.getElementById("choices").appendChild(btn);
    });

    document.getElementById("student-response").value = "";
}

function makeChoice(index) {
    const effect = scenarios[currentRole][scenarioIndex].effects[index];
    score += effect;
}

function nextScenario() {
    const response = document.getElementById("student-response").value;
    studentResponses.push({
        round: scenarioIndex + 1,
        response: response
    });

    scenarioIndex++;
    if (scenarioIndex < scenarios[currentRole].length) {
        loadScenario();
    } else {
        showSummary();
    }
}

function showSummary() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("mission-complete").style.display = "block";

    let summaryHTML = `<p>Your score: <strong>${score}</strong></p>`;
    summaryHTML += "<h3>Your Reflections:</h3><ul>";
    studentResponses.forEach((entry) => {
        summaryHTML += `<li><strong>Round ${entry.round}:</strong> ${entry.response}</li>`;
    });
    summaryHTML += "</ul>";

    document.getElementById("summary").innerHTML = summaryHTML;
}
