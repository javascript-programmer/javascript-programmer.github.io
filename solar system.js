import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js';

const pi = Math.PI;

const scene = new THREE.Scene();
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas});

var fov = 45;
var aspect = 2;
var near = 0.1;
var far = 15;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.background = new THREE.Color(0xFFFFFF);
scene.useDepthPicking = false;
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

var boxWidth = 1;
var boxHeight = 1;
var boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;

    return cube;
}

var cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
];

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

var vel = 0.1;
var rotationvel = vel / 2;

function render(time) {
    time *= 0.001;

    if (keys.w) {
        camera.position.y += vel;
    }
    if (keys.s) {
        camera.position.y -= vel;
    }
    if (keys.a) {
        camera.position.x -= vel;
    }
    if (keys.d) {
    camera.position.x += vel;
    }
    if (keys.upArrow) {
        camera.position.x += vel * Math.cos(camera.rotation.y + 1.57079633);
        camera.position.z -= vel * Math.sin(camera.rotation.y + 1.57079633);
    }
    if (keys.dnArrow) {
        camera.position.x -= vel * Math.cos(camera.rotation.y + 1.57079633);
        camera.position.z += vel * Math.sin(camera.rotation.y + 1.57079633);
    }
    if (keys.rtArrow) {
        camera.rotation.y -= rotationvel;
    }
    if (keys.ltArrow) {
        camera.rotation.y += rotationvel;
    }
    if (keys.space) {
        camera.position.set(0, 0, 2);
    }

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

var keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    rtArrow: false,
    ltArrow: false,
    upArrow: false,
    dnArrow: false,
    space: false
}
function onKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        keys.w = true;
    }
    if (keyCode == 83) {
        keys.s = true;
    }
    if (keyCode == 65) {
        keys.a = true;
    }
    if (keyCode == 68) {
        keys.d = true;
    }
    if (keyCode == 38) {
        keys.upArrow = true;
    }
    if (keyCode == 40) {
        keys.dnArrow = true;
    }
    if (keyCode == 37) {
        keys.ltArrow = true;
    }
    if (keyCode == 39) {
        keys.rtArrow = true;
    }
    if (keyCode == 32) {
        keys.space = true;
    }
}
function onKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        keys.w = false;
    }
    if (keyCode == 83) {
        keys.s = false;
    }
    if (keyCode == 65) {
        keys.a = false;
    }
    if (keyCode == 68) {
        keys.d = false;
    }
    if (keyCode == 38) {
        keys.upArrow = false;
    }
    if (keyCode == 40) {
        keys.dnArrow = false;
    }
    if (keyCode == 37) {
        keys.ltArrow = false;
    }
    if (keyCode == 39) {
        keys.rtArrow = false;
    }
    if (keyCode == 32) {
        keys.space = false;
    }
}
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
