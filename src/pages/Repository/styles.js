import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

const spinning = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div.attrs((props) => ({
	disabled: props.loading,
}))`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	color: #fff;

	h2 {
		margin-bottom: 3rem;
		font-style: italic;
		font-size: 2rem;
	}

	${(props) =>
		props.loading &&
		css`
			svg {
				animation: ${spinning} 2s linear infinite;
			}
		`}
`;

export const Container = styled.div`
	max-width: 700px;
	background: #7159c1;
	border-radius: 1.125rem;
	padding: 2rem;
	margin: 5rem auto;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const BackButton = styled(Link)`
	border: 0;
	outline: 0;
	background: transparent;
	transition: all 0.2s ease-in-out;

	&:hover {
		opacity: 0.7;
	}
`;

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 9.375rem;
		border-radius: 50%;
		margin: 1.25rem 0;
		border: 3px solid #63f5b8;
		background-color: #fff;
	}

	h1 {
		font-size: 2.5rem;
		color: #63f5b8;
		text-transform: capitalize;
	}

	p {
		font-size: 1.125rem;
		margin-top: 0.5rem;
		text-align: justify;
		line-height: 1.4;
		max-width: 25rem;
		margin-bottom: 1.25rem;
	}
`;

export const FilterList = styled.div`
	margin: 1rem 0;

	button {
		border: 0;
		outline: 0;
		padding: 0.5rem;
		border-radius: 0.25rem;
		margin-right: 0.5rem;
		color: #7159c1;
		transition: all 0.2s ease-in-out;

		&:hover {
			opacity: 0.7;
		}

		&:nth-child(${(props) => props.active + 1}) {
			background: #63f5b8;
		}
	}
`;

export const IssueList = styled.ul`
	margin: 2rem 0;
	padding-top: 2rem;
	border-top: 2px dashed #52d89f;
	list-style: none;

	li {
		display: flex;
		padding: 1rem 0.625rem;

		& + li {
			margin-top: 0.75rem;
		}

		img {
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 50%;
			border: 2px solid #63f5b8;
		}

		div {
			flex: 1;
			margin-left: 0.75rem;

			p {
				margin-top: 0.625rem;
				font-size: 0.75rem;
			}
		}

		strong {
			font-size: 1rem;

			a {
				text-decoration: none;
				color: #63f5b8;
				transition: all 0.2s ease-in-out;

				&:hover {
					color: #52d89f;
				}
			}

			span {
				display: inline-block;
				background: #63f5b8;
				color: #7159c1;
				border-radius: 0.25rem;
				font-weight: 600;
				font-size: 0.75rem;
				padding: 0.25rem 0.4375rem;
				margin-left: 0.625rem;
			}
		}
	}
`;

export const PageActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	button {
		border: 0;
		outline: 0;
		background: #63f5b8;
		color: #7159c1;
		padding: 0.3125rem 0.625rem;
		border-radius: 0.25rem;
		transition: all 0.2s ease-in-out;

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;

			&:hover {
				opacity: 0.5;
			}
		}

		&:hover {
			opacity: 0.7;
		}
	}
`;
