import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import MaskedInput from "react-text-mask";
import { useState, useEffect, Ref } from "react";
import { useRegistrationsContext } from "~/context/registrations";
import axios from "axios";
import { formatCPF } from "~/utils/fn";
import StatusFilter from "../StatusFilter";

const SearchBar = () => {
	const history = useHistory();
	const { setRegistrations, setLoading } = useRegistrationsContext();

	const goToNewAdmissionPage = () => {
		history.push(routes.newUser);
	};

	const [cpf, setCPF] = useState("");
	const [status, setStatus] = useState("");

	useEffect(() => {
		setLoading(true);

		const fetchRegistrations = async () => {
			const registrationCpf = formatCPF(cpf);
			try {
				const response = await axios.get(
					`http://localhost:3000/registrations?cpf=${registrationCpf}&status=${status}`
				);

				setRegistrations(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchRegistrations();
	}, [setRegistrations, cpf, setStatus, status, setLoading]);

	const refresh = () => {
		window.location.reload();
	};

	return (
		<S.Container>
			<S.Filters>
				<MaskedInput
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
					value={cpf}
					onChange={(e: any) => setCPF(e.target.value)}
					render={(ref, props) => (
						<TextField
							ref={ref as Ref<HTMLInputElement>}
							{...props}
							placeholder="Digite um CPF válido"
						/>
					)}
				/>
				<StatusFilter status={status} setStatus={setStatus} />
			</S.Filters>
			<S.Actions>
				<IconButton aria-label="refetch">
					<HiRefresh onClick={refresh} />
				</IconButton>
				<Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
			</S.Actions>
		</S.Container>
	);
};

export default SearchBar;
