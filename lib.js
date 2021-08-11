async function downloadMarkdown(id, url) {
    document.getElementById(id).innerHTML =
        marked((await (await fetch(url)).text()).replaceAll(' y ', ' ✅ ').replaceAll(' n ', ' ❌ '));
}
