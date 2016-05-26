import React from 'react';
import { Route, Redirect } from 'react-router';

export default (
	<Route>
		<Route path='/' />
		<Route path='/about' />
		<Route path='/projects'>
			<Route path=':projectName'>
				<Route path='view' />
			</Route>
		</Route>
		<Route path='/contacts' />
		<Route path='/auth' />
		<Redirect from='/home' to='/' />
		<Route path='*' />
	</Route>
);
