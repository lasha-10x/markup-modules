import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



// RESPONSIVE HEADER

// const openBtn = document.querySelector('#burger-button');
// const btnIcon = document.querySelector('#burger-button-icon');
// const headerContainer = document.querySelector('header');
// const headerIcon = document.querySelector('.header-icon');
// const navBar = document.querySelector('nav');
// const contactBtn = document.querySelector('.contact');
// const sgnIn = document.querySelector('.sign-in');


// openBtn.addEventListener('click', () => {

//     if (openBtn.classList.contains('active')) {
//         openBtn.classList.remove('active')
//         headerContainer.classList.remove('active');
//         headerIcon.classList.remove('active');
//         navBar.classList.remove('active');
//         contactBtn.classList.remove('active');
//         sgnIn.classList.remove('active');
//         btnIcon.classList.add('fa-bars')
//         btnIcon.classList.remove('fa-xmark')
//     } else {
//         openBtn.classList.add('active')
//         headerContainer.classList.add('active');
//         headerIcon.classList.add('active');
//         navBar.classList.add('active');
//         contactBtn.classList.add('active');
//         sgnIn.classList.add('active');
//         btnIcon.classList.add('fa-xmark')
//         btnIcon.classList.remove('fa-bars')
//     }
// });
// Elements Selection

const elements = [
  '#burger-button', 
  'header', 
  '.header-icon', 
  'nav', 
  '.contact', 
  '.sign-in'
].map(selector => document.querySelector(selector));

const openBtn = elements[0];
const btnIcon = openBtn.querySelector('i'); 

openBtn.addEventListener('click', () => {
  const isActive = openBtn.classList.toggle('active');
  
  elements.slice(1).forEach(element => element.classList.toggle('active', isActive));

  btnIcon.classList.toggle('fa-bars', !isActive);
  btnIcon.classList.toggle('fa-xmark', isActive);
});



// SLIDE CONTAINER 


document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".line");
  let currentIndex = 0;

  const startAnimation = () => {
      lines.forEach((line, index) => 
          line.style.animation = index === currentIndex ? "borderGrow 10s ease-in-out infinite" : "none"
      );

      currentIndex = (currentIndex + 1) % lines.length;
  };

  setInterval(startAnimation, 10000);
  startAnimation(); 
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide-img img");
    let currentIndex = 0;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    };

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 10000); // 10 წამი (10000ms)
});



// GLOBE

const vertex = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;
  uniform float u_maxExtrusion;

  void main() {

    vec3 newPosition = position;
    if(u_maxExtrusion > 1.0) newPosition.xyz = newPosition.xyz * u_maxExtrusion + sin(u_time);
    else newPosition.xyz = newPosition.xyz * u_maxExtrusion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

  }
`;
const fragment = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;

  vec3 colorA = vec3(0.196, 0.631, 0.886);
  vec3 colorB = vec3(0.192, 0.384, 0.498);

  void main() {

    vec3  color = vec3(0.0);
    float pct   = abs(sin(u_time));
          color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color, 1.0);

  }
`;

const container = document.querySelector('.main-globe');
const canvas    = document.querySelector('.canvas');

let
sizes,
scene,
camera,
renderer,
controls,
raycaster,
mouse,
isIntersecting,
twinkleTime,
materials,
material,
baseMesh,
minMouseDownFlag,
mouseDown,
grabbing;

const setScene = () => {

  sizes = {
    width:  container.offsetWidth,
    height: container.offsetHeight
  };

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    19, 
    sizes.width / sizes.height, 
    1, 
    1000
  );
  camera.position.z = 100;
  
  renderer = new THREE.WebGLRenderer({
    canvas:     canvas,
    antialias:  false,
    alpha:      true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const pointLight = new THREE.PointLight(0x081b26, 17, 200);
  pointLight.position.set(-50, 0, 60);
  scene.add(pointLight);
  scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1.5));

  raycaster         = new THREE.Raycaster();
  mouse             = new THREE.Vector2();
  isIntersecting    = false;
  minMouseDownFlag  = false;
  mouseDown         = false;
  grabbing          = false;

  setControls();
  setBaseSphere();
  setShaderMaterial();
  setMap();
  resize();
  listenTo();
  render();

}

const setControls = () => {

  controls                 = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate      = true;
  controls.autoRotateSpeed = 1.2;
  controls.enableDamping   = true;
  controls.enableRotate    = true;
  controls.enablePan       = false;
  controls.enableZoom      = false;
  controls.minPolarAngle   = (Math.PI / 2) - 0.5;
  controls.maxPolarAngle   = (Math.PI / 2) + 0.5;

};

const setBaseSphere = () => {

  const baseSphere   = new THREE.SphereGeometry(19.5, 35, 35);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color:        0x0b2636, 
    transparent:  true, 
    opacity:      0.9
  });
  baseMesh = new THREE.Mesh(baseSphere, baseMaterial);
  scene.add(baseMesh);

}

const setShaderMaterial = () => {

  twinkleTime  = 0.03;
  materials    = [];
  material     = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      u_time:         { value: 1.0 },
      u_maxExtrusion: { value: 1.0 }
    },
    vertexShader:   vertex,
    fragmentShader: fragment,
  });

}

const setMap = () => {

  let   activeLatLon    = {};
  const dotSphereRadius = 20;

  const readImageData = (imageData) => {

    for(
      let i = 0, lon = -180, lat = 90; 
      i < imageData.length; 
      i += 4, lon++
    ) {

      if(!activeLatLon[lat]) activeLatLon[lat] = [];

      const red   = imageData[i];
      const green = imageData[i + 1];
      const blue  = imageData[i + 2];

      if(red < 80 && green < 80 && blue < 80)
        activeLatLon[lat].push(lon);

      if(lon === 180) {
        lon = -180;
        lat--;
      }

    }

  }

  const visibilityForCoordinate = (lon, lat) => {

    let visible = false;

    if(!activeLatLon[lat].length) return visible;

    const closest = activeLatLon[lat].reduce((prev, curr) => {
      return (Math.abs(curr - lon) < Math.abs(prev - lon) ? curr : prev);
    });

    if(Math.abs(lon - closest) < 0.5) visible = true;

    return visible;

  }

  const calcPosFromLatLonRad = (lon, lat) => {
  
    var phi   = (90 - lat)  * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);

    const x = -(dotSphereRadius * Math.sin(phi) * Math.cos(theta));
    const z = (dotSphereRadius * Math.sin(phi) * Math.sin(theta));
    const y = (dotSphereRadius * Math.cos(phi));
  
    return new THREE.Vector3(x, y, z);

  }

  const createMaterial = (timeValue) => {

    const mat                 = material.clone();
    mat.uniforms.u_time.value = timeValue * Math.sin(Math.random());
    materials.push(mat);
    return mat;

  }

  const setDots = () => {

    const dotDensity  = 2.5;
    let   vector      = new THREE.Vector3();

    for (let lat = 90, i = 0; lat > -90; lat--, i++) {

      const radius = 
        Math.cos(Math.abs(lat) * (Math.PI / 180)) * dotSphereRadius;
      const circumference = radius * Math.PI * 2;
      const dotsForLat = circumference * dotDensity;

      for (let x = 0; x < dotsForLat; x++) {

        const long = -180 + x * 360 / dotsForLat;

        if (!visibilityForCoordinate(long, lat)) continue;

        vector = calcPosFromLatLonRad(long, lat);

        const dotGeometry = new THREE.CircleGeometry(0.1, 5);
        dotGeometry.lookAt(vector);
        dotGeometry.translate(vector.x, vector.y, vector.z);

        const m     = createMaterial(i);
        const mesh  = new THREE.Mesh(dotGeometry, m);

        scene.add(mesh);

      }

    }

  }
  
  const image   = new Image;
  image.onload  = () => {

    image.needsUpdate  = true;

    const imageCanvas  = document.createElement('canvas');
    imageCanvas.width  = image.width;
    imageCanvas.height = image.height;
      
    const context = imageCanvas.getContext('2d');
    context.drawImage(image, 0, 0);
      
    const imageData = context.getImageData(
      0, 
      0, 
      imageCanvas.width, 
      imageCanvas.height
    );
    readImageData(imageData.data);

    setDots();
    
  }

  image.src = 'img/world_alpha_mini.jpg';

}

const resize = () => {

  sizes = {
    width:  container.offsetWidth,
    height: container.offsetHeight
  };

  if(window.innerWidth > 700) camera.position.z = 100;
  else camera.position.z = 140;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);

}

const mousemove = (event) => {

  isIntersecting = false;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  
  const intersects = raycaster.intersectObject(baseMesh);
  if(intersects[0]) {
    isIntersecting = true;
    if(!grabbing) container.style.cursor = 'pointer';
  }
  else {
    if(!grabbing) container.style.cursor = 'default';
  }

}

const mousedown = () => {

  if(!isIntersecting) return;

  materials.forEach(el => {
    gsap.to(
      el.uniforms.u_maxExtrusion, 
      {
        value: 1.07
      }
    );
  });

  mouseDown         = true;
  minMouseDownFlag  = false;

  setTimeout(() => {
    minMouseDownFlag = true;
    if(!mouseDown) mouseup();
  }, 500);

  container.style.cursor  = 'grabbing';
  grabbing                    = true;

}

const mouseup = () => {

  mouseDown = false;
  if(!minMouseDownFlag) return;

  materials.forEach(el => {
    gsap.to(
      el.uniforms.u_maxExtrusion, 
      {
        value:    1.0, 
        duration: 0.15
      }
    );
  });

  grabbing = false;
  if(isIntersecting) container.style.cursor = 'pointer';
  else container.style.cursor = 'default';

}

const listenTo = () => {

  container.addEventListener('resize',     resize.bind(this));
  container.addEventListener('mousemove',  mousemove.bind(this));
  container.addEventListener('mousedown',  mousedown.bind(this));
  container.addEventListener('mouseup',    mouseup.bind(this));

}

const render = () => {

  materials.forEach(el => {
    el.uniforms.u_time.value += twinkleTime;
  });

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render.bind(this))

}

setScene();


