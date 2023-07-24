import {RiArticleLine} from 'react-icons/ri';
import type {StructureBuilder} from 'sanity/desk';

export const RegularStructureExample = (S: StructureBuilder) =>
	S.listItem()
		.title('RegularStructureExample')
		.icon(RiArticleLine)
		.child(S.documentTypeList('regularStructureExample').title('RegularStructureExample').filter('_type == $type').params({type: ''}));
