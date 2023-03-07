import RandomChar from "../components/randomChar/RandomChar";
import CharInfo from "../components/charInfo/CharInfo";
import CharList from "../components/charList/CharList";
import decoration from "../resources/img/vision.png";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { useState } from "react";

const MainPage = () => {
	console.log("MainPage");

	const [selectedChar, setChar] = useState(null);
	const onCharSelected = (id) => {
		setChar(id);
	};
	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo charID={selectedChar} />
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	);
};

export default MainPage;
