import { Helmet } from "react-helmet";
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content="Comics page" />
				<title>Comics page</title>
			</Helmet>
			<AppBanner />
			<ComicsList />
		</>
	);
};

export default ComicsPage;
