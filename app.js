/**
 * Advanced Cosmic Background with Interactive Elements
 * Features:
 * - Dynamic particle system with depth and glow effects
 * - Interactive mouse movement response
 * - Cosmic orb with pulsating animation
 * - Comet trails with random appearances
 * - Star constellation connections
 */

class CosmicBackground {
  constructor() {
    // Main canvas setup
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Particle system properties
    this.particles = [];
    this.comets = [];
    this.stars = [];
    this.constellationLines = [];
    
    // Mouse interaction
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100
    };
    
    // Animation properties
    this.hue = 240; // Start with blue
    this.hueShift = 0.1;
    this.frame = 0;
    
    // Initialize the cosmic background
    this.init();
  }

  init() {
    // Set up canvas properties
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    document.body.prepend(this.canvas);
    
    // Set up event listeners
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.trackMouse(e));
    window.addEventListener('touchmove', (e) => this.trackTouch(e));
    
    // Initialize canvas and particles
    this.resize();
    this.createParticles();
    this.createStars();
    this.createConstellations();
    
    // Start animation loop
    this.animate();
    
    // Create cosmic orb
    this.setupCosmicOrb();
    
    // Periodically create comets
    setInterval(() => this.createComet(), 3000);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Recreate particles when resizing
    this.particles = [];
    this.createParticles();
    this.createStars();
    this.createConstellations();
  }

  trackMouse(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
  
  trackTouch(e) {
    if (e.touches && e.touches[0]) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    }
  }

  createParticles() {
    const particleCount = Math.min(100, window.innerWidth / 20); // Responsive count
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 0.5;
      const depth = Math.random() * 0.5 + 0.5; // For parallax effect
      
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: size,
        color: `hsla(${Math.random() * 60 + 220}, 100%, 70%, ${depth * 0.7})`,
        speedX: (Math.random() - 0.5) * depth,
        speedY: (Math.random() - 0.5) * depth,
        depth: depth,
        glow: Math.random() > 0.7 // Some particles have glow
      });
    }
  }
  
  createStars() {
    const starCount = Math.min(15, window.innerWidth / 100);
    
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 2,
        pulse: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  
  createConstellations() {
    // Only create connections if we have enough stars
    if (this.stars.length < 3) return;
    
    // Create a few random connections between stars
    const connectionCount = Math.min(this.stars.length - 1, 10);
    
    for (let i = 0; i < connectionCount; i++) {
      const star1 = this.stars[Math.floor(Math.random() * this.stars.length)];
      const star2 = this.stars[Math.floor(Math.random() * this.stars.length)];
      
      // Avoid connecting a star to itself
      if (star1 !== star2) {
        this.constellationLines.push({
          x1: star1.x,
          y1: star1.y,
          x2: star2.x,
          y2: star2.y,
          opacity: Math.random() * 0.15 + 0.05
        });
      }
    }
  }
  
  createComet() {
    // Randomly decide if we should create a comet (30% chance)
    if (Math.random() > 0.3) return;
    
    // Create a comet that travels across the screen
    const startX = Math.random() * this.canvas.width;
    const startY = 0;
    const angle = Math.PI / 4 + (Math.random() * Math.PI / 4); // Angle between PI/4 and PI/2
    
    this.comets.push({
      x: startX,
      y: startY,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 5 + 3,
      angle: angle,
      trail: [],
      maxTrailLength: Math.floor(Math.random() * 20) + 10,
      color: Math.random() > 0.5 ? 
        `hsla(${Math.random() * 60 + 220}, 100%, 70%, 0.8)` : // Blue-purple
        `hsla(${Math.random() * 30 + 20}, 100%, 70%, 0.8)` // Orange-yellow
    });
  }
  
  setupCosmicOrb() {
    const cosmicOrb = document.querySelector('.cosmic-orb');
    if (!cosmicOrb) return;
    
    // Position the orb
    cosmicOrb.style.position = 'fixed';
    cosmicOrb.style.width = '180px';
    cosmicOrb.style.height = '180px';
    cosmicOrb.style.borderRadius = '50%';
    cosmicOrb.style.background = 'radial-gradient(circle, rgba(108, 99, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%)';
    cosmicOrb.style.top = '75%';
    cosmicOrb.style.left = '15%';
    cosmicOrb.style.transform = 'translate(-50%, -50%)';
    cosmicOrb.style.boxShadow = '0 0 50px 25px rgba(108, 99, 255, 0.2)';
    cosmicOrb.style.zIndex = '-1';
    cosmicOrb.style.pointerEvents = 'none';
    cosmicOrb.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    // Create smoother pulsating animation using requestAnimationFrame
    let scale = 1;
    let phase = 0;
    
    const animateOrb = () => {
      // Smooth sine wave oscillation for natural pulsing
      phase += 0.01;
      scale = 1 + 0.2 * Math.sin(phase);
      
      // Apply transform with smooth easing
      cosmicOrb.style.transform = `translate(-50%, -50%) scale(${scale})`;
      
      // Gradually shift colors
      if (phase % 2 < 0.02) { // Change color less frequently
        const hue = Math.floor(Math.random() * 60) + 220; // Blue-purple range
        cosmicOrb.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, 0.3) 0%, rgba(0, 0, 0, 0) 70%)`;
        cosmicOrb.style.boxShadow = `0 0 60px 30px hsla(${hue}, 100%, 70%, 0.2)`;
      }
      
      requestAnimationFrame(animateOrb);
    };
    
    // Start animation
    animateOrb();
    
    // Add subtle movement on mouse move
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      // Apply subtle movement with delay for smoother effect
      setTimeout(() => {
        cosmicOrb.style.marginLeft = `${moveX}px`;
        cosmicOrb.style.marginTop = `${moveY}px`;
      }, 100);
    });
  }

  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.frame++;
    
    // Update and draw constellation lines
    this.drawConstellations();
    
    // Update and draw stars
    this.updateStars();
    
    // Update and draw particles
    this.updateParticles();
    
    // Update and draw comets
    this.updateComets();
    
    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
  
  drawConstellations() {
    this.constellationLines.forEach(line => {
      this.ctx.beginPath();
      this.ctx.moveTo(line.x1, line.y1);
      this.ctx.lineTo(line.x2, line.y2);
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
      this.ctx.lineWidth = 0.5;
      this.ctx.stroke();
    });
  }
  
  updateStars() {
    this.stars.forEach(star => {
      // Pulsating effect
      const pulseFactor = Math.sin(this.frame * star.pulse + star.phase) * 0.5 + 1;
      
      // Draw the star with glow
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size * pulseFactor, 0, Math.PI * 2);
      
      // Create gradient for glow effect
      const gradient = this.ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(160, 160, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }
  
  updateParticles() {
    // Use requestAnimationFrame timing for smoother animation
    const now = performance.now() * 0.001; // Convert to seconds for smoother timing
    
    this.particles.forEach(particle => {
      // Update position with time-based movement for consistent speed across devices
      const speedFactor = 0.5; // Adjust for desired speed
      particle.x += particle.speedX * speedFactor;
      particle.y += particle.speedY * speedFactor;
      
      // Smooth wrapping around edges
      if (particle.x < -particle.size) particle.x = this.canvas.width + particle.size;
      if (particle.x > this.canvas.width + particle.size) particle.x = -particle.size;
      if (particle.y < -particle.size) particle.y = this.canvas.height + particle.size;
      if (particle.y > this.canvas.height + particle.size) particle.y = -particle.size;
      
      // Enhanced mouse interaction with smoother movement
      if (this.mouse.x && this.mouse.y) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          // Calculate angle and force
          const angle = Math.atan2(dy, dx);
          // Smooth easing function for more natural movement
          const easing = (x) => 1 - Math.pow(1 - x, 3); // Cubic ease-out
          const force = easing((this.mouse.radius - distance) / this.mouse.radius);
          
          // Apply force with depth factor for parallax effect
          particle.x += Math.cos(angle) * force * 2.5 * particle.depth;
          particle.y += Math.sin(angle) * force * 2.5 * particle.depth;
        }
      }
      
      // Subtle oscillation for more organic movement
      const oscillation = Math.sin(now * 2 + particle.depth * 10) * 0.2;
      
      // Draw the particle with enhanced rendering
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size + oscillation, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      
      // Improved glow effect with better performance
      if (particle.glow) {
        // Use shadow for glow instead of extra draw call
        this.ctx.shadowColor = particle.color;
        this.ctx.shadowBlur = particle.size * 3;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0; // Reset shadow
      }
    });
  }
  
  updateComets() {
    // Use performance timing for smooth animation
    const now = performance.now() * 0.001;
    
    // Update existing comets
    for (let i = this.comets.length - 1; i >= 0; i--) {
      const comet = this.comets[i];
      
      // Update position with smooth acceleration
      const speedFactor = 1 + Math.sin(now) * 0.1; // Subtle speed variation
      comet.x += Math.cos(comet.angle) * comet.speed * speedFactor;
      comet.y += Math.sin(comet.angle) * comet.speed * speedFactor;
      
      // Add current position to trail with slight jitter for more natural look
      comet.trail.push({
        x: comet.x + (Math.random() - 0.5) * 0.5, 
        y: comet.y + (Math.random() - 0.5) * 0.5
      });
      
      // Limit trail length
      if (comet.trail.length > comet.maxTrailLength) {
        comet.trail.shift();
      }
      
      // Draw the trail with gradient for better visual effect
      if (comet.trail.length > 1) {
        // Create gradient for trail
        const gradient = this.ctx.createLinearGradient(
          comet.trail[0].x, comet.trail[0].y,
          comet.x, comet.y
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, comet.color);
        
        // Draw trail path
        this.ctx.beginPath();
        this.ctx.moveTo(comet.trail[0].x, comet.trail[0].y);
        
        // Use quadratic curves for smoother trail
        for (let j = 1; j < comet.trail.length; j++) {
          const xc = (comet.trail[j].x + comet.trail[j-1].x) / 2;
          const yc = (comet.trail[j].y + comet.trail[j-1].y) / 2;
          this.ctx.quadraticCurveTo(comet.trail[j-1].x, comet.trail[j-1].y, xc, yc);
        }
        
        // Connect to the comet head
        this.ctx.lineTo(comet.x, comet.y);
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = comet.size;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
      }
      
      // Draw the comet head with glow
      this.ctx.shadowColor = comet.color;
      this.ctx.shadowBlur = comet.size * 3;
      this.ctx.beginPath();
      this.ctx.arc(comet.x, comet.y, comet.size * 1.5, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // Reset shadow
      
      // Remove comet if it's off screen with some margin
      if (comet.y > this.canvas.height + 50 || 
          comet.x < -50 || 
          comet.x > this.canvas.width + 50) {
        this.comets.splice(i, 1);
      }
    }
  }
}

// Initialize on page load with performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cosmic background with requestIdleCallback for better performance
  if (window.requestIdleCallback) {
    requestIdleCallback(() => {
      new CosmicBackground();
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      new CosmicBackground();
    }, 100);
  }

  // Smooth scroll for navigation with improved performance
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Use native smooth scrolling with fallback
        if ('scrollBehavior' in document.documentElement.style) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // Fallback for browsers that don't support smooth scrolling
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add hover effects to buttons with hardware acceleration
  document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px) translateZ(0)';
      button.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateZ(0)';
    });
    
    // Add touch support for mobile
    button.addEventListener('touchstart', () => {
      button.style.transform = 'translateY(-3px) translateZ(0)';
    }, { passive: true });
    
    button.addEventListener('touchend', () => {
      button.style.transform = 'translateZ(0)';
    }, { passive: true });
  });
  
  // Add cosmic particles to the header with optimized rendering
  const cosmicParticles = document.querySelector('.cosmic-particles');
  if (cosmicParticles) {
    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();
    const particleCount = Math.min(50, window.innerWidth / 20); // Responsive count
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position with better distribution
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random size with better distribution
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random animation properties for more variety
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // 10-20s duration
      
      // Random color (blue to purple range) with better saturation
      const hue = Math.floor(Math.random() * 60) + 220;
      const saturation = Math.floor(Math.random() * 20) + 80; // 80-100%
      const lightness = Math.floor(Math.random() * 20) + 60; // 60-80%
      particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.5})`;
      
      // Add to fragment instead of directly to DOM
      fragment.appendChild(particle);
    }
    
    // Add all particles at once for better performance
    cosmicParticles.appendChild(fragment);
  }
  
  // Optimize page transitions
  const startButton = document.querySelector('.start-button');
  const header = document.querySelector('header');
  const gamePage = document.getElementById('game-page');
  
  if (startButton && header && gamePage) {
    // Add hardware acceleration for smoother transitions
    header.style.willChange = 'opacity, transform';
    gamePage.style.willChange = 'opacity, transform';
  }
});

// Add enhanced CSS for cosmic particles with hardware acceleration
const style = document.createElement('style');
style.textContent = `
  .cosmic-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    pointer-events: none;
  }
  
  .particle {
    position: absolute;
    border-radius: 50%;
    animation-name: float;
    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
    transform: translateZ(0); /* Hardware acceleration */
    will-change: transform; /* Hint for browser optimization */
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  
  @keyframes float {
    0% { transform: translateY(0) translateX(0) translateZ(0); }
    25% { transform: translateY(-20px) translateX(10px) translateZ(0); }
    50% { transform: translateY(0) translateX(20px) translateZ(0); }
    75% { transform: translateY(20px) translateX(10px) translateZ(0); }
    100% { transform: translateY(0) translateX(0) translateZ(0); }
  }
  
  /* Add smooth transitions for page elements */
  header {
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }
  
  #game-page {
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }
  
  .canvas-container {
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
  }
  
  .controls button {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                background-color 0.3s ease, 
                box-shadow 0.3s ease;
  }
`;
document.head.appendChild(style);
