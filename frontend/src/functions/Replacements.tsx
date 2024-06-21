export function Replace() {
    document.getElementById('loader')!.style.display = 'flex'
    document.getElementById('output')!.style.display = 'none'
    setTimeout(() => {
        document.getElementById('loader')!.style.display = 'none'
        document.getElementById('output')!.style.display = 'flex'
    }, 1000);
}