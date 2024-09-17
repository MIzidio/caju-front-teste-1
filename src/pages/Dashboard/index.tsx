import Collumns from "./components/Columns";
import * as S from "./styles";
import SearchBar from "./components/Searchbar";
import { useEffect } from "react";
import { useRegistrationsContext } from "~/context/registrations";
import axios from "axios";
import { useNotification } from "~/context/notification";

const DashboardPage = () => {
	const { setRegistrations, setLoading } = useRegistrationsContext();
	const { setNotification } = useNotification();

	useEffect(() => {
		setLoading(true);

		const fetchRegistrations = async () => {
			try {
				const response = await axios.get("http://localhost:3000/registrations");

				setRegistrations(response.data);
				setNotification({
					message: "Dados carregados com sucesso",
					type: "success",
				});
			} catch (error) {
				setNotification({ message: "Erro ao carregar dados", type: "error" });
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchRegistrations();
	}, [setRegistrations, setLoading]);

	return (
		<S.Container>
			<SearchBar />
			<Collumns />
		</S.Container>
	);
};
export default DashboardPage;
