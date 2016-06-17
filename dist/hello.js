'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.hello = hello;
function hello() {
	var name = 'Foo';
	var greeting = 'Hello ' + name;

	if (false) {
		// Should not be covered
		return 'Good bye';
	}

	return greeting;
}
//# sourceMappingURL=hello.js.map
