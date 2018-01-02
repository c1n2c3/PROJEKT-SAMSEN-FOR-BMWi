function Button (_x, _y, _id, _mode){

  this.x = _x;
  this.y = _y;
  this.id = _id;
  this.mode = _mode;
  //this.d = 40;
  this.label = '';

  this.loadThumb = function () {
    if (this.mode == 1) this.thumb = loadImage('thumbs/f' + this.id + '.png');
    if (this.mode == 2) this.thumb = loadImage('thumbs/fc' + this.id + '.png');
    if (this.mode == 3) this.thumb = loadImage('thumbs/gc' + this.id + '.png');
    if (this.mode == 4) this.thumb = loadImage('thumbs/lo' + this.id + '.png');
    if (this.mode == 5) this.thumb = loadImage('thumbs/mu' + this.id + '.png');
    if (this.mode == 6) this.thumb = loadImage('thumbs/gr' + this.id + '.png');
    if (this.mode == 8) this.thumb = loadImage('thumbs/last' + this.id + '.png');
  };

  this.update = function(_mouse, index){
    this.x = windowWidth/2 - (buttonSpacing * (modes[index].buttons.length)/2) + buttonSpacing/2 + (this.id * buttonSpacing);
    this.y = buttonY;

    var dist = p5.Vector.dist(_mouse, new p5.Vector(this.x, this.y));
    if (dist < this.d/2) {
      this.over = true;
    }else{
      this.over = false;
    }
    if (!this.over && !this.clicked) {
      this.d = windowWidth * .0225;
    }else{
      this.d = windowWidth * .0325;
    }
  };


  this.display = function(){
    if (this.col != null) fill(this.col.r * 255, this.col.g * 255, this.col.b * 255, 255 * modes[this.mode].act);
    ellipse(this.x, this.y, this.d, this.d);
  };

  this.displayLabel = function(){
    //if (this.thumb != null) image(this.thumb, this.x, this.y, this.d, this.d);
    fill((1 - activeMode.grey) * 255, 255 * modes[this.mode].act);
    if (this.mode == 2 || this.mode == 3) text(this.label, this.x, this.y + this.d * .75);
  };


  this.click = function(_buttons){
    if (this.over) {
      this.clicked = true;
      //console.log("hh");
      for (var i = 0; i < _buttons.length; i++) {
        if (i != this.id) _buttons[i].clicked = false;
      }
    }
  };

  this.setColor = function(){
    if (this.mode == 2){
      if (this.id == 0) this.col = new THREE.Color("rgb(30, 30, 50)");
      if (this.id == 1) this.col = new THREE.Color("rgb(35, 55, 135)");
      if (this.id == 2) this.col = new THREE.Color("rgb(15, 110, 185)");
      if (this.id == 3) this.col = new THREE.Color("rgb(40, 40, 40)");
      if (this.id == 4) this.col = new THREE.Color("rgb(115, 0, 45)");
      if (this.id == 5) this.col = new THREE.Color("rgb(0, 90, 90)");
      if (this.id == 6) this.col = new THREE.Color("rgb(130, 130, 100)");
    }
  };
}
/////////////////////////////////////////////////////////////////

var overAnyButton = function (_buttons) {
  for(var i = 0; i < _buttons.length; i++){
    if (_buttons[i].over) return true;
  }
}

var anyButtonClicked = function (_buttons) {
  for(var i = 0; i < _buttons.length; i++){
    if (_buttons[i].clicked) {
      return true;
    }
  }
}


var clickedButton = function (_buttons) {
  var buttonI;
  for(var i = 0; i < _buttons.length; i++){
    if (_buttons[i].clicked) buttonI = i;
  }
  return buttonI;
}
