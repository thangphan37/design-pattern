/*Singleton pattern là chỉ có 1 function
 * mà nếu từ lần thứ hai trở đi cùng sử dụng function đó để tạo 1 object mới,
 * thì sẽ lấy cùng vs object mà đã được tạo ở lần đầu tiên.
 * bằng cách sử dụng cache để lưu lại đối đượng đc tạo lần đầu tiên.
 */

//Solution1:
function Universe() {
  if (typeof Universe.instance == "object") {
    return Universe.instance;
  }

  this.start_time = 0;
  this.bang = "Big";

  //cache
  Universe.instance = this;
}

//case test
const uni = new Universe();
const uni2 = new Universe();
console.log(uni === uni2); //true;
//Drawback: instance bị public

//Solution2: Giải quyết drawback solution1;
function Universe() {
  var instance = this;

  this.start_time = 0;
  this.bang = "Big";

  //ghi đè lại constructor;
  Universe = function() {
    return instance;
  };
}

//case test
const uni = new Universe();
const uni2 = new Universe();
console.log(uni === uni2); //true;
//Benefit: instance ko bị public;
//Drawback: nếu add prototype sau khi khai báo lần đầu thì nó ko work từ lần tạo mới object thứ 2 trở đi;
//contructor đang trỏ đến Universe gốc ko phải Universe được ghi đè;
const uni = new Universe();
Universe.prototype.everything = true;
const uni2 = new Universe();
console.log(uni2.everything); //undefined;
console.log(uni.constructor === Universe); //false;
// Lý do uni.constructor khác Universe là khi khai báo uni nó đang trỏ đến function Universe() ở đầu,
// sau đó Universe đã được rewrite-> false để khắc phục điều này nên triển khai immediate function;
//Solution3: Giải quyết drawback solution2;

function Universe() {
  var instance;

  // Ghi đè constructor:
  Universe = function Universe() {
    return instance;
  };

  Universe.prototype = this;

  instance = new Universe();

  //set lại constructor
  instance.constructor = Universe;
  instance.start_time = 0;
  instance.bang = "Big";

  return instance;
}

//case test
const uni = new Universe();
Universe.prototype.everything = true;
const uni2 = new Universe();
console.log(uni === uni2); //true
console.log(uni.constructor === Universe && uni2.everything); //true;

//Final Solution:

var Universe;
(function() {
  var instance;
  Universe = function Universe() {
    if (instance) {
      return instance;
    }

    instance = this;
    this.start_time = 0;
    this.bang = "Big";
  };
})();
