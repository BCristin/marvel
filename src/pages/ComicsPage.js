import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

const ComicsPage = () => {
	console.log("ComicsPage");

	return (
		<>
			<AppBanner />
			<ComicsList />
		</>
	);
};

export default ComicsPage;
