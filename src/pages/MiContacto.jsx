const MiContacto = () => {
	const miPerfil = {
		name: "Camilo Muñoz",
		email: "camilo.dev@email.com",
		phone: "55-1234-5678",
		address: "Ciudad de México",
		ocupacion: "Desarrollador Web y Fundador de KMIC"
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 pt-70">
			<h1 className="text-3xl font-bold p-15">Mi contacto 👤</h1>

			<div className="bg-gray-800 px-6 py-4 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold mb-2">{miPerfil.name}</h2>
				<p className="text-gray-300 text-md mb-1"><strong>Email:</strong> {miPerfil.email}</p>
				<p className="text-gray-300 text-md mb-1"><strong>Teléfono:</strong> {miPerfil.phone}</p>
				<p className="text-gray-300 text-md mb-1"><strong>Dirección:</strong> {miPerfil.address}</p>
				<p className="text-gray-300 text-md"><strong>Ocupación:</strong> {miPerfil.ocupacion}</p>
			</div>
		</div>
	);
};

export default MiContacto;
