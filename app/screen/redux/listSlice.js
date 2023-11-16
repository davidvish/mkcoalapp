import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';



export const fetchList = createAsyncThunk(async ()=>{
    const querySnap = await firestore().collection('items').get();
    const res = (await querySnap).docs.map(docsSnap => docsSnap.data());
}) 

const ListSlice = createSlice({
    name:'EnterList',
    initialState:{
        data:[],
        isLoading:false,
        isError:false
    }

})