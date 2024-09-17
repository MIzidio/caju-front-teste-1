import * as S from "./styles";

interface StatusFilterProps {
	setStatus: (status: string) => void;
	status: string;
}

const StatusFilter = ({ setStatus, status }: StatusFilterProps) => {
	return (
		<S.Select value={status} onChange={(e: any) => setStatus(e.target.value)}>
			<option value="">Todos os Status</option>
			<option value="APPROVED">Aprovado</option>
			<option value="REPROVED">Reprovado</option>
			<option value="REVIEW">Pronto para revisar</option>
		</S.Select>
	);
};

export default StatusFilter;
