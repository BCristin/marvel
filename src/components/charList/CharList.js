import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
import useMarvelService from "../../services/MarvelService";

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(1540);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	// state = {
	// 	charList: [],
	// 	loading: true,
	// 	error: false,
	// 	newItemLoading: false,
	// 	offset: 1540,
	// 	charEnded: false,
	// };

	useEffect(
		() => {
			onRequest(offset, true);
		}, // eslint-disable-next-line
		[]
	);

	// componentDidMount() {
	// 	// console.log("componentDidMount \t", this.state);
	// 	this.onRequest();
	// }

	const onRequest = (offset, initial) => {
		// console.log("onRequest \t\t\t", this.state);
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (newCharList) => {
		// console.log("onCharListLoaded \t", this.state);

		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		// this.setState(({ offset, charList }) => ({
		// 	charList: [...charList, ...newCharList],
		// 	loading: false,
		// 	newItemLoading: false,
		// 	offset: offset + 9,
		// 	charEnded: ended,
		// }));

		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 9);
		setCharEnded((charEnded) => ended);
	};

	const itemRefs = useRef([]);

	// setRef = (ref) => {
	// 	this.itemRefs.push(ref);
	// 	// console.log("setRef \t", this.itemRefs, "end");
	// };

	const focusOnItem = (id) => {
		// console.log("focusOnItem \t", this.itemRefs);
		itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
		itemRefs.current[id].classList.add("char__item_selected");
		itemRefs.current[id].focus();
		// console.log("focusOnItem \t", this.itemRefs, "end");
	};

	function renderItems(arr) {
		// console.log("renderItems \t\t", this.state);

		return arr.map((item, i) => {
			const { name, thumbnail, id } = item;
			const style = thumbnail.indexOf("image_not_available") > 0 ? "unset" : "cover";
			return (
				<li
					className="char__item" // char__item_selected
					key={id}
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
			);
		});
	}

	// console.log("render \t\t\t\t", this.state);

	const items = renderItems(charList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	// const content = !(loading || error) ? items : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			<ul className="char__grid">{items}</ul>
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
