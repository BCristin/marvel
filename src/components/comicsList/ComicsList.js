import "./comicsList.scss";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(1540);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getAllComics } = useMarvelService();
	useEffect(
		() => {
			onRequest(offset, true);
		}, // eslint-disable-next-line
		[]
	);
	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};
	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}
		setComicsList((comicsList) => [...comicsList, ...newComicsList]);
		setNewItemLoading(false);
		setOffset((offset) => offset + 8);
		setComicsEnded(ended);
	};
	function rederItems(arr) {
		return arr.map((item) => {
			const { title, id, price, thumbnail } = item;
			return (
				<li className="comics__item" key={id} tabIndex={0}>
					<Link to={`/comics/${id}`}>
						<img src={thumbnail} alt="name" className="comics__item-img" />
						<div className="comics__item-name">{title}</div>
						<div className="comics__item-price">{price}</div>
					</Link>
				</li>
			);
		});
	}
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{errorMessage}
			{spinner}
			<ul className="comics__grid">{rederItems(comicsList)}</ul>
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ display: comicsEnded ? "none" : "block" }}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
