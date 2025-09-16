function updateFavicon() {
  const size = 256; 
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);

  const radius = size / 2;
  const cx = radius;
  const cy = radius;

  ctx.beginPath();
  ctx.arc(cx, cy, radius - 8, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.fill();
  ctx.strokeStyle = "#c4c4c493";
  ctx.lineWidth = 16;
  ctx.stroke();

  const now = new Date();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  const hourAngle = ((h + m / 60) * 30 - 90) * Math.PI / 180;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(hourAngle) * radius * 0.5, cy + Math.sin(hourAngle) * radius * 0.5);
  ctx.strokeStyle = "#ffffffff";
  ctx.lineWidth = 20;
  ctx.stroke();

  const minuteAngle = ((m + s / 60) * 6 - 90) * Math.PI / 180;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(minuteAngle) * radius * 0.75, cy + Math.sin(minuteAngle) * radius * 0.75);
  ctx.strokeStyle = "#ffffffff";
  ctx.lineWidth = 12;
  ctx.stroke();

  const secondAngle = (s * 6 - 90) * Math.PI / 180;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(secondAngle) * radius * 0.75, cy + Math.sin(secondAngle) * radius * 0.75);
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffffff";
  ctx.fill();

  const link = document.querySelector("link[rel='icon']") || document.createElement("link");
  link.rel = "icon";
  link.href = canvas.toDataURL("image/png");
  link.sizes = "64x64";
  document.head.appendChild(link);
}

updateFavicon();
setInterval(updateFavicon, 1000);




const titles = ["ryhox.dev | MEOW", "ryhox.dev | coming soon <3"];
let idx = 0;
let charIdx = 0;
let typing = true;
let intervalId = null;

function updateTitle() {
  const current = titles[idx];
  if (typing) {
    document.title = current.slice(0, charIdx++);
    if (charIdx > current.length) {
      typing = false;
      setTimeout(updateTitle, 1000);
      return;
    }
  } else {
    document.title = current;
    typing = true;
    charIdx = 0;
    idx = (idx + 1) % titles.length;
    setTimeout(updateTitle, 2000);
    return;
  }
  setTimeout(updateTitle, 100);
}


updateTitle();


window.addEventListener("load", () => {

    let meowCount = 0;
    let meowSound = new Audio('assets/sounds/click.mp3');
    let milestoneSound = new Audio('assets/sounds/milestone.wav');
    let isMuted = false;

    meowSound.volume = 0.3;
    milestoneSound.volume = 0.5;

    const muteButton = document.createElement('button');
    muteButton.id = 'mute-button';
    muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    muteButton.title = 'Toggle Sound';
    Object.assign(muteButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
        color: '#ff69b4',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(5px)',
        border: '2px solid rgb(255, 255, 255)',
        borderRadius: '50px',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        opacity: '0'
    });
    document.body.appendChild(muteButton);

    muteButton.addEventListener('mouseenter', () => {
        muteButton.style.background = 'rgba(185, 185, 185, 0.4)';
        muteButton.style.transform = 'scale(1.1)';
    });
    muteButton.addEventListener('mouseleave', () => {
        muteButton.style.background = 'rgba(255, 255, 255, 0.2)';
        muteButton.style.transform = 'scale(1)';
    });
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        muteButton.innerHTML = isMuted 
            ? '<i class="fas fa-volume-mute"></i>' 
            : '<i class="fas fa-volume-up"></i>';
        muteButton.style.color = isMuted ? '#ff0000' : '#ff69b4';
    });

    const counter = document.createElement('div');
    counter.id = 'meow-counter';
    counter.textContent = `MEOW COUNTER: ${meowCount}`;
    Object.assign(counter.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ff69b4',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(5px)',
        padding: '10px 15px',
        borderRadius: '20px',
        opacity: '0',
        transition: 'opacity 0.5s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: '1000'
    });
    document.body.appendChild(counter);

    // Click to meow !!
    document.addEventListener('click', (e) => {

        meowCount++;
        counter.textContent = `MEOW COUNTER: ${meowCount}`;
        counter.style.opacity = '1';
        muteButton.style.opacity = '1';

        if (!isMuted) {
            meowSound.currentTime = 0;
            meowSound.play().catch(() => {});

            if (meowCount % 10 === 0) {
                milestoneSound.currentTime = 0;
                milestoneSound.play().catch(() => {});
            }
        }
            document.body.style.cursor = "grabbing";
    setTimeout(() => {
        document.body.style.cursor = "";
    }, 175);
        const meow = document.createElement('div');
        meow.textContent = 'MEOW!';
        Object.assign(meow.style, {
            position: 'absolute',
            left: `${e.pageX}px`,
            top: `${e.pageY}px`,
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ff69b4',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 1s, transform 1s',
            zIndex: '1000',
            textShadow: '0 0 5px rgba(255,105,180,0.7)',
            userSelect: 'none'
        });
        document.body.appendChild(meow);

        setTimeout(() => {
            meow.style.opacity = '0';
            meow.style.transform = 'translate(-50%, -100px)';
        }, 10);
        setTimeout(() => meow.remove(), 1100);
        
    });
    
});

const countdownEl = document.getElementById('countdown');
const targetDate = new Date(Date.UTC(2026, 3, 9, 10, 0, 0));

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;


    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s left...`;
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
