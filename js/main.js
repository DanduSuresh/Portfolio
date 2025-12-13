// Main JavaScript - Only for interactivity (Navbar, Typing, Loader)
// Content is now hardcoded in HTML as per request

// ===== DOM ELEMENTS =====
const loader = document.getElementById("loader");
const hamburger = document.querySelector(".hamburger");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const subtitleElement = document.querySelector(".subtitle");

const TYPING_PHRASES = [
  "Full-Stack Web Developer",
  "Java Developer",
  "Problem Solver",
];
const CONFIG = {
  loaderDuration: 1000,
  typingSpeed: 100,
  typingDelay: 2000,
  scrollOffset: 100,
};

// ===== LOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, CONFIG.loaderDuration);
});

// ===== HAMBURGER MENU =====
if (hamburger) {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
  });
}

// Close menu when link clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ===== DARK/LIGHT MODE TOGGLE =====
const themeToggleBtn = document.getElementById("theme-toggle");
const bodyElement = document.body;

// Check local storage for theme preference
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  bodyElement.classList.add("light-mode");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    bodyElement.classList.toggle("light-mode");

    // Save preference to local storage
    if (bodyElement.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });
}

// ===== TYPING EFFECT =====
let currentPhraseIndex = 0;

function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(() => {
        if (callback) callback();
      }, CONFIG.typingDelay);
    }
  }
  type();
}

function eraseText(element, speed, callback) {
  let text = element.textContent;
  let i = text.length;
  function erase() {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(erase, speed / 2);
    } else {
      if (callback) callback();
    }
  }
  erase();
}

function cycleTypingEffect() {
  const currentPhrase = TYPING_PHRASES[currentPhraseIndex];
  typeWriter(subtitleElement, currentPhrase, CONFIG.typingSpeed, () => {
    eraseText(subtitleElement, CONFIG.typingSpeed, () => {
      currentPhraseIndex = (currentPhraseIndex + 1) % TYPING_PHRASES.length;
      cycleTypingEffect();
    });
  });
}

// Start typing after loader
setTimeout(() => {
  if (subtitleElement) cycleTypingEffect();

  // Editor Title - Static
  const editorTitle = document.querySelector(".editor-title");
  if (editorTitle) {
    editorTitle.textContent = "Developer.java";
  }

  initCodeTypewriter(); // Render static code
}, CONFIG.loaderDuration + 100); // Reduced delay since no typing

// ===== CODE EDITOR STATIC RENDER =====
function initCodeTypewriter() {
  const codeElement = document.getElementById("code-typewriter");
  if (!codeElement) return;

  // Clear existing content just in case
  codeElement.innerHTML = "";

  const codeLines = [
    { text: "public class ", class: "code-keyword" },
    { text: "Developer ", class: "code-class" },
    { text: "{\n", class: "" },
    { text: "    String ", class: "code-class" },
    { text: "name ", class: "" },
    { text: "= ", class: "code-keyword" },
    { text: '"Dandu Suresh";\n', class: "code-string" },
    { text: "    String ", class: "code-class" },
    { text: "role ", class: "" },
    { text: "= ", class: "code-keyword" },
    { text: '"', class: "code-string" },
    {
      text: "Java Developer",
      class: "code-string",
      id: "dynamic-role",
    },
    { text: '";\n', class: "code-string" },
    { text: "    String[] ", class: "code-class" },
    { text: "skills ", class: "" },
    { text: "= ", class: "code-keyword" },
    { text: "{\n", class: "" },
    { text: '        "Java", "Spring Boot",\n', class: "code-string" },
    { text: '        "MySQL", "JavaScript"\n', class: "code-string" },
    { text: "    };\n", class: "" },
    { text: "}", class: "" },
  ];

  // Render immediately
  codeLines.forEach((line) => {
    const span = document.createElement("span");
    if (line.class) span.className = line.class;
    if (line.id) span.id = line.id;
    span.textContent = line.text;
    codeElement.appendChild(span);
  });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(
    ".project-card, .edu-card, .timeline-item, .skills-category-card"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// ===== ULTIMATE GAMING SETUP (THREE.JS) =====
function initUltimateGamingSetup() {
  console.log("Initializing Ultimate Gaming Setup...");
  const container = document.getElementById("tech-canvas-container");
  if (!container) return;

  if (typeof THREE === "undefined") {
    console.error("Three.js not loaded!");
    container.innerHTML =
      "<p style='color:white;text-align:center;'>Error: Three.js missing.</p>";
    return;
  }

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 15, 30);
  camera.lookAt(0, 2, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // --- CONTROLS (Drag Rotation) ---
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationY = 0;
  let targetRotationX = 0;

  const handleMouseDown = (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
    container.style.cursor = "grabbing";
  };
  const handleMouseUp = () => {
    isDragging = false;
    container.style.cursor = "grab";
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaMove = {
      x: e.clientX - previousMousePosition.x,
      y: e.clientY - previousMousePosition.y,
    };
    // Rotate entire setup around Y axis (Orbit)
    targetRotationY += deltaMove.x * 0.01;
    // Limit X axis (Pitch) slightly
    targetRotationX += deltaMove.y * 0.01;
    targetRotationX = Math.max(-0.5, Math.min(0.5, targetRotationX));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  container.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("mousemove", handleMouseMove);
  // Touch
  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    previousMousePosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  });
  window.addEventListener("touchend", () => {
    isDragging = false;
  });
  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const deltaMove = {
      x: e.touches[0].clientX - previousMousePosition.x,
      y: e.touches[0].clientY - previousMousePosition.y,
    };
    targetRotationY += deltaMove.x * 0.01;
    previousMousePosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  });

  // --- BUILD METAVERSE RIG ---
  const rigGroup = new THREE.Group();
  scene.add(rigGroup);

  // Materials (White & RGB Theme)
  const deskMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 0.2,
    metalness: 0.1,
  }); // White Gloss
  const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
  const neonPurpleMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  const screenMat = new THREE.MeshBasicMaterial({ color: 0x00aaff });
  const sideScreenMat = new THREE.MeshBasicMaterial({
    color: 0x0088cc,
    transparent: true,
    opacity: 0.8,
  });
  const silverMetal = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.3,
    metalness: 0.9,
  }); // Silver instead of black
  const whitePlastic = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.9,
    opacity: 0.3,
    transparent: true,
    roughness: 0,
  });
  const rgbComponent = new THREE.MeshBasicMaterial({ color: 0xff3366 }); // Hot Pink GPU

  // Aliases for compatibility with existing geometry code
  const blackMetal = silverMetal;

  // 1. Desk (L-Shape or Wide)
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 8), deskMat);
  deskTop.receiveShadow = true;
  rigGroup.add(deskTop);
  // Legs
  const legGeo = new THREE.BoxGeometry(1, 6, 6);
  const legL = new THREE.Mesh(legGeo, blackMetal);
  legL.position.set(-8, -3.25, 0);
  rigGroup.add(legL);
  const legR = new THREE.Mesh(legGeo, blackMetal);
  legR.position.set(8, -3.25, 0);
  rigGroup.add(legR);

  // 2. Main Monitor (Ultrawide)
  const mainMonGroup = new THREE.Group();
  mainMonGroup.position.set(0, 4, -2);
  // Stand
  const standBase = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1.5, 0.2, 6),
    blackMetal
  );
  standBase.position.y = -3.8;
  const standPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 4),
    blackMetal
  );
  standPole.position.y = -2;
  mainMonGroup.add(standBase, standPole);
  // Screen Bezel
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(10, 4.5, 0.5), blackMetal);
  mainMonGroup.add(bezel);
  // Screen Display
  const display = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 4.1), screenMat);
  display.position.z = 0.26;
  mainMonGroup.add(display);
  rigGroup.add(mainMonGroup);

  // 3. Side Monitors (Vertical/Angled)
  // Left
  const leftMonGroup = new THREE.Group();
  leftMonGroup.position.set(-6.5, 4, -1);
  leftMonGroup.rotation.y = Math.PI / 6; // Angle in
  const sideBezel = new THREE.Mesh(
    new THREE.BoxGeometry(3, 5, 0.4),
    blackMetal
  );
  const sideDisplay = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 4.6),
    sideScreenMat
  );
  sideDisplay.position.z = 0.21;
  leftMonGroup.add(sideBezel, sideDisplay);
  rigGroup.add(leftMonGroup);
  // Right
  const rightMonGroup = new THREE.Group();
  rightMonGroup.position.set(6.5, 4, -1);
  rightMonGroup.rotation.y = -Math.PI / 6; // Angle in
  // Clone meshes
  rightMonGroup.add(sideBezel.clone(), sideDisplay.clone());
  rigGroup.add(rightMonGroup);

  // 4. PC Tower (The Beast)
  const pcGroup = new THREE.Group();
  pcGroup.position.set(6.5, 2.5, 2); // On desk, right side
  // Case
  const caseBody = new THREE.Mesh(new THREE.BoxGeometry(2.5, 5, 5), blackMetal);
  pcGroup.add(caseBody);
  // Glass Side Panel
  const sidePanel = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 4.5), glassMat);
  sidePanel.rotation.y = -Math.PI / 2;
  sidePanel.position.set(-1.26, 0, 0); // Face inward
  pcGroup.add(sidePanel);
  // Internal RGB Components
  const gpu = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 3.5), rgbComponent);
  gpu.position.set(0, 0, 0);
  const cpuCooler = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 0.5),
    neonCyanMat
  );
  cpuCooler.rotation.z = Math.PI / 2;
  cpuCooler.position.set(0, 1.5, 1);
  const ramStick = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1.5, 0.1),
    neonPurpleMat
  );
  ramStick.position.set(0, 1.5, 2);
  pcGroup.add(gpu, cpuCooler, ramStick);
  rigGroup.add(pcGroup);

  // 6. Gaming Chair (White Edition)
  const chairGroup = new THREE.Group();
  chairGroup.position.set(0, -3.25, 6); // Floor level, in front of desk
  chairGroup.rotation.y = -0.2; // Casual swivel

  const whiteLeather = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.2,
    metalness: 0.8,
  });

  // Seat
  const seat = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), whiteLeather);
  seat.position.y = 2; // Height from floor
  chairGroup.add(seat);

  // Backrest (Tall 'Racer' style)
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 6, 0.5),
    whiteLeather
  );
  backrest.position.set(0, 5, 1.8);
  backrest.rotation.x = -0.1;
  chairGroup.add(backrest);

  // Headrest component
  const headrest = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 0.5),
    whiteLeather
  );
  headrest.position.set(0, 8.5, 2.1);
  headrest.rotation.x = -0.1;
  chairGroup.add(headrest);

  // Armrests
  const armL = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.5, 2.5),
    whitePlastic
  );
  armL.position.set(-2.1, 3, 0.5);
  const armSupportL = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1.5),
    chromeMat
  );
  armSupportL.position.set(-2.1, 2.25, 0.5);
  chairGroup.add(armL, armSupportL);

  const armR = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.5, 2.5),
    whitePlastic
  );
  armR.position.set(2.1, 3, 0.5);
  const armSupportR = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1.5),
    chromeMat
  );
  armSupportR.position.set(2.1, 2.25, 0.5);
  chairGroup.add(armR, armSupportR);

  // Base Logic
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 2),
    chromeMat
  );
  cylinder.position.y = 1;
  chairGroup.add(cylinder);

  const baseLeg1 = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.2, 0.4),
    chromeMat
  );
  baseLeg1.position.y = 0.1;
  chairGroup.add(baseLeg1);
  const baseLeg2 = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.2, 0.4),
    chromeMat
  );
  baseLeg2.position.y = 0.1;
  baseLeg2.rotation.y = Math.PI / 2;
  chairGroup.add(baseLeg2);

  rigGroup.add(chairGroup);

  // 5. Peripherals
  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.2, 1.5),
    blackMetal
  );
  keyboard.position.set(0, 0.35, 2);
  rigGroup.add(keyboard);
  // Keyboard RGB underglow
  const kbLight = new THREE.PointLight(0xff00ff, 0.5, 2);
  kbLight.position.set(0, 0.5, 2);
  rigGroup.add(kbLight);

  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.4, 1.2),
    blackMetal
  );
  mouse.position.set(3.5, 0.4, 2);
  rigGroup.add(mouse);

  // --- LIGHTING ---
  const ambient = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambient);

  // Screen Glow (Cyan)
  const screenLight = new THREE.PointLight(0x00ffff, 1, 10);
  screenLight.position.set(0, 4, 2);
  rigGroup.add(screenLight);

  // PC RGB Glow (Purple/Pink)
  const pcLight = new THREE.PointLight(0xff00ff, 1.5, 8);
  pcLight.position.set(6.5, 2.5, 2);
  rigGroup.add(pcLight);

  // General Room Light
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(-5, 10, 5);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // --- ANIMATION ---
  const animate = () => {
    requestAnimationFrame(animate);

    // Smooth Rotation Damping
    rigGroup.rotation.y += (targetRotationY - rigGroup.rotation.y) * 0.1;
    // Optional: Vertical tilt
    // rigGroup.rotation.x += (targetRotationX - rigGroup.rotation.x) * 0.1;

    // Component Animation (Simple pulsing or fan spin)
    cpuCooler.rotation.x += 0.1;

    renderer.render(scene, camera);
  };
  animate();

  // Resize
  window.addEventListener("resize", () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Initialize on Load
window.addEventListener("load", () => {
  setTimeout(initUltimateGamingSetup, 200);
});
