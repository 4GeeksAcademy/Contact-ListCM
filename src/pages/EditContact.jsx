import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
    const { dispatch } = useGlobalReducer();
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const APIURL = `https://playground.4geeks.com/contact/agendas/camilom/contacts/${id}`;

    useEffect(() => {
	const fetchContacts = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/camilom/contacts");
			if (response.ok) {
				const data = await response.json();
				const found = data.contacts.find((c) => c.id == id);
				if (found) setContact(found);
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	};
	fetchContacts();
}, [id]);



    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(APIURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                const updatedContact = await response.json();
                dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
                navigate("/");
            } else {
                console.error("Error al actualizar contacto");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl font-bold mb-6">Editar contacto</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                {["name", "email", "phone", "address"].map((field) => (
                    <div key={field} className="mb-4">
                        <label className="block mb-2 font-medium capitalize" htmlFor={field}>
                            {field}
                        </label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            value={contact[field]}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded text-black font-semibold transition"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditContact;
