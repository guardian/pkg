import fs from 'fs';
import prettier from 'prettier';
import sortPackageJson from 'sort-package-json';
import { getUserFiles } from './utils/user-files';

export const lintPackage = () => {
	const { pkg } = getUserFiles();

	if (
		pkg.dependencies &&
		Object.keys(pkg.dependencies).some((dep) =>
			dep.startsWith('@guardian/'),
		)
	) {
		throw new Error(
			'@guardian packages can not be declared as dependencies. Use peerDependencies instead.',
		);
	}

	pkg.main = 'dist/cjs/index.js';
	pkg.module = 'dist/esm/index.js';
	pkg.types = 'dist/types/index.d.ts';
	pkg.files = ['dist', ...(pkg.files ?? [])];

	// @ts-expect-error -- this is not meant to exist, so TS is correct,
	// but we're making sure it's true in the IRL
	delete pkg.unpkg;

	fs.writeFileSync(
		'package.json',
		prettier.format(JSON.stringify(sortPackageJson(pkg)), {
			parser: 'json',
		}),
	);
};
