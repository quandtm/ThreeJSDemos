var renderer, scene, camera;

var cubeGeo, cubeMat, cubeMesh;

var sunLight;

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
    // We need normals to determine how light reflects off the surface
    cubeGeo.computeFaceNormals();
    // Phong is a different type of material that allows us to simulate light hitting the object and bouncing off.
    cubeMat = new THREE.MeshPhongMaterial();
    cubeMat.color = new THREE.Color(0x0000AA);
    cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(cubeMesh);

    // A directional light is a special light that illuminates any surfaces that point away from the direction setup for the light
    sunLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    // "Position" is used for simplicity, but it actually doesn't have a position. The light travels in a direction from the position to the center of the world at (0, 0, 0)
    sunLight.position.set(0, 1, 0.5);
    scene.add(sunLight);
}

function render(){
    requestAnimationFrame(render);
    
    var delta = clock.getDelta();
    cubeMesh.rotation.y += DegToRad(45) * delta;

    renderer.render(scene, camera);
}

createScene();
render();