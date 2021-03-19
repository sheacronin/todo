import enUS from 'date-fns/locale/en-US';

// Helper fns.

function toggleClass(el, cls) {
    // Decide if complete class needs to be removed or added.
    const action = el.classList.contains(cls) ? 'remove' : 'add';
    // Remove/add the class.
    el.classList[action](cls);
}

// Return new element with optional text & class args.
function createElement(tag, txt, cls) {
    const el = document.createElement(tag);
    if (txt) {
        el.textContent = txt;
    }
    if (cls) {
        el.classList.add(cls);
    }
    return el;
}

// date-fns functions
// Create custom relative formatting.
const formatRelativeLocale = {
    lastWeek: "'Last' eeee",
    yesterday: "'Yesterday'",
    today: "'Today'",
    tomorrow: "'Tomorrow'",
    nextWeek: "eeee",
    other: 'MMM do', // Formatted like 'Mar 26th'.
};
// Store custom formatting in locale object.
const locale = {
    ...enUS,
    formatRelative: (token) => formatRelativeLocale[token],
}
// Fn to convert date input to Date obj.
function convertToDate(input) {
    const date = new Date(input + ' 00:00');
    return date;
}

export {toggleClass, createElement, locale, convertToDate}