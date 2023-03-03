import { Component } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";

export default class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 1540,
		charEnded: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		// console.log("componentDidMount \t", this.state);
		this.onRequest();
	}

	onRequest = (offset) => {
		// console.log("onRequest \t\t\t", this.state);

		this.onCharListLoading();

		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError);
	};

	onCharListLoading = () => {
		// console.log("onCharListLoading \t", this.state);

		this.setState({
			newItemLoading: true,
		});
	};

	onCharListLoaded = (newCharList) => {
		// console.log("onCharListLoaded \t", this.state);

		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		this.setState(({ offset, charList }) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended,
		}));
	};

	onError = () => {
		// console.log("onError \t", this.state);

		this.setState({
			error: true,
			loading: false,
		});
	};

	itemRefs = [];

	setRef = (ref) => {
		this.itemRefs.push(ref);
		// console.log("setRef \t", this.itemRefs, "end");
	};

	focusOnItem = (id) => {
		// console.log("focusOnItem \t", this.itemRefs);
		this.itemRefs.forEach((item) => item.classList.remove("char__item_selected"));
		this.itemRefs[id].classList.add("char__item_selected");
		this.itemRefs[id].focus();
		// console.log("focusOnItem \t", this.itemRefs, "end");
	};

	renderItems(arr) {
		// console.log("renderItems \t\t", this.state);

		return arr.map((item, i) => {
			const { name, thumbnail, id } = item;
			const style = thumbnail.indexOf("image_not_available") > 0 ? "unset" : "cover";
			return (
				<li
					className="char__item" // char__item_selected
					key={id}
					tabIndex={0}
					ref={this.setRef}
					onClick={() => {
						this.props.onCharSelected(id);
						this.focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === " " || e.key === "Enter") {
							this.props.onCharSelected(id);
							this.focusOnItem(i);
						}
					}}
				>
					<img src={thumbnail} alt={name} style={{ objectFit: style }} />
					<div className="char__name">{name}</div>
				</li>
			);
		});
	}

	render() {
		// console.log("render \t\t\t\t", this.state);

		const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;

		const items = this.renderItems(charList);

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				<ul className="char__grid">{content}</ul>
				<button
					className="button button__main button__long"
					disabled={newItemLoading}
					style={{ display: charEnded ? "none" : "block" }}
					onClick={() => this.onRequest(offset)}
				>
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};
