import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { useRegistrationsContext } from "~/context/registrations";
import Loading from "../Loading";

const allColumns = [
	{ status: "REVIEW", title: "Pronto para revisar" },
	{ status: "APPROVED", title: "Aprovado" },
	{ status: "REPROVED", title: "Reprovado" },
];

const Collumns = () => {
	const { registrations, loading } = useRegistrationsContext();

	return (
		<S.Container>
			{allColumns.map((collum) => {
				return (
					<S.Column role="column" status={collum.status} key={collum.title}>
						<>
							<S.TitleColumn status={collum.status}>
								{collum.title}
							</S.TitleColumn>
							<S.CollumContent>
								{loading ? (
									<Loading />
								) : (
									registrations?.map((registration) => {
										if (registration.status === collum.status) {
											return (
												<RegistrationCard
													data={registration}
													key={registration.id}
												/>
											);
										}
									})
								)}
							</S.CollumContent>
						</>
					</S.Column>
				);
			})}
		</S.Container>
	);
};
export default Collumns;
