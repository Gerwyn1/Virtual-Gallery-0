// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import axios from 'axios';

import * as THREE from 'react-three-fiber'


     //the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//mouse cursor
window.addEventListener('pointerup', (e) => {
    // e.stopImmediatePropagation();
    // e.stopPropagation();
    // e.preventDefault();
    document.body.style.cursor = "grab";
});

window.addEventListener('pointerdown', (e) => {
    // e.stopImmediatePropagation();
    // e.stopPropagation();
    // e.preventDefault();
    document.body.style.cursor = "grabbing";
});

//the scene
const scene = new THREE.Scene();

//group container
const modelContainer = new THREE.Group();
scene.add(modelContainer);

//the camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

//ambient light
var ambientLight = new THREE.AmbientLight(0xeaeaea, 0.6);
scene.add(ambientLight);

// spotlights
const spotLight = [
    {
        artworksId: "artwork9",
        lightColor: 0xffffff,
        intensity: 2,
        position: [40, 10, -15],
        angle: 0.3,
        penumbra: 0.4,
        decay: 0.4,
        distanace: 40,
        shadowBias: -0.001,
        targetPosition: [0, -100, 260],
    },
    {
        artworksId: "artwork10",
        lightColor: 0xffffff,
        intensity: 0.3,
        position: [40, 8, -38],
        angle: 0.6,
        penumbra: 0.4,
        decay: 0.4,
        distanace: 40,
        shadowBias: -0.001,
        targetPosition: [300, -10, -600],
    },
    {
        artworksId: "artwork15",
        lightColor: 0xffffff,
        intensity: 0.3,
        position: [16, 7, -28],
        angle: 0.9,
        penumbra: 0.4,
        decay: 0.4,
        distanace: 40,
        shadowBias: -0.0001,
        targetPosition: [0, -8, -600],
    },
];

spotLight.forEach(spotLights => {
    const { lightColor, intensity, position, angle, penumbra, decay, distance, shadowBias, targetPosition } = spotLights;
    let createSpotLight = new THREE.SpotLight(lightColor, intensity);

    createSpotLight.position.set(...position);
    createSpotLight.angle = angle;
    createSpotLight.penumbra = penumbra;
    createSpotLight.decay = decay;
    createSpotLight.distance = distance;
    createSpotLight.shadow.bias = shadowBias;


    createSpotLight.castShadow = true;
    scene.add(createSpotLight);

    createSpotLight.target.position.set(...targetPosition);
    scene.add(createSpotLight.target);
});


//directional lights (sunlight effect)
const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(-50, 100, -50);
// dirLight.castShadow = true;
scene.add(dirLight);


const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight2.position.set(50, 100, 50);
scene.add(dirLight2);


//the orbital control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.object.position.set(0, 4, 0);
orbit.target = new THREE.Vector3(0, 4, 0);

//control orbital speed
orbit.enableDamping = true;
orbit.dampingFactor = 0.09;
orbit.rotateSpeed = 0.5;

//the orbital control zoom disable
orbit.enableZoom = false;

orbit.addEventListener('end', () => {
    updateCameraOrbit();
});
updateCameraOrbit();

function updateCameraOrbit() {
    // Update OrbitControls target to a point just in front of the camera

    let forward = new THREE.Vector3();
    camera.getWorldDirection(forward);

    orbit.target.copy(camera.position).add(forward);
}

orbit.update();

//floor mesh
let floorTexture = new THREE.TextureLoader().load('floor5.webp', () => {
    floorTexture.encoding = THREE.sRGBEncoding;
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 6);

});

const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: floorTexture,
        // visible: false
    }),
    new THREE.ShadowMaterial({
        opacity: 1,
    })
);

floorMesh.receiveShadow = true;
floorMesh.castShadow = true;
floorMesh.frustumCulled = false;

floorMesh.rotateX(-Math.PI / 2);
floorMesh.position.set(20, 0, -20);
floorMesh.material.color.setHex(0xEAEAEA);
scene.add(floorMesh);


//roof mesh
let roofTexture = new THREE.TextureLoader().load('wall-texture.webp', () => {
    roofTexture.encoding = THREE.sRGBEncoding;
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.set(6.5, 5);
});

const roofMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: roofTexture,
        // visible: false
    })
);

roofMesh.rotateX(-Math.PI / 2);
roofMesh.position.set(20, 10.1, -20);
roofMesh.material.color.setHex(0xFFFFFF);
scene.add(roofMesh);

//group planes for nav
const clickPlane = [
    {
        planeNo: 1,
        dimension: [12, 28],
        position: [0, 0, -7.5],
        color: 0xEAEAEA,
    },
    {
        planeNo: 2,
        dimension: [12, 34.5],
        position: [19, 0, -11.5],
        color: 0xEAEAEA,
    },
    {
        planeNo: 3,
        dimension: [14, 25],
        position: [39, 0, -16],
        color: 0xEAEAEA,
    },
    {
        planeNo: 4,
        dimension: [45, 5],
        position: [17, 0, -45],
        color: 0xEAEAEA,
    },
    {
        planeNo: 4,
        dimension: [45, 5],
        position: [17, 0, -31],
        color: 0xEAEAEA,
    },
    {
        planeNo: 5,
        dimension: [7, 9],
        position: [9.5, 0, -17],
        color: 0xEAEAEA,
    },
    {
        planeNo: 6,
        dimension: [7, 9],
        position: [28.5, 0, -17],
        color: 0xEAEAEA,
    },
    {
        planeNo: 7,
        dimension: [6.5, 11],
        position: [42.7, 0, -34],
        color: 0xEAEAEA,
    },
    {
        planeNo: 8,
        dimension: [6, 9],
        position: [36.5, 0, -38],
        color: 0xEAEAEA,
    },
    {
        planeNo: 9,
        dimension: [4, 9],
        position: [-3.5, 0, -38],
        color: 0xEAEAEA,
    }
];


//click plane GROUP
const groupPlane = new THREE.Group();
scene.add(groupPlane);

clickPlane.forEach(clickPlanes => {
    const { planeNo, dimension, position, color } = clickPlanes;
    const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(...dimension),
        new THREE.MeshBasicMaterial({
            side: "THREE.DoubleSide",
            visible: false,
        }),
    );

    planeMesh.rotateX(-Math.PI / 2);
    planeMesh.position.set(...position);
    planeMesh.material.color.setHex(color);

    scene.add(planeMesh);
    groupPlane.add(planeMesh);

});

//highlightMesh
const highlightMesh = new THREE.Mesh(
    new THREE.RingGeometry(0.45, 0.25, 32),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        // visible:false,
        wireframe: true,
    })
);

highlightMesh.rotateX(-Math.PI / 2);
highlightMesh.position.set(0, -1, 0);
scene.add(highlightMesh);


//close annotations
const annotExit = document.querySelectorAll('.annotation-exit');
const annotBox = document.querySelectorAll('.annotation');

annotExit.forEach((exitButton) => {
    exitButton.addEventListener('pointerdown',
        (e) => {
            closeAnnot();
            e.stopPropagation();
        });
});

annotBox.forEach((boxArea) => {
    boxArea.addEventListener('pointerdown',
        (e) => {
            e.stopPropagation();
        });
});


function closeAnnot() {
    annotBox.forEach((closeAnnot) => {
        closeAnnot.classList.remove('showAnnotation');

    });
}


//wall raycaster
const mouse = new THREE.Vector2();
const raycasterWall = new THREE.Raycaster();

//mouse postioning and raycaster
const mousePositionFloor = new THREE.Vector2();
const raycasterFloor = new THREE.Raycaster();
const objects = [];

//wall clicks
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycasterWall.setFromCamera(mouse, camera);
    const intersects = raycasterWall.intersectObjects(modelContainer.children);
    const intersectsDesc = raycasterWall.intersectObjects(groupMesh.children);

    closeAnnot();

    if (intersects.length > 0) {
        const { link } = intersects[0].object.userData;


        console.log(link);

        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
    }

    if (intersectsDesc.length > 0) {
        document.querySelector(intersectsDesc[0].object.annotationClass).classList.add('showAnnotation');

        console.log(intersectsDesc[0].object.annotationClass);

        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
    }
}

window.addEventListener('pointerdown', onMouseClick, false);

//block clicks
window.addEventListener('pointerdown', (e) => {

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycasterWall.setFromCamera(mouse, camera);
    const intersectsBlock = raycasterWall.intersectObject(blockGroup);

    if (intersectsBlock.length > 0) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }
});

//nav clicks
window.addEventListener('pointerdown', (e) => {

    mousePositionFloor.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePositionFloor.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycasterFloor.setFromCamera(mousePositionFloor, camera);
    const intersectsFloor = raycasterFloor.intersectObject(groupPlane);

    if (intersectsFloor.length > 0) {

        const intersectFloors = intersectsFloor[0];
        const highlightPos = new THREE.Vector3().copy(intersectFloors.point).floor().addScalar(0.5);
        highlightMesh.position.set(highlightPos.x, 0.2, highlightPos.z);

        const objectExist = objects.find(function (object) {
            return (object.position.x === highlightMesh.position.x)
                && (object.position.z === highlightMesh.position.z)
        });

        if (!objectExist) {
            highlightMesh.material.color.setHex(0xFFFFFF);
        } else {
            highlightMesh.material.color.setHex(0xFF0000);

        }
        //the camera moving to intersects
        //just to know that new position is based off the highlightMesh on the plane
        let selectedObject = highlightMesh;

        let newPos = selectedObject.position.clone();
        newPos.y = camera.position.y;

        const tween = new TWEEN.Tween(camera.position).to(
            {
                x: newPos.x,
                y: newPos.y,
                z: newPos.z
            },
            2500
        );

        //the tweening animation
        tween.easing(TWEEN.Easing.Quadratic.Out);
        tween.start();
        tween.onUpdate(function () {
            updateCameraOrbit();
        }.bind(this));
        tween.onComplete(function () {
            updateCameraOrbit();
        }.bind(this));


        console.log('clicking on plane grid');


        closeAnnot();

        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }
});


//the animate function
function animate() {
  

    highlightMesh.rotation.z += 0.01;

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.toneMapping = THREE.LinearToneMapping;
    TWEEN.update();
    renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate);


//for responsive
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//model assets
const models = [
    {
        id: 'sculpture-2',
        gltf: 'sculpture2.glb',
        link: "sculpture",
        position: [45, 0, -44.5],
        scale: 11,
        rotate: [0],
    },
    {
        id: 'sculpture-3',
        gltf: 'sculpture1.glb',
        link: "sculpture",
        position: [38.5, 0.01, 1],
        scale: 3.5,
        rotate: [360],
    },
    {
        id: 'sculpture-4',
        gltf: 'sculpture4.glb',
        link: "sculpture",
        position: [29, 0, -24.6],
        scale: 5,
        rotate: [0],
    },
    {
        id: 'sculpture-5',
        gltf: 'sculpture6.glb',
        link: "sculpture",
        position: [16, 4, -37.5],
        scale: 1.5,
        rotate: [0],
    },
    {
        id: 'sculpture-6',
        gltf: 'sculpture7.glb',
        link: "sculpture",
        position: [6, 4, -37.5],
        scale: 0.1,
        rotate: [0],
    },
    {
        id: 'sculpture-7',
        gltf: 'sculpture5.glb',
        link: "sculpture",
        position: [26, 4, -37.5],
        scale: 1,
        rotate: [0],
    },
    {
        id: 'gallery-lights1',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [3, 2.5, -4],
        scale: 0.18,
        rotate: [0],
    },
    {
        id: 'gallery-lights2',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [2.5, 2.5, -15],
        scale: 0.18,
        rotate: [0],
    },
    {
        id: 'gallery-lights3',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [3, 3, -14],
        scale: 0.18,
        rotate: [Math.PI / -2],
    },
    {
        id: 'gallery-lights4',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [-2, 2.5, -3],
        scale: 0.18,
        rotate: [Math.PI / 2],
    },
    {
        id: 'gallery-lights5',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [-3, 2.5, -3],
        scale: 0.18,
        rotate: [600],
    },
    {
        id: 'gallery-lights6',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [18, 2.5, -3],
        scale: 0.18,
        rotate: [Math.PI / 2],
    },
    {
        id: 'gallery-lights7',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [21, 2.5, -4],
        scale: 0.18,
        rotate: [0],
    },
    {
        id: 'gallery-lights8',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [16, 3, -2],
        scale: 0.18,
        rotate: [Math.PI],
    },
    {
        id: 'gallery-lights9',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [37, 2.5, -24],
        scale: 0.18,
        rotate: [Math.PI / 2],
    },
    {
        id: 'gallery-lights11',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [13, 2.5, -25],
        scale: 0.18,
        rotate: [Math.PI / -2],
    },
    {
        id: 'gallery-lights12',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [23, 2.5, -25],
        scale: 0.18,
        rotate: [Math.PI / -2],
    },
    {
        id: 'gallery-lights13',
        gltf: 'gallery_lights.glb',
        link: "gallery-lights",
        position: [35, 5.5, -43],
        scale: 0.12,
        rotate: [Math.PI],
    },
];

//wall assets
const modelWall = [
    {
        id: 'wall-1',
        gltf: 'wall-1.glb',
        link: "wall",
        position: [0, 5, 9.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-1-extend',
        gltf: 'wall-1.glb',
        link: "wall",
        position: [19, 5, 9.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-1-extend-1',
        gltf: 'wall-1.glb',
        link: "wall",
        position: [39, 5, 9.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-2',
        gltf: 'wall-2.glb',
        link: "wall",
        position: [9.5, 5, 0],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-2-extend',
        gltf: 'wall-2.glb',
        link: "wall",
        position: [28.5, 5, 0],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-2-extend-1',
        gltf: 'wall-2.glb',
        link: "wall",
        position: [49.5, 5, 0],
        scale: 1,
        rotate: [0],
    },
    {
        id: 'wall-2-extend-2',
        gltf: 'wall-2.glb',
        link: "wall",
        position: [49.5, 5, -19.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-2-extend-3',
        gltf: 'wall-2.glb',
        link: "wall",
        position: [49.5, 5, -39.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-3',
        gltf: 'wall-3.glb',
        link: "wall",
        position: [-9.5, 5, 0],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-3-extend',
        gltf: 'wall-3.glb',
        link: "wall",
        position: [-9.5, 5, -19],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-3-extend-1',
        gltf: 'wall-3.glb',
        link: "wall",
        position: [-9.5, 5, -39],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-4',
        gltf: 'wall-4.glb',
        link: "wall",
        position: [0, 5, -25],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-4-extend',
        gltf: 'wall-4.glb',
        link: "wall",
        position: [0, 5, -49.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-4-extend-1',
        gltf: 'wall-4.glb',
        link: "wall",
        position: [19, 5, -49.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'wall-4-extend-2',
        gltf: 'wall-4.glb',
        link: "wall",
        position: [39, 5, -49.5],
        scale: 1,
        rotate: [0],
        color: 0xFFFFFF,
    },
    {
        id: 'stage',
        gltf: 'stage.glb',
        link: "stage",
        position: [17, 0.5, -38],
        scale: 1,
        rotate: [0],
        color: 0x0a0a0a,
    },
    {
        id: 'stage2',
        gltf: 'stage.glb',
        link: "stage",
        position: [7, 0.5, -38],
        scale: 1,
        rotate: [0],
        color: 0x0a0a0a,
    },
    {
        id: 'stage3',
        gltf: 'stage.glb',
        link: "stage",
        position: [25, 0.5, -38],
        scale: 1,
        rotate: [0],
        color: 0x0a0a0a,
    },
]

//load WALL model
let loader = new GLTFLoader();
modelWall.forEach(modelDetails => {
    const { gltf, scale, position, link, rotate, color } = modelDetails;
    loader.load(gltf, ({ scene }) => {
        scene.traverse(child => {
            child.userData.link = link;
            child.frustumCulled = false;
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(color),

            });
        });


        modelContainer.add(scene);
        scene.scale.set(scale, scale, scale);
        scene.position.set(...position);
        scene.rotation.y = rotate;
        scene.encoding = THREE.sRGBEncoding;
    });
});

//load model
models.forEach(modelDetails => {
    const { gltf, scale, position, link, rotate } = modelDetails;
    loader.load(gltf, ({ scene }) => {
        scene.traverse(child => {
            child.userData.link = link;
            child.frustumCulled = false;
            child.castShadow = true;
            child.receiveShadow = true;
        });
        modelContainer.add(scene);
        scene.scale.set(scale, scale, scale);
        scene.position.set(...position);
        scene.rotation.y = rotate;
        scene.encoding = THREE.sRGBEncoding;
    });
});

const ARTWORK_URL = 'http://localhost:3000/api/artworks';

// Use Axios to make a GET request
axios.get(ARTWORK_URL)
  .then(response => {
    
    //group the meshs
const groupMesh = new THREE.Group();
scene.add(groupMesh);

response.data.forEach(artDetails => {
    const { image: img, position, dimension, annotationClass, artId, rotateX, rotateY, rotateZ } = artDetails;
    let artTexture = new THREE.TextureLoader().load('http://localhost:3000' + img);
    let mesh = new THREE.Mesh(

        new THREE.BoxGeometry(...JSON.parse(dimension)),
        new THREE.MeshBasicMaterial({
            map: artTexture,
            transparent: true,
        }),
    );

    //important for color management
    artTexture.encoding = THREE.sRGBEncoding
    artTexture.wrapS = THREE.RepeatWrapping
    artTexture.wrapT = THREE.RepeatWrapping
    artTexture.magFilter = THREE.NearestFilter

    mesh.frustumCulled = false;

    mesh.annotationClass = annotationClass;

    scene.add(mesh);
    groupMesh.add(mesh);


    mesh.position.set(...JSON.parse(position));
    mesh.rotation.x = JSON.parse(rotateX);
    mesh.rotation.y = JSON.parse(rotateY);
    mesh.rotation.z = JSON.parse(rotateZ);

});
  })
  .catch(error => {
    console.error('There was a problem with the Axios request:', error);
  });

 

const artworks = [
    {
        artId: 'artwork1',
        img: 'artwork2.webp',
        position: [0, 4.5, -24.5],
        dimension: [8, 5, 0.05],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork1-desc',
        img: 'art-desc.jpg',
        position: [5, 3.5, -24.5],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-1',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork2',
        img: 'artwork3.webp',
        position: [-8.95, 4.5, -2],
        dimension: [0.05, 6.5, 5],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork2-desc',
        img: 'art-desc2.jpg',
        position: [-8.95, 2.8, -5.5],
        dimension: [0.05, 1, 1.6],
        annotationClass: '.annotation.artwork-2',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork3',
        img: 'artwork4.webp',
        position: [-8.95, 4, -14],
        dimension: [0.05, 5.9, 5],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork3-desc',
        img: 'art-desc3.jpg',
        position: [-8.95, 2.6, -17.5],
        dimension: [0.05, 1, 1.6],
        annotationClass: '.annotation.artwork-3',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork4',
        img: 'artwork5.webp',
        position: [0, 5, 9],
        dimension: [10.4, 8, 0.05],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork4-desc',
        img: 'art-desc4.jpg',
        position: [-6.2, 3, 9],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-4',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork5',
        img: 'artwork6.webp',
        position: [9, 4.5, -2],
        dimension: [0.05, 7, 13.3],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork5-desc',
        img: 'art-desc5.webp',
        position: [9, 2.8, 5.7],
        dimension: [0.05, 1, 1.6],
        annotationClass: '.annotation.artwork-5',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork6',
        img: 'artwork7.webp',
        position: [19, 5, 9],
        dimension: [12.5, 5, 0.05],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork6-desc',
        img: 'art-desc6.webp',
        position: [11.8, 3, 9],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-6',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork7',
        img: 'artwork8.webp',
        position: [28, 5, -2],
        dimension: [0.05, 6, 13.8],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork7-desc',
        img: 'art-desc7.webp',
        position: [28, 2.8, 6],
        dimension: [0.05, 1, 1.6],
        annotationClass: '.annotation.artwork-7',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork8',
        img: 'artwork9.webp',
        position: [10, 4.3, -4],
        dimension: [0.05, 4, 4],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork8-desc',
        img: 'art-desc8.webp',
        position: [10, 3, -7],
        dimension: [0.05, 1, 1.6],
        annotationClass: '.annotation.artwork-9',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork9',
        img: 'artwork10.webp',
        position: [10, 4.3, 1],
        dimension: [0.05, 3, 3],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork9-desc',
        img: 'art-desc9.webp',
        position: [10, 3, 3.5],
        dimension: [0.05, 1, 1.6],
        annotationClass: '.annotation.artwork-8',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
     // stop here
    {
        artId: 'artwork10-desc',
        img: 'art-desc10.webp',
        position: [42, 2.8, 0],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-11',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork11-desc',
        img: 'art-desc11.webp',
        position: [42, 2, -42.5],
        dimension: [0.05, 1, 1.6],
        annotationClass: '.annotation.artwork-10',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [100],
    },
    {
        artId: 'artwork11-desc',
        img: 'art-desc12.webp',
        position: [31, 2.5, -25],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-12',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork12-desc',
        img: 'art-desc13.webp',
        position: [28, 1.5, -36],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-13',
        rotateX: [200],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork13-desc',
        img: 'art-desc15.webp',
        position: [18, 1.5, -36],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-14',
        rotateX: [200],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'artwork14-desc',
        img: 'art-desc14.webp',
        position: [9, 1.5, -36],
        dimension: [1.6, 1, 0.05],
        annotationClass: '.annotation.artwork-15',
        rotateX: [200],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'directions',
        img: 'directions.webp',
        position: [48.5, 5, -20],
        dimension: [0, 10, 19],
        annotationClass: '.empty-annotation',
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
];

const artLight = [
    {
        artId: 'lightsource1',
        img: 'lightsource.webp',
        position: [-8.9, 3, -2],
        dimension: [0, 12, 12],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
        order: 1,
    },
    {
        artId: 'bottomlight1',
        img: 'bottomlight.webp',
        position: [-8, 0.01, -2],
        dimension: [0, 5, 8],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [Math.PI / -2],
        order: 1,
    },
    {
        artId: 'lightsource2',
        img: 'lightsource.webp',
        position: [-8.9, 3, -14],
        dimension: [0, 12, 12],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
        order: 1,
    },
    {
        artId: 'bottomlight2',
        img: 'bottomlight.webp',
        position: [-8, 0.01, -14],
        dimension: [0, 5, 8],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [Math.PI / -2],
        order: 1,
    },
    {
        artId: 'lightsource3',
        img: 'lightsource.webp',
        position: [3, 5.5, 8.5],
        dimension: [10, 8, 0],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
        order: 3,
    },
    {
        artId: 'lightsource3',
        img: 'lightsource.webp',
        position: [-3, 6, 8.5],
        dimension: [10, 8, 0],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
        order: 10,
    },
    {
        artId: 'bottomlight3',
        img: 'bottomlight.webp',
        position: [0, 0.01, 8],
        dimension: [15, 5, 0],
        rotateX: [Math.PI / -2],
        rotateY: [0],
        rotateZ: [0],
        order: 10,
    },
    {
        artId: 'lightsource4',
        img: 'lightsource.webp',
        position: [8.9, 4.5, -5.5],
        dimension: [0, 8, 10],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'lightsource4',
        img: 'lightsource.webp',
        position: [8.9, 4.5, 0],
        dimension: [0, 8, 10],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'bottomlight4',
        img: 'bottomlight.webp',
        position: [8.9, 0.01, 0],
        dimension: [0, 5, 15],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [Math.PI / 2],
    },
    {
        artId: 'lightsource5',
        img: 'lightsource.webp',
        position: [0, 3, -24.4],
        dimension: [12, 12, 0],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'bottomlight5',
        img: 'bottomlight.webp',
        position: [0, 0.01, -24.4],
        dimension: [10, 8, 0],
        rotateX: [Math.PI / 2],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'lightsource6',
        img: 'lightsource.webp',
        position: [22, 5, 8.9],
        dimension: [10, 8, 0],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'lightsource6',
        img: 'lightsource.webp',
        position: [15, 5, 8.9],
        dimension: [10, 8, 0],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'bottomlight6',
        img: 'bottomlight.webp',
        position: [18, 0.01, 8.8],
        dimension: [20, 5, 0],
        rotateX: [Math.PI / -2],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'lightsource7',
        img: 'lightsource.webp',
        position: [10.1, 4, -2],
        dimension: [0, 12, 15],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'bottomlight7',
        img: 'bottomlight.webp',
        position: [10.1, 0.01, -2],
        dimension: [5, 17, 0],
        rotateX: [Math.PI / 2],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'lightsource8',
        img: 'lightsource.webp',
        position: [27.9, 6, -2],
        dimension: [0, 8, 15],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'bottomlight8',
        img: 'bottomlight.webp',
        position: [27.9, 0.01, -2],
        dimension: [0, 5, 15],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [Math.PI / 2],
    },
];

const backDrop = [
    {
        artId: 'backdrop-1',
        img: 'wallart1.webp',
        position: [39, 5, 8.9],
        dimension: [20, 10, 0],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'backdrop-2',
        img: 'wallart1.webp',
        position: [29.01, 5, -0.5],
        dimension: [0, 10, 19],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'backdrop-3',
        img: 'wallart3.webp',
        position: [-8.91, 5, -37.2],
        dimension: [0, 10, 23.5],

        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
    {
        artId: 'backdrop-4',
        img: 'wallart4.webp',
        position: [0.5, 5, -25.51],
        dimension: [19, 10, 0],
        rotateX: [0],
        rotateY: [0],
        rotateZ: [0],
    },
]

// //group the meshs
// const groupMesh = new THREE.Group();
// scene.add(groupMesh);

// artworks.forEach(artDetails => {
//     const { img, position, dimension, annotationClass, artId, rotateX, rotateY, rotateZ } = artDetails;
//     let artTexture = new THREE.TextureLoader().load(img);
//     let mesh = new THREE.Mesh(

//         new THREE.BoxGeometry(...dimension),
//         new THREE.MeshBasicMaterial({
//             map: artTexture,
//             transparent: true,
//         }),

//     );

//     //important for color management
//     artTexture.encoding = THREE.sRGBEncoding
//     artTexture.wrapS = THREE.RepeatWrapping
//     artTexture.wrapT = THREE.RepeatWrapping
//     artTexture.magFilter = THREE.NearestFilter

//     mesh.frustumCulled = false;

//     mesh.annotationClass = annotationClass;

//     scene.add(mesh);
//     groupMesh.add(mesh);


//     mesh.position.set(...position);
//     mesh.rotation.x = rotateX;
//     mesh.rotation.y = rotateY;
//     mesh.rotation.z = rotateZ;

// });

//artLight
artLight.forEach(artLights => {
    const { img, position, dimension, rotateX, rotateY, rotateZ, order } = artLights;
    let lightTexture = new THREE.TextureLoader().load(img);
    let mesh = new THREE.Mesh(

        new THREE.BoxGeometry(...dimension),
        new THREE.MeshBasicMaterial({
            map: lightTexture,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4
        }),
    );

    mesh.frustumCulled = false;
    scene.add(mesh);

    mesh.renderOrder = order;


    mesh.position.set(...position);
    mesh.rotation.x = rotateX;
    mesh.rotation.y = rotateY;
    mesh.rotation.z = rotateZ;

});

//backdrop
backDrop.forEach(artDetails => {
    const { img, position, dimension, rotateX, rotateY, rotateZ } = artDetails;
    let artTexture = new THREE.TextureLoader().load(img);
    let mesh = new THREE.Mesh(

        new THREE.BoxGeometry(...dimension),
        new THREE.MeshStandardMaterial({
            map: artTexture,
            transparent: true,
        }),
        new THREE.ShadowMaterial({
            opacity: 1,
        }),

    );

    //important for color management
    artTexture.encoding = THREE.sRGBEncoding
    artTexture.wrapS = THREE.RepeatWrapping
    artTexture.wrapT = THREE.RepeatWrapping
    artTexture.magFilter = THREE.NearestFilter

    mesh.frustumCulled = false;
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    scene.add(mesh);

    mesh.position.set(...position);
    mesh.rotation.x = rotateX;
    mesh.rotation.y = rotateY;
    mesh.rotation.z = rotateZ;

});

const blockBox = [
    {
        dimension : [4,6,4],
        position : [28.6, 3, -25],
    },
    {
        dimension : [30, 6, 4],
        position : [16, 3, -38],
    },
]
const blockGroup = new THREE.Group();

blockBox.forEach(artDetails => {
    const { dimension , position } = artDetails;
    let blockMesh = new THREE.Mesh(

        new THREE.BoxGeometry(...dimension),
        new THREE.MeshBasicMaterial({
            transparent: true,
            wireframe: false,
            opacity: 0,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4
        }),

    );

    blockMesh.position.set(...position);
    blockGroup.add(blockMesh);
    scene.add(blockGroup);

});

//remove overlay
const overlay = document.querySelector('.preloader-overlay');

window.addEventListener('load', () => {
    overlay.classList.add('remove-overlay');
});


