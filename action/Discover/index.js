import Types from '../types';
import DataStore from '../../expand/dao/DataStore';
//获取最热数据的异步action
export function onRefreshDiscover(storeName,url,pageSize){
	return dispatch=>{
		dispatch({
			type:Types.DISCOVER_REFRESH,
			storeName:storeName,
		});
		let dataStore = new DataStore();
		dataStore.fetchData(url)//异步action与数据流
			.then(data=>{
				handleData(Types.DISCOVER_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
			})
			.catch(error=>{
					console.log(error);
					dispatch({
						type:Types.DISCOVER_REFRESH_FAIL,
						storeName,
						error
					});
			})
	}
}
export function onLoadMoreDiscover(storeName,pageIndex,pageSize,dataArray=[],callBack){
//异常信息通过callback进行控制
	return dispatch=>{
		setTImeout(()=>{//模拟网络请求
			if((pageIndex-1)*pageSize >= dataArray.length){//已经全部加载完数据
				if(typeof callBack==='function'){
					callBack('Sorry,no more')
				}
				dispatch({
					type:Types.DISCOVER_LOAD_MORE_FAIL,
					error:'Sorry,no more',
					storeName:storeName,
					pageIndex:--pageIndex,
					projectModes:dataArray,
				})
			}else{
				let max= pageSize*pageIndex > dataArray.length ? dataArray.length : pageSize*pageIndex;
				dispatch({
					type:Types.DISCOVER_LOAD_MORE_SUCCESS,
					storeName,
					pageIndex,
					projectModes:dataArray.slice(0,max)
				})
			}

		},500);
};
}
function handleData(actionType, dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }
    }
    dispatch({
        type: actionType,
        items: fixItems,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),//第一次要加载的数据
        storeName,
        pageIndex: 1
    })
}
