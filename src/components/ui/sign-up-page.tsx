'use client'
import React, { useState } from 'react'
import RedButton from './red-button'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const signUpPage = ({ type }: { type: boolean }) => {
    const router = useRouter()

    const [registerIsActive, setregisterIsActive] = useState<boolean>(false)

    const [register, setregister] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [login, setlogin] = useState({
        name: '',
        password: ''
    })

    const handleRegister = async () => {
        try {

            setregisterIsActive(true)
            toast.success('sign-up can take some time')
            const data = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/sign-up` ,register)
            
            if(data){
                toast.success("successfully sign-up")
            }
            router.push('/sign-in')

         } catch (error) {
            toast.error('sign-up failed')
            console.log('the error at time of registeration is ', error)
        }
        finally{
            setregisterIsActive(false)
            setregister((register)=>({...register , name :'' , email:'' ,password:''}))
        }
    }

    return (
        <div className=' flex items-center min-h-screen justify-center relative bottom-20 font-mono'>
            <form className='flex flex-col items-center max-w-md border  border-[#1E1E2E] rounded-2xl bg-[#111118] overflow-hidden '>
                {
                    type ? <label className='py-4 text-xl text-[#E63946]' >RE
                        <span className='text-white'>
                            GISTER
                        </span>
                    </label> : <label className='py-4 text-xl text-[#E63946]' >LO
                        <span className='text-white'>
                            GIN
                        </span>
                    </label>
                }

                <div className='p-4'>
                    <label className='p-2 ' >NAME &nbsp;&nbsp;&nbsp;:&nbsp; </label>
                    <input
                        value={ type ? register.name : login.name}
                        type="text"
                        onChange={(e) => {
                            if (type) {
                                setregister((register) => ({ ...register, name: e.target.value }));
                            } else {
                                setlogin((login) => ({ ...login, name: e.target.value }));
                            }
                        }}
                        className='border-[#E63946] p-1 bg-transparent border bottom-1 rounded'
                    />
                </div>

                {type ? <div className=' p-6'>
                    <label className='p-2'>EMAIL &nbsp;&nbsp;:&nbsp;&nbsp;</label>
                    <input type="email"
                        value={register.email}
                        onChange={(e) => setregister(register => ({ ...register, email: e.target.value }))}
                        className='border-[#E63946] p-1 bg-transparent border bottom-1 rounded'
                    />
                </div> : <></>}

                <div className=' p-4'>
                    <label className='p-2'>PASSWORD : </label>
                    <input
                        type="password"
                        value={type ? register.password : login.password}
                        onChange={(e) => {
                            if (type) {
                                setregister((register) => ({ ...register, password: e.target.value }));
                            } else {
                                setlogin((login) => ({ ...login, password: e.target.value }));
                            }
                        }}
                        className='border-[#E63946] p-1 bg-transparent border bottom-1 rounded'
                    />
                </div>

                {type ? (
                    <div className='p-4' >
                        <RedButton isActive ={registerIsActive}  onClick={() => handleRegister()}>Register</RedButton>
                    </div>
                ) : (
                    <div className='p-4'>
                        <RedButton>Login</RedButton>
                    </div>
                )}
            </form>

        </div>
    )
}

export default signUpPage
