const pathsWithParams = [
	'/path-one',
	'/path-two',
	'/path-two/sub-path-two/:subParam',
	'/path-three',
	'/path-three/sub-path-three/:subParam',
	'/path-three/sub-path-three/:subParam/:subSubParam',
];

const paths = [
	'/path-one',
	'/path-two',
	'/path-two/sub-path-two/1',
	'/path-three',
	'/path-three/sub-path-three/1',
	'/path-three/sub-path-three/2',
	'/path-three/sub-path-three/1/a',
	'/path-three/sub-path-three/1/a',
	'/path-three/sub-path-three/2/a',
	'/path-three/sub-path-three/1/a',
	'/path-three/sub-path-three/1/b',
	'/path-three/sub-path-three/2/a',
	'/path-three/sub-path-three/2/b',
];

export { paths, pathsWithParams };
