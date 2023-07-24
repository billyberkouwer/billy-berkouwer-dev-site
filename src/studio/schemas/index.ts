import externalLink from './objects/external-link';
import link from './objects/link';
import metaFields from './objects/meta';
import simpleBlockContent from './objects/simple-block-content';

import blockContent from './sections/block-content';
import { SchemaTypeDefinition } from 'sanity';
import mainImage from './sections/main-image';

export const schemasTypes = [
	externalLink,
	mainImage,
	metaFields,
	link,
	simpleBlockContent,
	blockContent,
] as SchemaTypeDefinition[];
