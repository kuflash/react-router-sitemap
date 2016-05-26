export default [
	{ path: '/path-one' },
	{
		path: '/path-two',
		childRoutes: [
			{ path: '/sub-path-two/:subParam' },
		],
	},
	{
		path: '/path-three',
		childRoutes: [
			{
				path: '/sub-path-three/:subParam',
				childRoutes: [
					{ path: ':subSubParam' },
				],
			},
		],
	},
];
