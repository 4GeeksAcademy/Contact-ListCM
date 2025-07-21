export const initialStore = () => {
  const favsGuardados = localStorage.getItem("favoritos");
  return {
    message: null,
    contacts: [],
    favorites: favsGuardados ? JSON.parse(favsGuardados) : []
  };
};



export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'ADD_CONTACT': {
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };
    }

    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload
      };

    case "DELETE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== action.payload)
      };

    case "UPDATE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    case "TOGGLE_FAVORITE": {
      const contacto = action.payload;
      const alreadyFav = store.favorites.find((c) => c.id === contacto.id);

      const newFavorites = alreadyFav
        ? store.favorites.filter((c) => c.id !== contacto.id)
        : [...store.favorites, contacto];

      localStorage.setItem("favoritos", JSON.stringify(newFavorites));

      return {
        ...store,
        favorites: newFavorites
      };
    }

    default:
      console.warn("Unknown action type:", action.type);
      return store;

  }
}

