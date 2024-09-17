import styled from "styled-components";

export const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1000;
`;

export const ModalContent = styled.div`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	width: 400px;
	max-width: 90%;
	text-align: center;
`;

export const ModalHeader = styled.h2`
	margin-bottom: 1rem;
`;

export const ModalButton = styled.button`
	padding: 0.5rem 1rem;
	margin: 0.5rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

export const ConfirmButton = styled(ModalButton)`
	background-color: #28a745;
	color: white;
`;

export const CancelButton = styled(ModalButton)`
	background-color: #dc3545;
	color: white;
`;
