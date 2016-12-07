var renderer, scene, camera;

var cubeGeo, cubeMat;
var cubes;

var clock;
var mousePos = new THREE.Vector2();

const MaxCubes = 250;
const MaxSpeed = 250;
const MaxAcceleration = 250;
const MinAcceleration = 100;
const AvoidDistance = 50;
const AvoidStrength = 5;

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
    camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000);
    camera.position.set(0, 0, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    cubeGeo = new THREE.BoxGeometry(20, 20, 20);

    cubes = [];
    for (var i = 0; i < MaxCubes; ++i)
    {
        cubes[i] = new THREE.Mesh(cubeGeo, cubeMat);
        cubes[i].position.x = Math.random() * window.innerWidth - (window.innerWidth / 2);
        cubes[i].position.y = Math.random() * window.innerHeight - (window.innerHeight / 2);
        cubes[i].velocity = new THREE.Vector3(0, 0, 0);

        cubes[i].acceleration = MinAcceleration + (Math.random() * (MaxAcceleration - MinAcceleration)); // Random acceleration
        //cubes[i].acceleration = MaxAcceleration; // Constant acceleration

        cubeMat = new THREE.MeshLambertMaterial();
        cubeMat.color = new THREE.Color(Math.random(), Math.random(), Math.random());
        scene.add(cubes[i]);
    }

    sunLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    sunLight.position.set(0, 1, 0.5);
    scene.add(sunLight);
}

function render(){
    requestAnimationFrame(render);
    
    var delta = clock.getDelta();

    for (var i = 0; i < MaxCubes; ++i)
    {
        var dirToMouse = mousePos.clone();
        dirToMouse.sub(new THREE.Vector2(cubes[i].position.x, cubes[i].position.y));
        var length = dirToMouse.length();
        dirToMouse.normalize();
        var accel = cubes[i].acceleration;

        // Cubes try to avoid the cursor when they get too close
        if (length <= AvoidDistance)
            accel = -accel * ((AvoidDistance - length) / AvoidDistance) * AvoidStrength;

        dirToMouse.multiplyScalar(delta * accel);
        cubes[i].velocity.x += dirToMouse.x;
        cubes[i].velocity.y += dirToMouse.y;

        // Set a maximum speed so the cubes don't fly around as much
        cubes[i].velocity.clamp(new THREE.Vector3(-MaxSpeed, -MaxSpeed, 0), new THREE.Vector3(MaxSpeed, MaxSpeed, 0));

        var vel = cubes[i].velocity.clone();
        vel.multiplyScalar(delta);
        cubes[i].position.add(vel);

        // Randomly rotate to add some life to it
        cubes[i].rotation.x += Math.random() * DegToRad(90) * delta;
        cubes[i].rotation.y += Math.random() * DegToRad(90) * delta;
        cubes[i].rotation.z += Math.random() * DegToRad(90) * delta;
    }

    renderer.render(scene, camera);
}

function onMouseMove(event){
    event.preventDefault();
    mousePos.x = ((event.clientX / window.innerWidth) * 2 - 1) * window.innerWidth / 2;
    mousePos.y = (-(event.clientY / window.innerHeight) * 2 + 1) * window.innerHeight / 2;
}

function onMouseClick(event){
    for (var i = 0; i < MaxCubes; ++i){
        cubes[i].position.x = Math.random() * window.innerWidth - (window.innerWidth / 2);
        cubes[i].position.y = Math.random() * window.innerHeight - (window.innerHeight / 2);
        cubes[i].velocity.set(0, 0, 0);
    }
}

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseClick);
createScene();
render();