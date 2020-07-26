/*
  *Factory là pattern: 
    -tạo object mà ko cần kiểu rõ ràng như class.
    -nhận tham số là type -> return object.
  *
  *
 */

function CarMaker() {}

CarMaker.prototype.drive = function() {
  return "Vroom, I have " + this.doors + " doors";
};

CarMaker.factory = function(type) {
  var constr = type,
    newcar;

  if (typeof CarMaker[constr] !== "function") {
    throw {
      name: "Error",
      message: constr + "doesn't exist"
    };
  }

  console.log(typeof CarMaker[constr].prototype.drive);
  if (typeof CarMaker[constr].prototype.drive !== "function") {
    CarMaker[constr].prototype = new CarMaker();
  }

  newcar = new CarMaker[constr]();
  return newcar;
};

CarMaker.Compact = function() {
  this.doors = 4;
};

CarMaker.Convertible = function() {
  this.doors = 2;
};

CarMaker.SUV = function() {
  this.doors = 24;
};
