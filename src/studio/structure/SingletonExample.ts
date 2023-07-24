import {RiContactsBook2Line, RiNewspaperLine} from 'react-icons/ri';
import type {StructureBuilder} from 'sanity/desk';

export const Contact = (S: StructureBuilder) =>
	S.listItem()
	.title('SingletonExample')
	.icon(RiContactsBook2Line)
	.child(
		S.editor()
		.schemaType('singletonExample')
		.documentId('singletonExample')
		.title('SingletonExample')
		.views([S.view.form()]));