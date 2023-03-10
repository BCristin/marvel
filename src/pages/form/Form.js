import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import "./Form.scss";
const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.name}>{label}</label>
			<input {...props} {...field} />
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</>
	);
};
// const validate = (values) => {
// 	const errors = {};
// 	if (!values.name) {
// 		errors.name = "name este gol, completeaza te rog";
// 	} else if (values.name.length < 2) {
// 		errors.name = "minimum 2 simboluri";
// 	}

// 	if (!values.email) {
// 		errors.email = "email este gol, completeaza te rog";
// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
// 		errors.email = "email gresit";
// 	}

// 	return errors;
// };

const CustomForm = () => {
	// const formik = useFormik({
	// 	initialValues: {
	// 		name: "",
	// 		email: "",
	// 		amount: 0,
	// 		currency: "",
	// 		text: "",
	// 		terms: false,
	// 	},
	// 	validationSchema: Yup.object({
	// 		name: Yup.string()
	// 			.min(2, "minim 2 siboluri")
	// 			.required("Trebuie completatat neaparat"),
	// 		email: Yup.string().email("email incorect").required("Trebuie sa fie email"),
	// 		amount: Yup.number()
	// 			.min(5, "nu mai putin de 5")
	// 			.required("Trebuie sa fie neaparat"),
	// 		currency: Yup.string().required("alege moneda"),
	// 		text: Yup.string().min(10, "nu mai putind de 10caractere"),
	// 		terms: Yup.boolean()
	// 			.required("Trebuie acordul dvs.")
	// 			.oneOf([true], "Trebuie acordul dvs."),
	// 	}),
	// 	onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
	// });
	return (
		<Formik
			initialValues={{
				name: "",
				email: "",
				amount: 0,
				currency: "",
				text: "",
				terms: false,
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.min(2, "minim 2 simboluri")
					.required("Trebuie completatat neaparat"),
				email: Yup.string().email("email incorect").required("Trebuie sa fie email"),
				amount: Yup.number()
					.min(5, "nu mai putin de 5")
					.required("Trebuie sa fie neaparat"),
				currency: Yup.string().required("alege moneda"),
				text: Yup.string().min(10, "nu mai putind de 10 caractere"),
				terms: Yup.boolean()
					.required("Trebuie acordul dvs.")
					.oneOf([true], "Trebuie acordul dvs."),
			})}
			onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
		>
			<Form className="form">
				<h2>Отправить пожертвование</h2>
				{/* <label htmlFor="name">Ваше имя</label>
				<Field id="name" name="name" type="text" />
				<ErrorMessage className="error" name="name" component="div" /> */}

				<MyTextInput label="Ваше им" id="name" name="name" type="text" />
				{/* <label htmlFor="email">Ваша почта</label>
				<Field id="email" name="email" type="email" />
				<ErrorMessage className="error" name="email" component="div" /> */}
				<MyTextInput label="Ваша почта" id="email" name="email" type="email" />

				{/* <label htmlFor="amount">Количество</label>
				<Field id="amount" name="amount" type="number" />
				<ErrorMessage className="error" name="amount" component="div" /> */}
				<MyTextInput label="Количество" id="amount" name="amount" type="number" />

				<label htmlFor="currency">Валюта</label>
				<Field id="currency" name="currency" as="select">
					<option value="">Выберите валюту</option>
					<option value="USD">USD</option>
					<option value="UAH">UAH</option>
					<option value="RUB">RUB</option>
				</Field>
				<ErrorMessage className="error" name="currency" component="div" />
				<label htmlFor="text">Ваше сообщение</label>
				<Field id="text" name="text" as="textarea" />
				<ErrorMessage className="error" name="text" component="div" />
				<label className="checkbox">
					<Field name="terms" type="checkbox" />
					Соглашаетесь с политикой конфиденциальности?
				</label>
				<ErrorMessage className="error" name="terms" component="div" />
				<button type="submit">Отправить</button>
			</Form>
		</Formik>
	);
};

export default CustomForm;
