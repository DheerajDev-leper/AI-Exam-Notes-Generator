import axios from "axios"
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice"

// Not being signed in is a normal state, so a 400/401 here is not an error.
export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(serverUrl + "/api/user/currentUser", {
            withCredentials: true
        })
        dispatch(setUserData(result.data))
    } catch (error) {
        const status = error.response?.status
        if (status === 400 || status === 401) {
            dispatch(setUserData(null))
        } else {
            console.log(error)
        }
    }
}

// Throws an Error carrying the backend's own message so the UI can show it.
export const generateNotes = async (payload) => {
    try {
        const result = await axios.post(serverUrl + "/api/notes/generate-notes", payload, {
            withCredentials: true
        })
        return result.data
    } catch (error) {
        console.log("generate-notes failed:", error.response?.data || error.message)
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message
        throw new Error(message)
    }
}

export const downloadPdf = async (result) => {
    try {
        const response = await axios.post(serverUrl + "/api/pdf/download", { result }, {
            responseType: "blob",
            withCredentials: true
        })
        const blob = new Blob([response.data], { type: "application/pdf" })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "ExamNotes.pdf"
        link.click()
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error("Error downloading PDF:", error)
        throw error
    }
}