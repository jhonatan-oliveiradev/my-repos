import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
	max-width: 700px;
	background: #7159c1;
	border-radius: 1.125rem;
	padding: 2rem;
	margin: 4rem auto;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

	h1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		pointer-events: none;

		svg {
			margin-right: 0.5rem;
		}
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-top: 30px;

	input {
		flex: 1;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		color: #321d7c;
		border: ${(props) => (props.error ? "1px solid #f64c90" : "none")};
		border-radius: 8px 0 0 8px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

		&::placeholder {
			color: #161b22;
		}
	}
`;

// Button Animation
const spinning = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
	type: "submit",
	disabled: props.loading,
}))`
	display: flex;
	justify-content: center;
	align-items: center;

	background: #63f5b8;
	border: none;
	padding: 0.85rem 1rem;
	border-radius: 0 8px 8px 0;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease-in-out;

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	${(props) =>
		props.loading &&
		css`
			svg {
				animation: ${spinning} 2s linear infinite;
			}
		`}

	&:hover {
		background: #52d89f;
	}
`;

export const DeleteButton = styled.button.attrs((props) => ({
	type: "button",
}))`
	background: transparent;
	border: none;
	padding: 0.375rem 0.75rem;
	padding-left: 0;
	ouline: none;
	transition: all 0.3s ease-in-out;

	&:hover {
		svg {
			color: #f64c75 !important;
		}
	}

	svg {
		color: #f64c90 !important;
	}
`;

export const List = styled.ul`
	margin-top: 2rem;
	list-style: none;

	li {
		padding: 15px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		& + li {
			border-top: 2px dashed #52d89f;
		}

		a {
			text-decoration: none;

			&:hover {
				svg {
					color: #52d90f !important;
				}
			}
		}

		svg {
			color: #52d89f;
		}
	}
`;
