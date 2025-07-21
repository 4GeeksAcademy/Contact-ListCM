import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrash, FaEdit, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactCard = ({ id, name, email, phone, address, onDelete, onFavorite, isFavorite }) => {
	return (
		<div className="flex items-start justify-between bg-gray-800 px-4 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
			<div>
				<h2 className="text-white font-semibold text-lg mb-1">{name}</h2>
				<div className="text-gray-300 text-sm flex items-center gap-2 mb-1">
					<FaEnvelope className="text-green-400" /> {email}
				</div>
				<div className="text-gray-300 text-sm flex items-center gap-2 mb-1">
					<FaPhone className="text-blue-400" /> {phone}
				</div>
				<div className="text-gray-300 text-sm flex items-center gap-2">
					<FaMapMarkerAlt className="text-red-400" /> {address}
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<Link to={`/edit/${id}`} className="text-yellow-400 hover:text-yellow-300 transition">
					<FaEdit />
				</Link>
				<button className="text-red-500 hover:text-red-400 transition" onClick={() => onDelete(id)}>
					<FaTrash />
				</button>
				<button
					className={`transition ${isFavorite ? "text-yellow-300" : "text-gray-400 hover:text-yellow-400"}`}
					onClick={() =>
						onFavorite({
							id,
							name,
							email,
							phone,
							address
						})
					}
				>
					<FaStar />
				</button>
			</div>
		</div>
	);
};

export default ContactCard;
