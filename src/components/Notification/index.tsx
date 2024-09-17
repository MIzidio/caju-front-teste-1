import { useEffect } from "react";
import * as S from "./styles";

interface NotificationProps {
	message: string;
	type: "success" | "error";
	onClose: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<S.Notification data-test={`${type}-notification`} type={type}>
			{message}
		</S.Notification>
	);
};

export default Notification;
