"use strict";

const fetchText = url => fetch(url).then(r => r.text());
const el = document.createElement.bind(document);

function elt(tag, html) {
        const e = el(tag);
        e.innerHTML = html;
        return e;
}

const idsToHTML = ids => ids.split(';').map(i => i ? `https://youtu.be/${i}` : i).reduce((x, y) => `${x}<br>${y}`);

function makeTable(headers, lines) {
        lines = lines.map(e => e.map(c => c == 'y' ? '✅' : c == 'n' ? '❌' : c)
                .map(c => c.startsWith('https://') ? `<a href="${c}">${c}</a>` : c));
        const table = el('table');
        const thead = el('thead');
        const tbody = el('tbody');
        headers.forEach(e => thead.appendChild(elt('th', e)));
        lines.forEach(e => {
                const r = el('tr');
                e.forEach(c => r.appendChild(elt('td', c)));
                tbody.appendChild(r);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
}

const renderTable = (id, headers, lines) => document.getElementById(id).appendChild(makeTable(headers, lines));

async function fetchCsv(url) {
        const raw = await fetchText(url);
        const lines = raw.split(/[\r\n]+/).filter(e => e).map(e => e.split(','));
        const headers = lines.splice(0, 1)[0];
        return [headers, lines];
}

async function downloadCsvTable(id, url) {
        renderTable(id, ...(await fetchCsv(url)));
}
