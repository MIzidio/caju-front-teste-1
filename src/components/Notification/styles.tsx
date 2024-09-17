import styled from "styled-components";

export const Notification = styled.div<{ type: "success" | "error" }>`
	padding: 1rem;
	color: #fff;
	background-color: ${(props) =>
		props.type === "success" ? "#28a745" : "#dc3545"};
	position: fixed;
	top: 10px;
	right: 10px;
	border-radius: 5px;
	z-index: 1000;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	animation: slideIn 0.3s ease-out;

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
`;
