
import React from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { singInUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()

    console.log('in login', location);
    const from = location.state || '/';

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        singInUser(email, password)
        .then(result => {
            console.log('sign in successful', result.user.displayName);
            navigate(from)
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
            {/* Main Container */}
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
                {/* Sign In Form - Comes first on all screens */}
                <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
                    <div className="p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">MUN Club Sign In</h2>
                            <p className="text-gray-600 mt-2">Access your diplomatic portal</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSignIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="delegate@mun.org"
                                    className="input input-bordered w-full bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-primary">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-8">
                                <button type="submit" className="btn btn-primary w-full py-3 text-lg">
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            New to MUN Club? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Register here</a>
                        </div>
                    </div>
                </div>

                {/* Diplomatic Content Section */}
                <div className="w-full lg:w-1/2 bg-blue-600 rounded-xl shadow-lg overflow-hidden order-1 lg:order-2">
                    <div className="relative h-full p-8 sm:p-10 flex items-center">
                        {/* Subtle UN emblem watermark */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/1200px-UN_emblem_blue.svg.png')] bg-center bg-contain"></div>
                        
                        <div className="relative z-10 text-white">
                            <h3 className="text-3xl font-bold mb-4">Shape Global Diplomacy</h3>
                            <p className="text-xl mb-6">Join our community of future leaders through authentic UN simulations</p>
                            
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-lg">Develop negotiation and public speaking skills</p>
                                </div>
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-lg">Engage with global issues and international relations</p>
                                </div>
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-lg">Build leadership and critical thinking abilities</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;