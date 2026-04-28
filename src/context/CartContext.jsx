import { createContext, useContext, useReducer } from 'react';

function calculateCartState(items) {
	return {
		items,
		totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
		totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
	};
}

const initialState = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
};

function cartReducer(state, action) {
	switch (action.type) {
		case 'ADD_ITEM': {
			const existingIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			const newItems =
				existingIndex >= 0
					? state.items.map((item, index) =>
							index === existingIndex
								? { ...item, quantity: item.quantity + 1 }
								: item
						)
					: [...state.items, { ...action.payload, quantity: 1 }];

			return calculateCartState(newItems);
		}

		case 'REMOVE_ITEM': {
			const newItems = state.items.filter((item) => item.id !== action.payload);
			return calculateCartState(newItems);
		}

		case 'INCREMENT_ITEM': {
			const newItems = state.items.map((item) =>
				item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
			);
			return calculateCartState(newItems);
		}

		case 'DECREMENT_ITEM': {
			const targetItem = state.items.find((item) => item.id === action.payload);

			if (!targetItem) {
				return state;
			}

			const newItems =
				targetItem.quantity <= 1
					? state.items.filter((item) => item.id !== action.payload)
					: state.items.map((item) =>
							item.id === action.payload
								? { ...item, quantity: item.quantity - 1 }
								: item
						);

			return calculateCartState(newItems);
		}

		case 'CLEAR_CART':
			return initialState;

		default:
			return state;
	}
}

const CartContext = createContext();

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addItem = (product) => {
		dispatch({ type: 'ADD_ITEM', payload: product });
	};

	const incrementItem = (productId) => {
		dispatch({ type: 'INCREMENT_ITEM', payload: productId });
	};

	const decrementItem = (productId) => {
		dispatch({ type: 'DECREMENT_ITEM', payload: productId });
	};

	const removeItem = (productId) => {
		dispatch({ type: 'REMOVE_ITEM', payload: productId });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				addItem,
				incrementItem,
				decrementItem,
				removeItem,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}

	return context;
}