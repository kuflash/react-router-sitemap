import React from 'react';

/**
 * @description Use React method to test if is a valid React Element.
 * @param {Object} object - Which to test if is valid React Element.
 * @return {Boolean}
 * @ignore
 */
const isValidChild = object => {
	return object === null || React.isValidElement(object);
};

/**
 * @param {Object|array}
 * @return {Boolean}
 * @ignore
 */
const isReactChildren = object => {
	return isValidChild(object) || (Array.isArray(object) && object.every(isValidChild));
};

/**
 * @description Creates and returns a routes object from the given ReactChildren. JSX
 * provides a convenient way to visualize how routes in the hierarchy are
 * nested.
 * @param {ReactChildren} children - ReactChildren in JSX
 * @return {Object} routes object
 * @ignore
 */
const createRoutesFromReactChildren = children => {
	const routes = [];

	/**
	 * @param {Object} element - ReactChild
	 * @return {Object} route object
	 * @ignore
	 */
	const createRouteFromReactElement = element => {
		const type = element.type;
		const route = Object.assign({}, type.defaultProps, element.props);

		if (route.children) {
			const childRoutes = createRoutesFromReactChildren(route.children, route);

			if (childRoutes.length) {
				route.childRoutes = childRoutes;
			}
			delete route.children;
		}

		return route;
	};

	React.Children.forEach(children, function (element) {
		if (React.isValidElement(element)) {
			// Component classes may have a static create* method.
			if (element.type.createRouteFromReactElement) {
				const route = element.type.createRouteFromReactElement(element);

				if (route) {
					routes.push(route);
				}
			} else {
				routes.push(createRouteFromReactElement(element));
			}
		}
	});

	return routes;
};

export {
	isValidChild,
	isReactChildren,
	createRoutesFromReactChildren
};
