
var triangles = [];
var vertices = [];
var colors = [];
var positions = [];
var colorss;
var opacities;

var triangles_mesh;

function myTriangle (_id) {
  this.id = _id;

  this.print = function(){
    console.log(this);
	};

  this.min_d = this.max_d = this.min_val = this.max_val = 0;
  this.update = function () {

    if(modeIndex == 0 || modeIndex == 1){
      this.min_d = 0;
      this.max_d = window.innerHeight/2.75;
      this.min_val = .75;
      this.max_val = 0;
    }
    if(modeIndex == 2){
      this.min_d = window.innerHeight / 4;
      this.max_d = window.innerHeight * 2.75;
      this.min_val = 0;
      this.max_val = .75;
    }

    var d = this.p[0].distanceTo(new THREE.Vector3(window.innerWidth/2, window.innerHeight/2, 0));

    if(d > this.min_d && d < this.max_d) {
      this.posfaktor = map(d, this.min_d, this.max_d, this.min_val, this.max_val);
    }else{
      this.posfaktor = 0;
    }

    if (this.angle < Math.PI) {
      this.angle += this.speed/30;
    }else{
      this.angle = 0;
    }
	};
}

function createTriangles(x_amount){

  var s = window.innerWidth / x_amount;
  var h = s/2 * Math.sqrt(3);
  var y_amount = Math.floor(window.innerHeight / h);
  var index = 0;
  var z = 0;

  console.log ("triangles in x-dir: " + x_amount);
  console.log ("triangles in y-dir: " + y_amount * 2);
  console.log ("triangleWidth: " + s);
  console.log ("triangleHeight: " + h);

  for (var i = 0; i < x_amount; i++){
    for (var j = 0; j < y_amount; j++){

      var x = s/2 + i * s;
      var y = h + j * h;
      if (j%2 != 0) {
        x -= s/2;
      }

      for(var v = -1; v<=1; v++){
        if(v!=0){
          var t = new myTriangle();
          t.id = index;
          t.p = [];
          t.p[0] = new THREE.Vector3(x - s/2, y, z);
          t.p[1] = new THREE.Vector3(x + s/2, y, z);
          t.p[2] = new THREE.Vector3(x, y + (h * v), z);
          t.angle = Math.random(0, Math.PI*2);
          t.speed = Math.random(0.1, 1);
          t.posfaktor = Math.random(0.1, 1);
          triangles.push(t);
          index++;
        }
      }
    }
  }
  updateTriangles();
  console.log("triangles: " + index);
}

function trianglesToScene(){

  for(var i = 0; i < triangles.length; i++){
    var col = new THREE.Vector4(.95, .95, .95, 0);
    for(var j = 0; j < triangles[i].p.length; j++){
      vertices.push(triangles[i].p[j]);
      colors.push(col);
    }
  }

  positions = new Float32Array(vertices.length * 3);
  colorss = new Float32Array(vertices.length * 4);

  for (var i = 0; i < vertices.length; i++) {
    var vertex = vertices[i];
    vertex.toArray(positions, i * 3);
    colors[i].toArray(colorss, i * 4);
  }
  //console.log(colors);

  var geo = new THREE.BufferGeometry();
  geo.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.addAttribute('colors', new THREE.BufferAttribute(colorss, 4));

  var uniforms = {}
  mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,
    transparent: true,
    side: THREE.DoubleSide,
    //wireframe: true
	});
  triangles_mesh = new THREE.Mesh(geo, mat);
  triangles_mesh.position.z = -800;
  scene.add(triangles_mesh);
  //console.log(triangles_mesh);
}

var index = 0;
function updateTrianglesOpacity(){
  for (var i = 0; i < colors.length; i++) {
    if(i%3 == 0){
    index = i/3;
    }
    if (triangles[index].posfaktor != 0) {
      colors[i].w = Math.sin(triangles[index].angle) * triangles[index].posfaktor;
    }else{
      colors[i].w = 0;
    }

    if(modes.length > 0 && anyButtonClicked(modes[2].buttons) && modeIndex > 1){
      if(i%6 == 0){
        colors[i].x += .1 * (modes[2].buttons[clickedButton(modes[2].buttons)].col.r- colors[i].x);
        colors[i].y += .1 * (modes[2].buttons[clickedButton(modes[2].buttons)].col.g- colors[i].y);
        colors[i].z += .1 * (modes[2].buttons[clickedButton(modes[2].buttons)].col.b- colors[i].z);
      }
    }else{
      colors[i].x += .1 * (.75 - colors[i].x);
      colors[i].y += .1 * (.75 - colors[i].y);
      colors[i].z += .1 * (.75 - colors[i].z);
    }
    colors[i].toArray(colorss, i * 4);
  }
  triangles_mesh.geometry.attributes.colors.needsUpdate = true;
  //console.log(modeIndex);
}

function printTriangles(){
	for (var i = 0; i < triangles.length; i++){
   	triangles[i].print();
  }
}
function updateTriangles(){
  for(var i = 0; i < triangles.length; i++){
    triangles[i].update();
  }
}

var posIndex = 0;
function updateTrianglesPosition(_index){

  if (_index == 0) {
    scene.add(triangles_mesh);
  }

  if (_index == 1) {
    scene.remove(triangles_mesh);
  }
}
