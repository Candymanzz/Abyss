const heartbeat = document.getElementById('heartbeat');
const muteButton = document.getElementById('muteButton');

let isMuted = false;

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    heartbeat.muted = isMuted;
    muteButton.textContent = isMuted ? 'Unmute Heartbeat' : 'Mute Heartbeat';
});

window.addEventListener('DOMContentLoaded', () => {
    heartbeat.volume = 0.35;
    const playPromise = heartbeat.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => {
            document.body.addEventListener('click', () => heartbeat.play(), { once: true });
        });
    }
});

let lastClick = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
document.addEventListener('click', (e) => {
    lastClick = { x: e.clientX, y: e.clientY };
});

document.getElementById('download-form').addEventListener('submit', (e) => {
    e.preventDefault();

    document.body.classList.add('tremble');
    setTimeout(() => document.body.classList.remove('tremble'), 600);

    const appid = document.getElementById('appid').value.trim();
    if (!appid) return;

    const eclipse = document.getElementById('eclipse');
    eclipse.classList.add('active');
    setTimeout(() => eclipse.classList.remove('active'), 1600);

    const crack = document.createElement('div');
    crack.className = 'crack';
    crack.style.left = `${lastClick.x - 60}px`;
    crack.style.top = `${lastClick.y - 60}px`;
    document.body.appendChild(crack);
    setTimeout(() => crack.remove(), 1600);

    const url = `https://pub-5b6d3b7c03fd4ac1afb5bd3017850e20.r2.dev/${appid}.zip`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${appid}.zip`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    document.getElementById('result').innerHTML = `The manifest for <strong>${appid}</strong> has been summoned.`;
});