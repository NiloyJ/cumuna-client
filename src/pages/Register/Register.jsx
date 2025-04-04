import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import SocialLogin from '../shared/SocialLogin';


const Register = () => {

    const {createUser} = useContext(AuthContext)
    
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        console.log( name, email, password );

        createUser(email, password, name)
            .then(user => {
                console.log(result.user.displayName, result);
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    return (
        <div className="min-h-screen bg-base-200 flex flex-col lg:flex-row items-center justify-center p-4">
            {/* Registration Form - Left Side (Top on mobile) */}
            <div className="w-full lg:w-1/2 max-w-md p-4 lg:pr-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl font-bold text-center text-primary">MUN Club Registration</h2>
                        <p className="text-center mb-6 text-lg">Join our community of future diplomats</p>

                        <form className="space-y-4" onSubmit={handleRegister}>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="input input-bordered"
                                    required
                                />
                            </div> */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control mt-6">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input type="checkbox" className="checkbox checkbox-primary" required />
                                    <span className="label-text">I agree to the <a href="#" className="link link-primary">Terms & Conditions</a></span>
                                </label>
                            </div>

                            <div className="card-actions justify-center mt-8">
                                <button type="submit" className="btn btn-primary w-full text-lg">
                                    Register Now
                                </button>
                            </div>
                            <SocialLogin></SocialLogin>
                        </form>
                    </div>
                </div>
            </div>


            {/* MUN Image - Right Side (Hidden on mobile) */}
            <div className="hidden lg:block lg:w-1/2 h-full max-w-2xl">
                <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                    <img 
                        src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="UN Assembly"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <div className="text-white">
                            <h3 className="text-3xl font-bold mb-2">Become a Diplomat</h3>
                            <p className="text-xl">Develop leadership skills through authentic UN simulations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;