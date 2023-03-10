import "./singleComicPage.scss";

import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import useMarvelService from "../services/MarvelService";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";
import AppBanner from "../components/appBanner/AppBanner";
import { Helmet } from "react-helmet";

const SingleCharacterPage = () => {
	const { charId } = useParams();
	const [char, setChar] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line
	}, [charId]);

	const updateChar = () => {
		clearError();
		getCharacter(charId).then(onCharacterLoaded);
	};
	const onCharacterLoaded = (char) => {
		setChar(char);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;
	console.log();
	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

const View = ({ char }) => {
	const { name, fulldesc, thumbnail } = char;
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
