import Types from '../../action/types';
const defaultState={
	theme:'blue',
};

export default function onAction(state=defaultState,action){
	switch(action.type){
		case Types.LOAD_LKDISCOVER_SUCCESS:
			return{
				...state,
				theme:action.theme
			};
		default:
			return state;
	}

}//不能修改state，只能返回新的state