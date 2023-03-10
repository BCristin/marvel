import "./singleComicPage.scss";

import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import useMarvelService from "../services/MarvelService";
import AppBanner from "../components/appBanner/AppBanner";
import { Helmet } from "react-helmet";
import setContent from "../utils/setContent";

const SingleCharacterPage = () => {
	const { charId } = useParams();
	const [char, setChar] = useState(null);

	const { getCharacter, clearError, process, setProcess } = useMarvelService();

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line
	}, [charId]);

	const updateChar = () => {
		clearError();
		getCharacter(charId)
			.then(onCharacterLoaded)
			.then(() => setProcess("confirmed"));
	};
	const onCharacterLoaded = (char) => {
		setChar(char);
	};

	return (
		<>
			<AppBanner />
			{setContent(process, View, char)}
		</>
	);
};

const View = ({ data }) => {
	const { name, fulldesc, thumbnail } = data;
	return (
		<div className="single-comic">
			<Helmet>
				<meta name="description" content="Page {name}" />
				<title>Page {name}</title>
			</Helmet>
			<img src={thumbnail} alt={name} className="single-comic__char-img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{name}</h2>
				<p className="single-comic__descr">{fulldesc}</p>
			</div>
			<Link to="/" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};
export default SingleCharacterPage;
