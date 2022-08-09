import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export default {
    getStaff(token) {
        return apiClient.get(
            '/staff',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
        })
    },

    getAccessGroups(token) {
        return apiClient.get(
            '/groups',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    },

    getLogs(token) {
        return apiClient.get(
            '/logs',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    }

}