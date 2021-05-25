import React, { useState, useContext, useEffect } from 'react'
import cogoToast from 'cogo-toast'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../setAuthToken';



const AuthCtx = React.createContext()

export function useAuth () {
    return useContext(AuthCtx)
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const [skills, setSkills] = useState([])


    useEffect(() => {
        checkAuth()
        axios.interceptors.response.use(undefined, (err) => {
            if (err.response) {
                if (err.response.status === 401 || err.response.data.message === 'Unauthenticated' || err.response.data.message === ' err.response.data.message' === '401 Unauthorized') {
                    localStorage.removeItem('frespTfHc0yj864fjtgSaFfdsaArw35hd4s');
                    setIsAuth(false)
                }
            }
            return Promise.reject(err)
        });

    }, [])


    const handleAuth = (response) => {
        setLoading(false)
        let token = response.data.data.access_token.split('').reverse().join('');
        localStorage.setItem('frespTfHc0yj864fjtgSaFfdsaArw35hd4s', JSON.stringify(token))
        checkAuth()
    }

    const login = (data) => {
        setLoading(true)
        axios.post("/api/auth/login", data).then(response => {
            handleAuth(response)
            cogoToast.success('Login success')

        }).catch(error => {
            if (error.response) {
                setLoading(false)
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                let err = error.response.data;
                if (err.errors) {
                    for (const [key, value] of Object.entries(err.errors)) {

                        const { hide } = cogoToast.error(value, {
                            onClick: () => {
                                hide();
                            },
                        });
                    }
                } else {
                    cogoToast.error(err.message || 'An error occurred')
                }
            }
            else if (error.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                let err = error.request;
                cogoToast.error('An error occurred, please try again')


            } else {
                // Something happened in setting up the request that triggered an Error
                let err = error.message;
                cogoToast.error(err || 'An error occurred, please try again')


            }
        })
    }





    let checkAuth = () => {
        let token = JSON.parse(
            localStorage.getItem('frespTfHc0yj864fjtgSaFfdsaArw35hd4s')
        );
        if (token) {
            token = 'Bearer ' + token.split('').reverse().join('');
            let decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                localStorage.removeItem('frespTfHc0yj864fjtgSaFfdsaArw35hd4s');
                checkAuth();
            } else {
                setIsAuth(true);
                setAuthToken(token);
                setUser(decoded);

            }
        } else {
            setIsAuth(false);
        }
    };
    const logout = () => {
        axios.get("/api/auth/logout").then(response => {

            cogoToast.success('Logout successful')
            localStorage.removeItem('frespTfHc0yj864fjtgSaFfdsaArw35hd4s');

            setIsAuth(false)

        }).catch(error => {
            if (error.response) {
                setLoading(false)
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                let err = error.response.data;
                if (err.errors) {
                    for (const [key, value] of Object.entries(err.errors)) {

                        const { hide } = cogoToast.error(value, {
                            onClick: () => {
                                hide();
                            },
                        });
                    }
                } else {
                    cogoToast.error(err.message || 'An error occurred')
                }
            }
            else if (error.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                let err = error.request;
                cogoToast.error('An error occurred, please try again')


            } else {
                // Something happened in setting up the request that triggered an Error
                let err = error.message;
                cogoToast.error(err || 'An error occurred, please try again')


            }
        })
    };


    return (
        <AuthCtx.Provider
            value={{
                login,
                logout,

                isAuth,
                loading,
                handleAuth,
                user,
                skills,
                setSkills

            }}
        >
            {children}
        </AuthCtx.Provider>
    );
}
export default AuthProvider
