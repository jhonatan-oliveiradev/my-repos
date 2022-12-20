import { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../../services/api";

export default function Main() {
	const [newRepo, setNewRepo] = useState("");
	const [repositories, setRepositories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Buscar
	useEffect(() => {
		const repoStorage = localStorage.getItem("repos");

		if (repoStorage) {
			setRepositories(JSON.parse(repoStorage));
		}
	}, []);

	// Salvar alterações
	useEffect(() => {
		localStorage.setItem("repos", JSON.stringify(repositories));
	}, [repositories]);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			async function submit() {
				setLoading(true);
				setAlert(null);
				try {
					if (newRepo === "") {
						throw new Error("Você precisa indicar um repositório");
					}

					const response = await api.get(`/repos/${newRepo}`);

					const hasRepo = repositories.find((repo) => repo.name === newRepo);

					if (hasRepo) {
						throw new Error("Este repositório já foi adicionado");
					}

					const data = {
						name: response.data.full_name,
					};

					setRepositories([...repositories, data]);
					setNewRepo("");
				} catch (err) {
					setAlert(true);
					console.log(err);
				} finally {
					setLoading(false);
				}
			}

			submit();
		},
		[newRepo, repositories]
	);

	function handleInputChange(e) {
		setNewRepo(e.target.value);
		setAlert(null);
	}

	const handleDelete = useCallback(
		(repo) => {
			const find = repositories.filter((r) => r.name !== repo);
			setRepositories(find);
		},
		[repositories]
	);

	return (
		<div>
			<Container>
				<h1>
					<FaGithub size={25} />
					Meus Repositórios
				</h1>

				<Form onSubmit={handleSubmit} error={alert}>
					<input
						type="text"
						placeholder="Adicionar Repositórios"
						value={newRepo}
						onChange={handleInputChange}
					/>

					<SubmitButton loading={loading ? 1 : 0}>
						{loading ? (
							<FaSpinner color="#7159c1" size={14} />
						) : (
							<FaPlus color="#7159c1" size={14} />
						)}
					</SubmitButton>
				</Form>

				<List>
					{repositories.map((repo) => (
						<li key={repo.name}>
							<span>
								<DeleteButton onClick={() => handleDelete(repo.name)}>
									<FaTrash size={14} />
								</DeleteButton>
								{repo.name}
							</span>
							<Link to={`/repository/${encodeURIComponent(repo.name)}`}>
								<FaBars size={20} />
							</Link>
						</li>
					))}
				</List>
			</Container>
		</div>
	);
}
