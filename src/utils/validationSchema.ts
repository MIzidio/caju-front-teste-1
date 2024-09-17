import * as yup from "yup";

export const schema = yup.object().shape({
	employeeName: yup
		.string()
		.required("Nome é obrigatório.")
		.matches(
			/^[^\d][a-zA-Z]+(?: [a-zA-Z]+)+$/,
			"Nome deve conter pelo menos dois grupos de letras separados por espaço, e a primeira letra não pode ser um número."
		)
		.min(2, "Nome deve ter no mínimo 2 letras."),
	cpf: yup
		.string()
		.required("CPF é obrigatório.")
		.matches(
			/^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
			"CPF inválido. Use o formato 000.000.000-00."
		),
	email: yup.string().required("Email é obrigatório.").email("Email inválido."),
	admissionDate: yup
		.string()
		.required("Data é obrigatória.")
		.typeError("Data inválida."),
});
