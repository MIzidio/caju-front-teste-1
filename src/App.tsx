import Router from "~/router";
import { Header } from "./components/Header";
import { Registration, RegistrationsContext } from "./context/registrations";
import { NotificationProps, NotificationContext } from "./context/notification";
import { useState } from "react";
import Notification from "./components/Notification";
function App() {
	const [registrations, setRegistrations] = useState<Registration[]>([]);
	const [notificacao, setNotificacao] = useState<NotificationProps | null>(
		null
	);
	const [loading, setLoading] = useState(false);

	const setNotification = ({ message, type }: NotificationProps) => {
		setNotificacao({ message, type });

		setTimeout(() => {
			setNotificacao(null);
		}, 5000);
	};

	return (
		<RegistrationsContext.Provider
			value={{ registrations, setRegistrations, loading, setLoading }}
		>
			<NotificationContext.Provider value={{ setNotification }}>
				<Header>
					<h1>Caju Front Teste</h1>
				</Header>
				<Router />
				{notificacao && (
					<Notification
						message={notificacao.message}
						type={notificacao.type}
						onClose={() => setNotificacao(null)}
					/>
				)}
			</NotificationContext.Provider>
		</RegistrationsContext.Provider>
	);
}

export default App;
