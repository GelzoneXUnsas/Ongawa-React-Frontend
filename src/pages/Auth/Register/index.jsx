import React, {useState} from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword, getErrorMessage} from '../../../firebase/auth'

import headerBackgroundImg from '../../../assets/images/headerBackground.png';

const Register = () => {
    // const navigate = useNavigate()

    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            try{
            const result = await doCreateUserWithEmailAndPassword(email, password);
                console.log("User registration successful:", result.user.uid);
                // const user = result.user;

                // // Assign user default role and store in dynamoDB
                // await setUserRole(user.uid, 'user');
                // console.log('User signed up and role assigned:', user);
                
            }
            catch(err) {
                console.error("Email SignIn error:", err);
                setIsRegistering(false);
                setErrorMessage(`${getErrorMessage(err.code)}`);
            };
        }
    }

    return (
        <>

            <div className="loginPage w-full bg-page-accent-gray overflow-hidden text-white text-body-overpass-base font-body-overpass">
            
                <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72">
                    <div className="bgImgContainer w-full lg:-mt-64">
                        <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                    </div>
                    <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-3xl font-bold">WELCOME!</div>
                    <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
                </div>
                {userLoggedIn && (<Navigate to={'/'} replace={true} /> )}

                <div className="w-full flex justify-center pb-20 px-3">
                    <div className='w-96 text-gray-600 space-y-5 p-4 mt-4 shadow-2xl rounded-xl bg-login-gradient'>
                        <div className='text-center mb-6'>
                            <div className='mt-t'>
                                <h3 className='text-white text-xl font-semibold sm:text-2xl'>Create a New Account</h3>
                            </div>
                        </div>
                    

                        <form
                            onSubmit={onSubmit}
                            className="space-y-3 w-full items-center"
                        >
                            <div>
                                <label className='text-sm text-white font-bold'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    autoComplete='email'
                                    required
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className='w-full px-3 py-2 text-black bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300'
                                />
                            </div>

                            <div>
                                <label className='text-sm text-white font-bold'>
                                    Password
                                </label>
                                <input
                                    disabled={isRegistering}
                                    type='password'
                                    autoComplete='new-password'
                                    required
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className='w-full px-3 py-2 text-black bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300'
                                />
                            </div>

                            <div>
                                <label className='text-sm text-white font-bold'>
                                    Confirm Password
                                </label>
                                <input
                                    disabled={isRegistering}
                                    type='password'
                                    autoComplete='off'
                                    required
                                    value={confirmPassword} 
                                    onChange={(e) => { setconfirmPassword(e.target.value) }}
                                    className='w-full px-3 py-2 text-black bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300'
                                />
                            </div>

                            {errorMessage && (
                                <span className='text-red-600 font-bold'>{errorMessage}</span>
                            )}

                            <button
                                disabled={isRegistering}
                                className={`w-full flex items-center justify-center gap-x-3 py-2.5 mt-4 border bg-lilac text-black rounded-lg text-sm font-medium ${isRegistering ? 'cursor-not-allowed' : 'hover:bg-page-background hover:text-white transition duration-300 active:bg-page-background active:text-white'}`}    
                            >
                                {isRegistering ? "Signing Up... " : "Sign Up"}
                            </button>

                            <div className='text-white text-sm text-center'>
                                Already have an account? {'   '}
                                <Link to={'/login'} className='text-center text-sm hover:underline font-bold'>Continue</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;