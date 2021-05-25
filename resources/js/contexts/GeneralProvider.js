import React, { useState, useContext, useEffect } from 'react'
import cogoToast from 'cogo-toast'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../setAuthToken';



const GeneralContext = React.createContext()

export function useGenCtx () {
    return useContext(GeneralContext)
}

const GeneralProvider = ({ children }) => {
    const [task, setTask] = useState(null)



    return (
        <GeneralContext.Provider
            value={{
                task,
                setTask

            }}
        >
            {children}
        </GeneralContext.Provider>
    );
}
export default GeneralProvider
