import fs from 'node:fs/promises';
import YAML from 'yaml';
import path from 'node:path';
import { fileURLToPath } from '#runtime-utils.js';

/**
 * @param {string} url
 * @param {{ conditions: string[], format: string|null|undefined, importAttributes: Record<string|symbol, unknown> }} context
 * @param {(url: string, context: Context) => any} nextLoad
 * @returns {{ format: string, shortCircuit?: undefined|boolean, source: string|ArrayBuffer|Uint8Array|Buffer }}
 */
export async function load(url, context, nextLoad) {
	if (
		!['yaml', 'yml'].includes(context.importAttributes.type)
		&& !['.yaml', '.yml'].includes(path.extname(url))
	) {
		return nextLoad(url, context);
	}
	const filepath = fileURLToPath(url);
	const encoding = typeof context.importAttributes.encoding === 'string'
		? context.importAttributes.encoding
		: 'utf8';
	const content = await fs.readFile(filepath, encoding);
	const value = YAML.parse(content);
	return {
		format: 'module',
		shortCircuit: true,
		source: `export default ${JSON.stringify(value)};`,
	};
}
