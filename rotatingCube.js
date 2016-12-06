var renderer, scene, camera;

var cubeGeo, cubeMat, cubeMesh;

var clock;

function DegToRad(deg) {
    return deg * (Math.PI / 180);
}

function createScene(){
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    cubeMat = new THREE.MeshBasicMaterial();
    cubeMat.color = new THREE.Color(0x0000AA);
    cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(cubeMesh);
}

function render(){
    requestAnimationFrame(render);
    
    // Update the scene for this frame
    var delta = clock.getDelta();
    // Spin the cube around the Y axis, 45 degrees per second
    // We have to multiply the amount we want to rotate by (in seconds) by the amount of time since the last frame.
    // We do this to figure out how much to rotate this frame so that we can achieve a rotation of 45 degrees per second.
    // The internal maths also expects the rotation in radians, so we need to convert using the helper at the top of the file.
    cubeMesh.rotation.y += DegToRad(45) * delta;

    renderer.render(scene, camera);
}

createScene();
render();