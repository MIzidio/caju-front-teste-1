import * as S from "./styles";

const Loading = () => {
	return (
		<S.LoadingWrapper role="status">
			<S.Spinner role="progressbar" />
		</S.LoadingWrapper>
	);
};

export default Loading;
