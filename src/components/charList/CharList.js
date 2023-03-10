import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(1540);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(
		() => {
			onRequest(offset, true);
		}, // eslint-disable-next-line
		[]
	);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = async (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}
		setCharList([...charList, ...newCharList]);
		setNewItemLoading(false);
		setOffset(offset + 9);
		setCharEnded(ended);
	};

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
		itemRefs.current[id].classList.add("char__item_selected");
		itemRefs.current[id].focus();
	};

	function renderItems(arr) {
		return arr.map((item, i) => {
			const { name, thumbnail, id } = item;
			const style = thumbnail.indexOf("image_not_available") > 0 ? "unset" : "cover";
			return (
				<CSSTransition key={id} timeout={500} classNames="char__item">
					<li
						className="char__item"
						tabIndex={0}
						ref={(el) => (itemRefs.current[i] = el)}
						onClick={() => {
							props.onCharSelected(id);
							focusOnItem(i);
						}}
						onKeyPress={(e) => {
							if (e.key === " " || e.key === "Enter") {
								props.onCharSelected(id);
								focusOnItem(i);
							}
						}}
					>
						<img src={thumbnail} alt={name} style={{ objectFit: style }} />
						<div className="char__name">{name}</div>
					</li>
				</CSSTransition>
			);
		});
	}

	const items = renderItems(charList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			<ul className="char__grid">
				<TransitionGroup component={null}>{items}</TransitionGroup>
			</ul>
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ display: charEnded ? "none" : "block" }}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
