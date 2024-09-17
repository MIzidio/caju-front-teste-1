import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import axios from "axios";
import { Registration, useRegistrationsContext } from "~/context/registrations";
import {
	HiOutlineMail,
	HiOutlineUser,
	HiOutlineCalendar,
	HiOutlineTrash,
} from "react-icons/hi";
import { useNotification } from "~/context/notification";
import Modal from "../Modal";
import { useState } from "react";

type Props = {
	data: Registration;
};

const RegistrationCard = (props: Props) => {
	const { registrations, setRegistrations, setLoading } =
		useRegistrationsContext();
	const { setNotification } = useNotification();

	const [modalOpen, setModalOpen] = useState(false);
	const [currentAction, setCurrentAction] = useState("");
	const [status, setStatus] = useState("");

	const openModal = (action: string, status: string) => {
		setCurrentAction(action);
		setStatus(status);
		setModalOpen(true);
	};

	const handleStatus = async (id: string, status: string) => {
		setLoading(true);

		const approvedRegistration = { ...props.data, id, status };
		try {
			const response = await axios.put(
				`http://localhost:3000/registrations/${id}`,
				approvedRegistration
			);
			setRegistrations(
				registrations.map((registration) =>
					registration.id === id ? { ...response.data } : registration
				)
			);
			if (currentAction === "Aprovar") {
				setNotification({
					message: "Aprovação feita com sucesso",
					type: "success",
				});
			} else if (currentAction === "Reprovar") {
				setNotification({
					message: "Reprovação feita com sucesso",
					type: "success",
				});
			} else if (currentAction === "Revisar") {
				setNotification({
					message: "Pronto para revisar feita com sucesso",
					type: "success",
				});
			}
		} catch (error) {
			setNotification({
				message: "Erro ao realizar ação. Por favor, tente novamente.",
				type: "error",
			});
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setLoading(true);

		try {
			await axios.delete(`http://localhost:3000/registrations/${id}`);
			const registrationsList = registrations.filter(
				(registration) => registration.id !== id
			);
			setRegistrations(registrationsList);
			setNotification({ message: "Deletado com sucesso", type: "success" });
		} catch (error) {
			setNotification({
				message: "Erro ao realizar ação. Por favor, tente novamente.",
				type: "error",
			});
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const confirmAction = (id: string) => {
		if (currentAction !== "Deletar") {
			handleStatus(id, status);
		} else if (currentAction === "Deletar") {
			handleDelete(id);
		}
	};

	const cancelAction = () => {
		setModalOpen(false);
	};

	return (
		<>
			<S.Card>
				<S.IconAndText>
					<HiOutlineUser />
					<h3>{props.data.employeeName}</h3>
				</S.IconAndText>
				<S.IconAndText>
					<HiOutlineMail />
					<p>{props.data.email}</p>
				</S.IconAndText>
				<S.IconAndText>
					<HiOutlineCalendar />
					<span>{props.data.admissionDate}</span>
				</S.IconAndText>
				<S.Actions>
					{props.data.status === "REVIEW" && (
						<S.Review>
							<ButtonSmall
								bgcolor="rgb(255, 145, 154)"
								onClick={() => openModal("Reprovar", "REPROVED")}
								data-test="reprovar-button"
							>
								Reprovar
							</ButtonSmall>
							<ButtonSmall
								bgcolor="rgb(155, 229, 155)"
								onClick={() => openModal("Aprovar", "APPROVED")}
								data-test="aprovar-button"
							>
								Aprovar
							</ButtonSmall>
						</S.Review>
					)}
					{props.data.status !== "REVIEW" && (
						<ButtonSmall
							bgcolor="#ff8858"
							onClick={() => openModal("Revisar", "REVIEW")}
							data-test="revisar-button"
						>
							Revisar novamente
						</ButtonSmall>
					)}

					<HiOutlineTrash
						data-test="deletar-button"
						onClick={() => openModal("Deletar", "")}
					/>
				</S.Actions>
			</S.Card>

			<Modal
				isOpen={modalOpen}
				action={currentAction}
				onConfirm={() => confirmAction(props.data.id)}
				onCancel={cancelAction}
			/>
		</>
	);
};

export default RegistrationCard;
