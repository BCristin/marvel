import "./charInfo.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import { Link } from "react-router-dom";

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();
	// useEffect(
	// 	() => {
	// 		updateChar();
	// 		console.log("useEffect");
	// 	}, // eslint-disable-next-line
	// 	[]
	// );

	// componentDidUpdate(prevProps, prevState) {
	// 	// console.log("componentDidUpdate");
	// 	if (this.props.charID !== prevProps.charID) {
	// 		this.updateChar();
	// 	}
	// }

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line
	}, [props.charID]);

	const updateChar = () => {
		const { charID } = props;
		if (!charID) {
			return;
		}
		// this.loading.mao((item) => item); // eroare pt verificare
		clearError();
		getCharacter(charID).then(onCharLoaded);
	};
	const onCharLoaded = (char) => {
		setChar(char);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	const style = thumbnail.indexOf("image_not_available") > 0 ? "contain" : "cover";

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={{ objectFit: style }} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics[0].length > 0 ? null : "There is no comics with this character"}
				{comics[0].map((item, i) => {
					if (i > 10) {
						// eslint-disable-next-line
						return;
					}

					return (
						<Link to={`/comics/${item.id}`} className="char__comics-item" key={item.id}>
							{item.name}
						</Link>
					);
				})}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charID: PropTypes.number,
};

export default CharInfo;
