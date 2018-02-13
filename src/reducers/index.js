
import initialState from '../store';


const vocabularyReducer = (state = initialState, action) => {

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

	else if ( action.type === 'CHANGE_THEME' ) {

		var theme = state.theme[action.payload]

		console.log(action.payload)

		// console.log(q) 

		return {
			...state,
			currentTheme: {
				theme
			}
		}
	}

	return state;
}

export default vocabularyReducer;