import { useEffect, useState } from "react";
import {
	Container,
	Owner,
	Loading,
	BackButton,
	IssueList,
	PageActions,
	FilterList,
} from "./styles";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";

import api from "../../services/api";

export default function Repository({ match }) {
	const [repository, setRepository] = useState({});
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState([
		{ state: "all", label: "Todas", active: true },
		{ state: "open", label: "Abertas", active: false },
		{ state: "closed", label: "Fechadas", active: false },
	]);
	const [filterIndex, setFilterIndex] = useState(0);

	useEffect(() => {
		async function loadRepository() {
			const repositoryName = decodeURIComponent(match.params.repository);

			const [dataRepository, dataIssues] = await Promise.all([
				api.get(`/repos/${repositoryName}`),
				api.get(`/repos/${repositoryName}/issues`, {
					params: {
						state: filters.find((f) => f.active).state,
						per_page: 5,
					},
				}),
			]);

			setRepository(dataRepository.data);
			setIssues(dataIssues.data);
			setLoading(false);
		}

		loadRepository();
	}, [filters, match.params.repository]);

	useEffect(() => {
		async function loadIssue() {
			const repositoryName = decodeURIComponent(match.params.repository);

			const response = await api.get(`/repos/${repositoryName}/issues`, {
				params: {
					state: filters[filterIndex].state,
					page,
					per_page: 5,
				},
			});

			setIssues(response.data);
		}

		loadIssue();
	}, [filterIndex, filters, match.params.repository, page]);

	if (loading) {
		return (
			<Loading>
				<h2>Carregando...</h2>

				<FaSpinner color="#FFF" size={50} />
			</Loading>
		);
	}

	function handlePage(action) {
		setPage(action === "prev" ? page - 1 : page + 1);
	}

	function handleFilter(index) {
		setFilterIndex(index);
	}

	return (
		<div>
			<Container>
				<BackButton to="/">
					<FaArrowLeft color="#63f5b8" size={35} />
				</BackButton>

				<Owner>
					<img src={repository.owner.avatar_url} alt={repository.owner.login} />
					<h1>{repository.name}</h1>
					<p>{repository.description}</p>
				</Owner>

				<FilterList active={filterIndex}>
					{filters.map((filter, index) => (
						<button
							type="button"
							key={String(index)}
							onClick={() => handleFilter(index)}
						>
							{filter.label}
						</button>
					))}
				</FilterList>

				<IssueList>
					{issues.map((issue) => (
						<li key={String(issue.id)}>
							<img src={issue.user.avatar_url} alt={issue.user.login} />
							<div>
								<strong>
									<a href={issue.html_url}>{issue.title}</a>

									{issue.labels.map((label) => (
										<span key={String(label.id)}>{label.name}</span>
									))}
								</strong>
								<p>{issue.user.login}</p>
							</div>
						</li>
					))}
				</IssueList>

				<PageActions>
					<button
						disabled={page < 2}
						type="button"
						onClick={() => handlePage("prev")}
					>
						Anterior
					</button>
					<button type="button" onClick={() => handlePage("next")}>
						Próximo
					</button>
				</PageActions>
			</Container>
		</div>
	);
}
