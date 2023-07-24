import {SanityImageSource} from '@sanity/asset-utils';
import createImageUrlBuilder from '@sanity/image-url';

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'undefined',
	useCdn: false,
	apiVersion: '2022-11-15'
};

export const urlForImage = (source: SanityImageSource) => createImageUrlBuilder(config).image(source);
