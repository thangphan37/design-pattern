//#classical pattern 1
function Parent(name) {
  this.name = name || "Adam";
}

Parent.prototype.say = function() {
  return this.name;
};

function Child(name) {}

function inherit(C, P) {
  C.prototype = new P();
}

inherit(Child, Parent);
//Drawbacks: constructor isn't be inherit, prototype is be inherit

//#classical pattern 2
function Child(a, c, b, d) {
  Parent.apply(this, arguments);
}

//Drawbacks: protoype isn't be inherit;
//Benefit: version copy if change child, parent no risk;

//#classical pattern 3
function Child(name) {
  Parent.apply(this, arguments);
}

Child.prototype = new Parent();

//Drawbacks: constructor is called twice; if delete child.name -> 'Adam'

//#classical pattern 4
function inherit(C, P) {
  C.prototype = P.prototype;
}

//Drawbacks: if prototype of child is changed, parent will be changed;

//#classical pattern 5
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
}
//If you want to save  prototype parent
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
}
