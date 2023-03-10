import "./comicsList.scss";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case "waiting":
			return <Spinner />;
		case "loading":
			return newItemLoading ? <Component /> : <Spinner />;
		case "confirmed":
			return <Component />;
		case "error":
			return <ErrorMessage />;
		default:
			throw Error("Unexpected proces state");
	}
};

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(1540);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { getAllComics, process, setProcess } = useMarvelService();
	useEffect(
		() => {
			onRequest(offset, true);
		}, // eslint-disable-next-line
		[]
	);
	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset)
			.then(onComicsListLoaded)
			.then(() => setProcess("confirmed"));
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
		return (
			<ul className="comics__grid">
				{arr.map((item) => {
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
				})}
			</ul>
		);
	}
	return (
		<div className="comics__list">
			{setContent(process, () => rederItems(comicsList), newItemLoading)}
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
