var modeIndex = 0;
var modes = [];

var buttonSpacing = 220; //window.innerWidth * .125;
var buttonY = window.innerHeight * .75;

function Mode(_id){
  this.id = _id;
  this.act = this.sact = 0;
  this.buttons = [];
  this.grey = 0;

  this.update = function(index){
    //////////////////////////////////////////////////////////////////!!!!!
    this.act += .05 * (this.sact - this.act);
    //////////////////////////////////////////////////////////////////
    if(index == this.id){
      this.active = true;
    }else{
      this.active = false;
    }
    //////////////////////////////////////////////////////////////////
    if (this.active && this.counter < 201) this.counter++;
    if (!this.active) this.counter = 0;
    //////////////////////////////////////////////////////////////////
    if (this.active) this.sact = 1;
    if (!this.active) this.sact = 0;
    //////////////////////////////////////////////////////////////////
    if (this.sact == 1 && this.act > 0.99) this.act = 1;
    if (this.sact == 0 && this.act < 0.01) this.act = 0;
    //////////////////////////////////////////////////////////////////
  };

  this.createButtons = function(amount){
    for(var i = 0; i < amount; i++){
      var x = windowWidth/2 - (buttonSpacing * amount/2) + buttonSpacing/2 + (i * buttonSpacing);
      var button = new Button(x, buttonY, i, this.id);
      //button.loadThumb();
      button.setColor();
      this.buttons.push(button);
    }
  };

  this.setButtonsLabels = function() {
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      if (this.id == 1) {
        if (i == 0) button.label = "X";
        if (i == 1) button.label = "Y";
      }
      if (this.id == 2) {
        if (i == 0) button.label = "blaugrau";
        if (i == 1) button.label = "indigo";
        if (i == 2) button.label = "capri";
        if (i == 3) button.label = "schwarz";
        if (i == 4) button.label = "beere";
        if (i == 5) button.label = "petrol";
        if (i == 6) button.label = "oliv";
      }
      if (this.id == 3) {
        if (i == 0) button.label = "dunkelgrau";
        if (i == 1) button.label = "blau";
        if (i == 2) button.label = "rot";
        if (i == 3) button.label = "grau";
        if (i == 4) button.label = "braun";
      }
      if (this.id == 4) {
        if (i == 0) button.label = "Position 1";
        if (i == 1) button.label = "Position 2";
      }
      if (this.id == 5) {
        if (i == 0) button.label = "keine";
        if (i == 1) button.label = "Dreiecke";
      }
    }
  };

  this.updateButtons = function(_mouse, _index){
    for(var i = 0; i < this.buttons.length; i++){
      this.buttons[i].update(_mouse, _index);
    }
  };

  this.displayButtons = function(){
    for(var i = 0; i < this.buttons.length; i++){
      this.buttons[i].display();
    }
  }

  this.displayButtonsLabels = function(){
    for(var i = 0; i < this.buttons.length; i++){
      this.buttons[i].displayLabel();
    }
  }

  this.displayHint = function(){
    fill((1 - this.grey) * 255, 255 * this.act);
    if(this.hint != null) text(this.hint, window.innerWidth * .5, window.innerHeight * .2);
  };

  this.clickButtons = function () {
    for(var i = 0; i < this.buttons.length; i++){
      this.buttons[i].click(this.buttons);
    }
  };
}

function displayModes(_index){
  textFont(labelFont, 14);
  textAlign(CENTER, CENTER);
  noStroke();
  for(var i = 0; i < modes.length; i++){
    if(i > _index - 2 && i < _index + 2){
      tint((1 - activeMode.grey) * 255, 255 * modes[i].act);
      fill((1 - activeMode.grey) * 255, 255 * modes[i].act);
      modes[i].displayHint();
      modes[i].displayButtonsLabels(_index);
      modes[i].displayButtons(_index);
    }
  }
}

function updateModes(_index, _mouse){
  for(var i = 0; i < modes.length; i++){
    modes[i].update(_index);
  }
}

function clickModesButtons(){
  for(var i = 0; i < modes.length; i++){
    modes[i].clickButtons(modes[i].buttons);
  }
}

function setModes(amount){
  for(var i = 0; i < amount; i++){
    var mode = new Mode(i);
    if (i == 1) {
      mode.hint = "Wähle dein Modell";
      mode.createButtons(2);
    }
    if (i == 2) {
      mode.hint = "Wähle deine Farbe";
      mode.createButtons(7);
    }
    if (i == 3) {
      mode.hint = "Wähle dein Glas";
      mode.createButtons(5);
    }
    if (i == 4) {
      mode.hint = "Wähle die Position des Logos";
      mode.createButtons(2);
    }
    if (i == 5) {
      mode.hint = "Wähle deine Textur";
      mode.createButtons(2);
    }
    if (i == 6) {
      mode.hint = "Wähle deine Gravur";
      mode.createButtons(2);
    }
    if (i == 7) mode.hint = "Überprüfe deine Auswahl";
    if (i == 8) mode.createButtons(2);
    if (i > 1) mode.grey = .925;
    mode.act = 0;
    mode.setButtonsLabels();
    modes.push(mode);
  }
  //console.log(modes);
}
