import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const Favoritos = () => {
	const { store, dispatch } = useGlobalReducer();

	const handleDelete = (id) => {
	};

	const handleFavorite = (contact) => {
		dispatch({ type: "TOGGLE_FAVORITE", payload: contact });
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 pt-50">
			<h1 className="text-3xl font-bold mb-6 pb-10">Favoritos 💛</h1>
			<div className="w-full max-w-xl space-y-3">
				{store.favorites.length > 0 ? (
					store.favorites.map((contact) => (
						<ContactCard
							key={contact.id}
							id={contact.id}
							name={contact.name}
							email={contact.email}
							phone={contact.phone}
							address={contact.address}
							onDelete={handleDelete}
							onFavorite={handleFavorite}
							isFavorite={true}
						/>
					))
				) : (
					<p className="text-gray-400 text-center">No tienes contactos favoritos aún.</p>
				)}
			</div>
		</div>
	);
};

export default Favoritos;
