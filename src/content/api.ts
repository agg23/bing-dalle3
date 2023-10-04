export const fetchBlobWithRetry = async (
	url: string
): Promise<Blob | undefined> => {
	let blob = await fetchBlob(url);

	if (!blob) {
		// Retry after 2 seconds
		await timeout(2000);
		blob = await fetchBlob(url);
	}

	return blob;
};

const fetchBlob = async (url: string): Promise<Blob | undefined> => {
	const response = await fetch(url);

	if (!response.ok) {
		return undefined;
	}

	return response.blob();
};

const timeout = (duration: number) => {
	return new Promise<void>((resolve, _reject) => {
		setTimeout(() => {
			resolve();
		}, duration);
	});
};
