const initialState = {
	vocabularyStore: [
		{
			id: 0,
			eng: 'orange',
			ru: 'апельсин',
			enableEdit: false,
		},
		{
			id: 1,
			eng: 'tomato',
			ru: 'помидор',
			enableEdit: false,
		},
		{
			id: 2,
			eng: 'potato',
			ru: 'картошка',
			enableEdit: false,
		},
		{
			id: 3,
			eng: 'watermelon',
			ru: 'арбуз',
			enableEdit: false,
		},
		{
			id: 4,
			eng: 'melon',
			ru: 'дыня',
			enableEdit: false,
		},
		{
			id: 5,
			eng: 'bean',
			ru: 'бобы',
			enableEdit: false,
		},
		{
			id: 6,
			eng: 'broccoli',
			ru: 'брокколи',
			enableEdit: false,
		},
		{
			id: 7,
			eng: 'pea',
			ru: 'горох',
			enableEdit: false,
		},
		{
			id: 8,
			eng: 'cabbage',
			ru: 'капуста',
			enableEdit: false,
		},
		{
			id: 9,
			eng: 'onion',
			ru: 'лук',
			enableEdit: false,
		},
		{
			id: 10,
			eng: 'cucumber',
			ru: 'огурец',
			enableEdit: false,
		},
		{
			id: 11,
			eng: 'carrot',
			ru: 'морковь',
			enableEdit: false,
		},
		{
			id: 12,
			eng: 'pepper',
			ru: 'перец',
			enableEdit: false,
		},
		{
			id: 13,
			eng: 'beet',
			ru: 'свекла',
			enableEdit: false,
		},
		{
			id: 14,
			eng: 'dill',
			ru: 'укроп',
			enableEdit: false,
		},
		{
			id: 15,
			eng: 'pumpkin',
			ru: 'тыква',
			enableEdit: false,
		},
		{
			id: 16,
			eng: 'parsley',
			ru: 'петрушка',
			enableEdit: false,
		},
		{
			id: 17,
			eng: 'basil',
			ru: 'базилик',
			enableEdit: false,
		},
		{
			id: 18,
			eng: 'radish',
			ru: 'редис',
			enableEdit: false,
		},
		{
			id: 19,
			eng: 'lattuce',
			ru: 'салат',
			enableEdit: false,
		},
		{
			id: 20,
			eng: 'apple',
			ru: 'яблоко',
			enableEdit: false,
		},

	],
	testingStore: [
	],
};

const vocabularyReducer = (state = initialState, action) => {

//function vocabularyReducer(state = initialState, action) {

	if (action.type === 'ADD_WORD') {
		return {
			...state,
			vocabularyStore: [
				...state.vocabularyStore,
				action.payload
			]
		};
	} 


	else if (action.type === 'DELETE_WORD') {
		return {
			...state,
			vocabularyStore: [
				...state.vocabularyStore.slice(0, action.payload),
				...state.vocabularyStore.slice(action.payload + 1)
			]
		}
	} 


	else if ( action.type === 'ENABLE_EDIT_WORD' ) {
	
		var map = state.vocabularyStore.map( (item, index) => {
			if(index !== action.payload) {
				// This isn't the item we care about - keep it as-is
				return item;
			}

			// Otherwise, this is the one we want - return an updated value
			return {
				id: item.id, 
				eng: item.eng, 
				ru: item.ru, 
				enableEdit: !item.enableEdit,
			};    
		});

		return {
			...state,
			vocabularyStore: [
				...map
			]
		};
	}

	else if ( action.type === 'SAVE_EDIT_WORD' ) {
		let newArray = state.vocabularyStore.slice();
	newArray.splice(action.payload.index, 1, action.payload.wordObj);

	return {
			...state,
			vocabularyStore: [
				...newArray
			]
		};
	}

	return state;
}

export default vocabularyReducer