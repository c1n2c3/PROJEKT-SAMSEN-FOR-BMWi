
///////////////////////////////////////////////////////////////////////////

function map(input, min1, max1, min2, max2){
      return min2 + (input/(max1 - min1)) * (max2-min2);
}

function random(min, max) {
      return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
