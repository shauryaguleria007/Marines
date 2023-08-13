import { NotificationAdd } from '@mui/icons-material';
import { createContext, useContext, useState } from 'react';

const notificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        activte: false,
        message: "",
        type: "success",
        sevierity: {
            error: "error",
            warning: "warning",
            success: "success",
            info: "info"
        }
    })

   

    const addNotification = (message = "operatin successful", type = "success") => setNotification((state) => {
        return { ...state, activate: true, message, type }
    })


    const resetNotification = () => setNotification((state) => {

        return {
            ...state, activate: false, message: "", type: "success"
        }
    })
    return <>
        <notificationContext.Provider value={{
            notification,
            addNotification,
            resetNotification
        }}>
            {
                children
            }
        </notificationContext.Provider>
    </>
}

export const useNotificationContext = () => useContext(notificationContext)