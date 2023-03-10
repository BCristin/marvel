import "./charInfo.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

import { Link } from "react-router-dom";
import setContent from "../../utils/setContent";

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const { getCharacter, clearError, process, setProcess } = useMarvelService();
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
		getCharacter(charID)
			.then(onCharLoaded)
			.then(() => setProcess("confirmed"));
	};
	const onCharLoaded = (char) => {
		setChar(char);
	};

	return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data;
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
