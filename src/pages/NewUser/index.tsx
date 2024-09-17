import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "~/utils/validationSchema";
import MaskedInput from "react-text-mask";
import type { Ref } from "react";
import axios from "axios";
import { useRegistrationsContext } from "~/context/registrations";
import { useNotification } from "~/context/notification";
import { formatCPF, formatDate } from "~/utils/fn";

interface FormInputs {
	employeeName: string;
	cpf: string;
	email: string;
	admissionDate: string;
}

const NewUserPage = () => {
	const history = useHistory();
	const goToHome = () => {
		history.push(routes.dashboard);
	};

	const { registrations, setRegistrations } = useRegistrationsContext();
	const { setNotification } = useNotification();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormInputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: FormInputs) => {
		const date = formatDate(data.admissionDate);
		const cpf = formatCPF(data.cpf);
		const newRegistration = {
			...data,
			admissionDate: date,
			cpf,
			status: "REVIEW",
		};
		try {
			const response = await axios.post(
				"http://localhost:3000/registrations",
				newRegistration
			);
			setRegistrations([...registrations, response.data]);
			setNotification({
				message: "Formulário enviado com sucesso!",
				type: "success",
			});
			history.push(routes.dashboard);
		} catch (error) {
			console.log(error);
			setNotification({
				message: "Erro ao enviar o formulário. Tente novamente.",
				type: "error",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<S.Container>
				<S.Card>
					<IconButton onClick={() => goToHome()} aria-label="back">
						<HiOutlineArrowLeft size={24} />
					</IconButton>
					<Controller
						name="employeeName"
						control={control}
						render={({ field }) => (
							<TextField
								placeholder="Nome"
								label="Nome"
								{...field}
								error={errors.employeeName?.message}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								placeholder="Email"
								label="Email"
								type="email"
								{...field}
								error={errors.email?.message}
							/>
						)}
					/>
					<Controller
						name="cpf"
						control={control}
						render={({ field }) => (
							<MaskedInput
								{...field}
								mask={[
									/\d/,
									/\d/,
									/\d/,
									".",
									/\d/,
									/\d/,
									/\d/,
									".",
									/\d/,
									/\d/,
									/\d/,
									"-",
									/\d/,
									/\d/,
								]}
								placeholder="000.000.000-00"
								render={(ref, props) => (
									<TextField
										placeholder="CPF"
										label="CPF"
										name="cpf"
										ref={ref as Ref<HTMLInputElement>}
										{...props}
										error={errors.cpf?.message}
										type="text"
									/>
								)}
							/>
						)}
					/>
					<Controller
						name="admissionDate"
						control={control}
						render={({ field }) => (
							<TextField
								id="admissionDate"
								label="Data de admissão"
								type="date"
								{...field}
								error={errors.admissionDate?.message}
							/>
						)}
					/>
					<Button data-test="submit-button" type="submit">
						Cadastrar
					</Button>
				</S.Card>
			</S.Container>
		</form>
	);
};

export default NewUserPage;
