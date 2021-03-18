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

export {toggleClass, createElement}