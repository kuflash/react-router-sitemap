export default {

	'/path-two/sub-path-two/:subParam': [
		{ subParam: 1 },
	],

	'/path-three/sub-path-three/:subParam': [
		{ subParam: [1, 2] },
	],

	'/path-three/sub-path-three/:subParam/:subSubParam': [
		{ subParam: 1, subSubParam: 'a' },
		{ subParam: [1, 2], subSubParam: 'a' },
		{ subParam: [1, 2], subSubParam: ['a', 'b'] },
	],

};
