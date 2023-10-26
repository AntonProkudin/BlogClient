import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginData, IRegisterData} from "../../../common/types/auth/auth";
import {instance} from "../../../utils/axios";

export const loginUser = createAsyncThunk(
    '/Authenticate',
    async (data:ILoginData, {rejectWithValue},) => {
        try{
            const response = await instance.post('/Authenticate',data)
            console.log(response.data)
            sessionStorage.setItem('userToken',response.data.userToken)
            sessionStorage.setItem('firstName',response.data.firstName)
            sessionStorage.setItem('email',response.data.email)
            sessionStorage.setItem('id',response.data.id)
            sessionStorage.setItem('lastName',response.data.lastName)
            sessionStorage.setItem('role',response.data.role)
            return response.data
        }catch (error:any) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            } else{
                return rejectWithValue(error.message)
            }
        }
}
)
export const RegisterUser = createAsyncThunk(
    '/Registrate',
    async (data:IRegisterData, {rejectWithValue},) => {
        try{
            const response = await instance.post('/Registrate',data)
            return response.data
        }catch (error:any) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            } else{
                return rejectWithValue(error.message)
            }
        }
    }
)