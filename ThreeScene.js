var scene, threeCamera, renderer, light, light2;
var stats, stats1, stats2;
var backgroundMesh;
var frameY_Mesh;
var framePositions = [];
var frameYPositions;

function init(){
  setStats();
  setUpView();
  var geo = new THREE.PlaneGeometry(7000, 7000, 2, 2);
  var mat = new THREE.MeshBasicMaterial({color: 0x000000, flatShading: true});
  backgroundMesh = new THREE.Mesh(geo, mat);
  backgroundMesh.position.z = -1000;
  scene.add(backgroundMesh);
  createTriangles(80);
	trianglesToScene();
  updateTrianglesOpacity();

  loadModel('models/untitled_big.json');
}

function animate(){
  requestAnimationFrame(animate);
  updateStats();
  updateTriangles();
  render();
}

function render() {
  //threeCamera.position.x = window.innerWidth/2;
	//threeCamera.position.y = window.innerHeight/2;
  renderer.render(scene, threeCamera);

}

function setUpView(){
	scene = new THREE.Scene();
	threeCamera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 10000);
	threeCamera.position.x = window.innerWidth/2;
	threeCamera.position.y = window.innerHeight/2;
	threeCamera.position.z = 100;
	scene.add(threeCamera);

  light = new THREE.DirectionalLight( 0xffffff, 1 , 0, 0, -.5);
  light.position.z = 800;
  scene.add(light);
  light2 = new THREE.AmbientLight( 0xffffff, 1);
  scene.add(light2);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor('white');
  //console.log(renderer);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer .domElement);

  window.addEventListener('resize', onWindowResize, false);
}

function setStats(){
  stats = new Stats();
  stats.showPanel(0); // Panel 0 = fps
  stats.domElement.style.cssText = 'position:absolute;top:20px;left:20px;';
  document.body.appendChild(stats.domElement);

  stats1 = new Stats();
  stats1.showPanel(1);
  stats1.domElement.style.cssText = 'position:absolute;top:20px;left:100px;';
  document.body.appendChild(stats1.domElement);

  stats2 = new Stats();
  stats2.showPanel(2);
  stats2.domElement.style.cssText = 'position:absolute;top:20px;left:180px;';
  document.body.appendChild(stats2.domElement);
}
function updateStats(){
  stats.update();
  stats1.update();
  stats2.update();
}
function onWindowResize() {
  //threeCamera.position.x = window.innerWidth/2;
	//threeCamera.position.y = window.innerHeight/2;
  threeCamera.aspect = window.innerWidth / window.innerHeight;
  threeCamera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  render();
  updateTrianglesOpacity();
}


function loadModel(filename){
  var mat = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0, shininess: 0});
  var loader = new THREE.JSONLoader();
  //console.log(mat);
  loader.load(filename, handle_load);
  function handle_load(geometry){
    for(var i = 0; i < geometry.vertices.length; i += 60){
      framePositions.push(geometry.vertices[i]);
    }
    frameY_Mesh = new THREE.Mesh(geometry, mat);
    frameY_Mesh.position.x = window.innerWidth/2;
    frameY_Mesh.position.y = window.innerHeight/1.975;
    frameY_Mesh.position.z = -100;
    //console.log(frameY_Mesh);
    scene.add(frameY_Mesh);
  }
}
