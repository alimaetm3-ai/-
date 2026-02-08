// Simple Fireworks/Confetti Effect
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8
    };
    this.alpha = 1;
    this.friction = 0.96;
    this.gravity = 0.04;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

function launchFireworks() {
  const colors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#536dfe', '#448aff', '#40c4ff', '#18ffff', '#64ffda', '#69f0ae', '#b2ff59', '#eeff41', '#ffff00', '#ffd740', '#ffab40', '#ff6e40'];
  // Launch from random positions
  for (let i = 0; i < 5; i++) {
     setTimeout(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        for (let j = 0; j < 50; j++) {
            particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
        }
     }, i * 300);
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update();
      particle.draw();
    } else {
      particles.splice(index, 1);
    }
  });
}

// Start animation
animate();

// Launch on load
launchFireworks();

// Launch on click
document.addEventListener('click', (e) => {
   // Don't trigger if clicking on interactive elements
   if(e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.card')) return;
   
   const x = e.clientX;
   const y = e.clientY;
   const colors = ['#ff5252', '#ff4081', '#69f0ae', '#ffd740'];
   for (let j = 0; j < 30; j++) {
       particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
   }
});

// Launch periodically
setInterval(launchFireworks, 5000);
