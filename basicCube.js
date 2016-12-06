var renderer, scene, camera;

var cubeGeo, cubeMat, cubeMesh;

function createScene(){
    // Setup the renderer and fill the window
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    // Let the browser know that we want to see the output of the renderer
    document.body.appendChild(renderer.domElement);

    // The scene holds the objects, lights and materials that are used to create the image
    scene = new THREE.Scene();
    // The camera provides a view into the scene.
    // The first parameter specifies the vertical field of view of the camera, in degrees.
    // The second parameter specifies the aspect ratio we want to use. The horizontal field of view is calculated using this and the vertical field of view.
    // The third parameter specifies the "near plane". The minimum distance from the camera where objects are visible.
    // The final parameter specifies the "far plane". The maximum distance from the camera where objects are visible.
    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    // We want to place the camera a little above the cube, and in front of it.
    camera.position.set(0, 1, 2);
    // Then make it look at the center of the scene.
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // Create a basic cube, where each side is 1 unit in length.
    cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    // We need a material to describe how the geometry will appear in the image.
    // Try changing the wireframe to false.
    cubeMat = new THREE.MeshBasicMaterial();
    cubeMat.color = new THREE.Color(0x0000AA);
    cubeMat.wireframe = true;
    // The cube geometry and the material need to be associated with each other.
    cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(cubeMesh);
}

function render(){
    // Tell the browser we want to use this function to draw the next frame.
    requestAnimationFrame(render);
    // Draw the scene
    renderer.render(scene, camera);
}

// Javascript runs everything outside of a function when the page loads, so we setup the scene and ask it to render the first frame.
createScene();
render();