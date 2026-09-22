import axios from "axios"
import {serverUrl} from "../App"
import { setUserData } from "../redux/userSlice"

export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(serverUrl + "/api/user/currentUser",{
            withCredentials:true
        })
        dispatch(setUserData(result.data))
    } catch (error) {
        console.log(error)
    }
}

export const generateNotes = async (payload) => {
    try {
        const result = await axios.post(serverUrl+"/api/notes/generate-notes",payload,
            {withCredentials:true}
        )
        console.log(result)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const downloadPdf = async (result) => {
    try {
        const response = await axios.post(serverUrl + "/api/pdf/download", { result }, {
            responseType: 'blob',
            withCredentials: true
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ExamNotes.pdf';
        link.click();

        window.URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error downloading PDF:', error);
        throw error;
    }
}