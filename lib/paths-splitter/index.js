/**
 * Module for splitting paths array in multiple arrays for support of large projects
 * @module pathsSplitter
 * @param {Array} [paths = []] Initial paths array (flattened)
 * @param {Number} [size = 49999]
 * @return {Array Array<String>} Array of Array of paths
 *
 * @example
 * import { pathsSplitter } from 'react-router-sitemap';
 *
 * const splitted = pathsSplitter(paths, 49999); // 49999 because of Google sitemap limits
 */

const pathsSplitter = (paths, size) => paths.map((path, i) => {
	return (i % size === 0) ? paths.slice(i, i + size) : null;
}).filter(e => e);

export default pathsSplitter;
