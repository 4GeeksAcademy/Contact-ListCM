import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosHome } from "react-icons/io";

export const AddContact = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const APIURL = "https://playground.4geeks.com/contact/agendas/camilom/contacts";

    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(APIURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newContact)
            });

            if (response.ok) {
                const data = await response.json();

                console.log("Contacto creado:", data);


                dispatch({ type: "ADD_CONTACT", payload: data });

                setShowAlert(true);
                setNewContact({
                    name: "",
                    email: "",
                    phone: "",
                    address: ""
                });


                setTimeout(() => setShowAlert(false), 3000);



                // setTimeout(() => navigate("/add"), 1500);


            } else {
                console.error("Error al crear el contacto");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl font-bold pb-6">Agregar contacto</h1>

            {showAlert && (
                <div className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow-md transition-opacity duration-500 ease-in-out opacity-100">
                    ✅ Contacto guardado exitosamente.
                </div>
            )}


            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newContact.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                        placeholder="Full Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={newContact.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="phone">Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={newContact.phone}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                        placeholder="Phone"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-medium" htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={newContact.address}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                        placeholder="Address"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white font-semibold transition"
                >
                    Guardar
                </button>
                <p className="mt-4 flex justify-center">
                    <Link to="/" className="text-blue-400"><IoIosHome style={{ fontSize: '35px' }} /></Link>
                </p>
            </form>
        </div>
    );
};

export default AddContact;
