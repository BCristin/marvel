import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";

import "./charSearchForm.scss";

const CharSearchForm = () => {
	const [char, setchar] = useState(null);
	const { loading, getCharacterByName, clearError } = useMarvelService();

	const updateChar = (nameSearchChar) => {
		clearError();
		getCharacterByName(nameSearchChar)
			.then(setchar)
			.catch(() => setchar("error"));
	};

	console.log(char);
	const result = !char ? null : char === "error" ? (
		<div className="char__search-error">
			The character was not found. Check the name and try again
		</div>
	) : (
		<div className="char__search-wrapper">
			<div className="char__search-success">There is! Visit {char.name} page?</div>
			<Link to={`/characters/${char.id}`} className="button button__secondary">
				<div className="inner">To page</div>
			</Link>
		</div>
	);
	return (
		<div className="char__search-form">
			<Formik
				initialValues={{ charName: "" }}
				validationSchema={Yup.object({
					charName: Yup.string().required("This field is required"),
				})}
				onSubmit={({ charName }) => {
					updateChar(charName);
				}}
			>
				<Form>
					<label className="char__search-label" htmlFor="charName">
						Or find a character by name:
					</label>
					<div className="char__search-wrapper">
						<Field
							id="charName"
							name="charName"
							type="text"
							placeholder="Enter name"
							onClick={() => setchar(null)}
						/>

						<button type="submit" className="button button__main" disabled={loading}>
							<div className="inner">find</div>
						</button>
					</div>
					<ErrorMessage className="char__search-error" name="charName" component="div" />
					{result}
				</Form>
			</Formik>
		</div>
	);
};

export default CharSearchForm;
