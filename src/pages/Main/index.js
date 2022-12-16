import { useState, useCallback } from "react";
import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";

import api from "../../services/api";

export default function Main() {
	const [newRepo, setNewRepo] = useState("");
	const [repositories, setRepositories] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			async function submit() {
				setLoading(true);
				try {
					const response = await api.get(`/repos/${newRepo}`);

					const data = {
						name: response.data.full_name,
					};

					setRepositories([...repositories, data]);
					setNewRepo("");
				} catch (err) {
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
	}

	return (
		<div>
			<Container>
				<h1>
					<FaGithub size={25} />
					Meus Repositórios
				</h1>

				<Form onSubmit={handleSubmit}>
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
			</Container>
		</div>
	);
}
