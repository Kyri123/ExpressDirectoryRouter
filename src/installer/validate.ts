import * as fss from 'fs';
import * as fs from 'fs/promises';
import { join } from 'path';
import type { AppExpressSettings, ExpressApp } from '../types';

/**
 * validate the settings for app router
 * @private
 */
export async function validateInput(app: ExpressApp, settings: AppExpressSettings) {
	// test if the app is correct
	if (!app) throw new Error('app is required');

	if (!settings.source) settings.source = join(process.cwd(), 'src', 'routes');

	// read stats and should fail if not exists
	if (!fss.existsSync(settings.source)) throw new Error('source path does not exist');

	// test if the path is a directory
	const stats = await fs.stat(settings.source);
	if (!stats.isDirectory()) throw new Error('source path is not a directory');
}

/**
 * check if the value is undefined and return the default value if it is used for settings
 * @private
 */
export function shouldUse(value?: boolean, defaultValue = true) {
	if (value === undefined) return defaultValue;
	return value;
}
