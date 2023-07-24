import type {DefaultDocumentNodeResolver} from 'sanity/desk';
import ArchivePreview from './archive-preview';

export const previewDocumentNode = (): DefaultDocumentNodeResolver => {
	return (S, {schemaType}) => {
		if (schemaType === 'project') {
			return S.document().views([S.view.form(), S.view.component(ArchivePreview).title('Preview Archive')]);
		}
		return S.document().views([S.view.form()]);
	};
};
