import styled from "styled-components";

export const Select = styled.select`
	padding: 0.5rem;
	border-radius: 8px;
	border: 1px solid rgba(36, 28, 21, 0.3);
	font-size: 1rem;
	background-color: #fff;
	line-height: 18px;
	font-weight: normal;
	cursor: pointer;

	:focus {
		outline: none;
		border: 1px solid #007c89;
		box-shadow: inset 0 0 0 1px #007c89;
	}
`;
