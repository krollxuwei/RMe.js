/**
 * Created by xuwei on 15/4/15.
 */


String.prototype.startWith = function (str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
}

String.prototype.endWith = function (str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
}
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) { return false; }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
}