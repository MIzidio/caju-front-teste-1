import * as S from "./styles";

interface ModalProps {
	isOpen: boolean;
	action: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const Modal = ({ isOpen, action, onConfirm, onCancel }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<S.ModalWrapper>
			<S.ModalContent>
				<S.ModalHeader>Confirmar {action.toLowerCase()}</S.ModalHeader>
				<p>Tem certeza que deseja {action.toLowerCase()} este registro?</p>
				<S.ConfirmButton data-test="confirmar-button" onClick={onConfirm}>
					Confirmar
				</S.ConfirmButton>
				<S.CancelButton data-test="cancelar-button" onClick={onCancel}>
					Cancelar
				</S.CancelButton>
			</S.ModalContent>
		</S.ModalWrapper>
	);
};

export default Modal;
