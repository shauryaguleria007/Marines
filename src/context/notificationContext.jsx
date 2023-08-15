import { NotificationAdd } from '@mui/icons-material';
import { createContext, useContext, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const notificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const { ref, inView } = useInView();

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
            resetNotification,
            ref,
            inView
        }}>
            {
                children
            }
        </notificationContext.Provider>
    </>
}

export const useNotificationContext = () => useContext(notificationContext)