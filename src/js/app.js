
//Components
import {projects, experiments} from "./projects";

//Libraries
let $ = require('jquery');
let glslify = require('glslify');

console.log(glslify);

// 3D Global Variables
let container, renderer, scene, camera, mesh, material, fov = 80;

$(document).ready(()=>{
    //Initialise the 3D scene
    init3D();

});



//Three.js 3D scene
function init3D() {
    //Setup the renderer
	container = document.getElementById( 'threeScene' );
    renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //Setup the scene
	scene = new THREE.Scene();

    //Setup the camera
    camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 10;
	camera.target = new THREE.Vector3( 0, 0, 0 );
	scene.add( camera );

    //Noise Shader material
	material = new THREE.ShaderMaterial( {

		uniforms: {
			time: { type: "f", value: 1 },
			weight: { type: "f", value: 5 }
		},

    vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    wireframe: true

	});

    //Geomtery
	mesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 20, 5 ), material );
	scene.add( mesh );

    //Event Listeners
	window.addEventListener( 'resize', onWindowResize, false );

	render();

}

function onWindowResize() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.projectionMatrix.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1100 );
}

var start = Date.now();

function render() {
    //Update the shader's uniforms
    material.uniforms[ 'weight' ].value = 5;
	material.uniforms[ 'time' ].value =  (Date.now() - start)*0.0001;

    renderer.render(scene, camera);

    requestAnimationFrame( render );
}