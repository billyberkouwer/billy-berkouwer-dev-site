import type {StructureResolver} from 'sanity/desk';

// import PostPreview from '../components/previews/post/post-preview';
// import PagePreview from '../components/previews/page/page-preview';

export const structure: StructureResolver = (S, _context) =>
	S.list()
		.title('Content')
		.items([]);

export const defaultDocumentNode = (S: any, props: any) => {
	const {schemaType} = props;

	if (schemaType === 'previewPage') {
		// return S.document().views([S.view.form(), S.view.component(PostPreview).title('Preview Post')]);
	}

	return S.document().views([S.view.form()]);
};

export default structure;
