import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const [searchTerm, setSearchTerm] = useState("");
	const APIURL = "https://playground.4geeks.com/contact/agendas/camilom/contacts";

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const response = await fetch(APIURL);
				if (response.ok) {
					const data = await response.json();
					console.log("Contactos desde la API:", data.contacts); // para depurar
					dispatch({ type: "SET_CONTACTS", payload: data.contacts });
				} else {
					console.error("Error al obtener contactos");
				}
			} catch (error) {
				console.error("Error de red:", error);
			}
		};

		fetchContacts();
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			const response = await fetch(
				`https://playground.4geeks.com/contact/agendas/camilom/contacts/${id}`,
				{
					method: "DELETE"
				}
			);

			if (response.ok) {
				dispatch({ type: "DELETE_CONTACT", payload: id });
			} else {
				console.error("Error al eliminar contacto");
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	};

	const handleFavorite = (contact) => {
		dispatch({ type: "TOGGLE_FAVORITE", payload: contact });
	};

	const filteredContacts = store.contacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	);



	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 pt-40 pb-20">
			<div className="bg-black text-white w-50 text-start p-5 pt-3 rounded-lg hover:border-3 transition-all duration-100 ease-in-out shadow-lg shadow-black-500/50 min-w-[350px]">
				<div className="flex justify-between items-center mb-2">
					<h1 className="w-40 text-4xl">Contactos</h1>

					<input
						className="bg-gray-200 text-black content-center px-2 py-1 w-40 h-7 rounded-lg hover:ring-2 hover:ring-green-500"
						type="text"
						placeholder="Search Contact"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

				</div>

				<div className="mt-4 space-y-3">
					{filteredContacts.length > 0 ? (
						filteredContacts.map((contact) => (
							<ContactCard
								key={contact.id}
								id={contact.id}
								name={contact.name}
								email={contact.email}
								phone={contact.phone}
								address={contact.address}
								onDelete={handleDelete}
								onFavorite={handleFavorite}
								isFavorite={store.favorites.some((c) => c.id === contact.id)}
							/>
						))
					) : (
						<p className="text-gray-500 text-sm">No hay coincidencias.</p>
					)
					}
				</div>


				<div className="text-sm text-gray-400 text-left mt-4">
					NUMERO DE CONTACTOS: {store.contacts?.length || 0}
				</div>
			</div>
		</div>
	);
};
