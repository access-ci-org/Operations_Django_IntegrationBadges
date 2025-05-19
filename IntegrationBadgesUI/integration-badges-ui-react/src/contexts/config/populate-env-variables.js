
// Initialise the variables from env if they are not already defined in the window
const variableNames = ["OPERATIONS_API_BASE_URL", "ORGANIZATIONS_API_BASE_URL", "DASHBOARD_BASE_URL"];

if (!window.SETTINGS) {
    window.SETTINGS = {};
}

for (let i = 0; i < variableNames.length; i++) {
    const variableName = variableNames[i];
    if (!window.SETTINGS[variableName]) {
        window.SETTINGS[variableName] = import.meta.env[`VITE_${variableName}`];
    }
}
