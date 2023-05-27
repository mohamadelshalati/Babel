import * as THREE from 'https://cdn.skypack.dev/three@v0.137';
//import { OrbitControls } from 'https://cdn.skypack.dev/three@v0.137/examples/jsm/controls/OrbitControls.js';
import { OrbitControls } from './OrbitControls.js';
import vertexShader from '../shaders/vertex.glsl.js'
import fragmentShader from '../shaders/fragment.glsl.js'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl.js'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl.js'
import { Float32BufferAttribute } from 'https://cdn.skypack.dev/three@v0.137';

const canvasContainer = document.querySelector(
    '.globe')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,
    (canvasContainer.offsetWidth) /
    (canvasContainer.offsetHeight) ,
       0.1,
        1000
    )

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha: true,
    canvas: document.querySelector('canvas')
})


renderer.setSize(canvasContainer.offsetWidth,
canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)
//document.body.appendChild(renderer.domElement)

//create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{
            globeTexture: {
                value: new THREE.TextureLoader().load('./img/2k_earth_nightmap.jpg')
            }
        }
    })
)



//create atmosphere
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader:
            atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
)
atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere)

const group = new THREE.Group ()
group.add(sphere)
scene.add(group)

camera.position.z = 10

//stars
// const starGeometry = new THREE.BufferGeometry()
// const starMaterial = new THREE.PointsMaterial({
//     color: 0xffffff
// })
// const starVertices = []
// for (let i = 0; i < 20000; i++){
//     const a = (Math.random() - 0.5) * 2000
//     const x = (Math.random() - 0.5) * 2000
//     const y = (Math.random() - 0.5) * 2000
//     const z = -Math.random() * 1000
//     starVertices.push(a, x, y, z)
// }
// starGeometry.setAttribute('position',
// new THREE.Float32BufferAttribute(starVertices, 4))

// const stars = new THREE.Points(starGeometry, starMaterial)
//scene.add(stars)

// const mouse = {
//     x: undefined,
//     y: undefined
// }

// var isMouseDown;
// addEventListener('mousedown',()=>{
//     isMouseDown = true;
// })
// addEventListener('mouseup',()=>{
//     isMouseDown = false
// })
//const controls = new OrbitControls( camera, renderer.domElement );


function animate(){
    requestAnimationFrame(animate)
    //controls.update();
    renderer.render(scene, camera)
    sphere.rotation.y += 0.001
    // group.rotation.y = mouse.x * 0.5
    // group.rotation.x = -mouse.y * 0.5
    

}
animate()



// addEventListener('mousemove', ()=> {
//         mouse.x = (event.clientX / innerWidth)
//             * 2 - 1
//         mouse.y = -(event.clientY / innerHeight)
//             * 2 + 1
// })





