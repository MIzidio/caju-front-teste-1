import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface Registration {
	id: string;
	admissionDate: string;
	email: string;
	employeeName: string;
	status: string;
	cpf: string;
}

interface RegistrationsContext {
	registrations: Registration[];
	setRegistrations: Dispatch<SetStateAction<Registration[]>>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

export const RegistrationsContext = createContext<RegistrationsContext>({
	registrations: [],
	setRegistrations: () => {},
	loading: false,
	setLoading: () => {},
});

export function useRegistrationsContext() {
	const { registrations, setRegistrations, loading, setLoading } =
		useContext(RegistrationsContext);

	return { registrations, setRegistrations, loading, setLoading };
}
