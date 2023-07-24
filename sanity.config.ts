import {SchemaTypeDefinition, defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';
import {singletonPlugin} from './src/studio/plugins/singletonPlugin';
import {previewDocumentNode} from './src/studio/plugins/preview';
import {schemasTypes} from './src/studio/schemas';
import {structure} from './src/studio/structure';
import type { InferSchemaValues } from "@sanity-typed/types";

const config = defineConfig({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
	name: 'Studio',
	basePath: '/studio',
	schema: {
		types: schemasTypes
	},
	plugins: [
		deskTool({
			structure,
			defaultDocumentNode: previewDocumentNode()
		}),
		singletonPlugin({types: ['about', 'contact']}),
		visionTool()
	]
});

export default config;

/* create typescript types */
type Values = InferSchemaValues<typeof config>;
export type ProjectType = Extract<Values, { _type: "project" }>;