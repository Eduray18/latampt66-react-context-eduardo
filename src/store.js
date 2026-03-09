export const initialStore = () => {
  return {
    contacts: [],
    slug: "raymon_burgos" 
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload
      };
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };
    case 'edit_contact':
      return {
        ...store,
        contacts: store.contacts.map((contact, index) => 
            index === action.payload.index ? action.payload.contact : contact
        )
      };
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter((_, index) => index !== action.payload)
      };
    default:
      return store;
  }
}