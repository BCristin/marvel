import useHttp from "../hooks/http.hock";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();
	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=b16ba1ffdabf6add6419d3fb1f3dcd09";
	const _baseOffset = 1540;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};
	const getCharacterByName = async (nameChar) => {
		const res = await request(`${_apiBase}characters?name=${nameChar}&${_apiKey}`);
		return { id: res.data.results[0].id, name: res.data.results[0].name };
	};
	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};
	const getAllComics = async (offset = 0) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	};
	// console.log(getAllComics());
	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: "There is no description for this character",
			fulldesc: char.description
				? char.description
				: "There is no description for this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: [
				char.comics.items.map((item) => {
					return {
						name: item.name,
						id: item.resourceURI.replace(
							"http://gateway.marvel.com/v1/public/comics/",
							""
						),
					};
				}),
			],
		};
	};
	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} pages`
				: "No information about the number of pages",
			language: comics.textObjects.language || "en-us",
			price: comics.prices[0].price ? `${comics.prices[0].price} $` : "NOT available",
		};
	};
	return {
		loading,
		error,
		getAllCharacters,
		getComic,
		getCharacter,
		getAllComics,
		clearError,
		getCharacterByName,
	};
};

export default useMarvelService;
