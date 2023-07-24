"use client"

const ArchivePreview = (props: any) => {
	const {displayed} = props.document;

	if (!displayed?.slug?.current) {
		return <div>The post needs a slug before it can be previewed.</div>;
	}

	const url = new URL('/api/preview', location.origin);
	url.searchParams.set('slug', displayed.slug.current);
	url.searchParams.set('type', 'archive');
	console.log(url.toString());

	return (
		<div style={{width: '100%', height: '100%', position: 'relative', zIndex: 1}}>
			<div>
				<iframe
					src={url.toString()}
					style={{border: 0, height: '100%', left: 0, position: 'absolute', top: 0, width: '100%'}}
				/>
			</div>
		</div>
	);
};

export default ArchivePreview;
