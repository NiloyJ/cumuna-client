// import React, { useContext } from 'react';
// import AuthContext from '../../context/AuthContext/AuthContext';
// import { FcGoogle } from 'react-icons/fc';

// const SocialLogin = () => {
//     const { singInWithGoogle } = useContext(AuthContext);

//     const handleGoogleSignIn = () => {
//         singInWithGoogle()
//             .then(result => {
//                 console.log(result.user)
//             })
//             .catch(error => {
//                 console.log(error.message)
//             })
//     }

//     return (
//         <div className='m-4'>
//               <div className="divider">OR</div>

//               <button 
//                 onClick={handleGoogleSignIn}
//                 className="btn w-full bg-white text-gray-700 border border-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors duration-300"
//             >
//                 <FcGoogle className="text-xl mr-2" />
//                 Continue with Google
//             </button>
//         </div>
//     );
// };

// export default SocialLogin;

import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';

const SocialLogin = () => {
    const { singInWithGoogle } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        singInWithGoogle()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className='m-4'>
            <div className="divider">OR</div>

            {/* <button  onClick={handleGoogleSignIn} className="btn btn-primary w-full text-lg">Google</button> */}
            <button
                onClick={handleGoogleSignIn}
                className="btn w-full bg-transparent text-black border border-gray-300 hover:bg-[#DB4437] hover:text-white hover:border-[#DB4437] transition-colors duration-300"
            >
                <span className="group-hover:hidden"></span>
                <span className="hidden group-hover:inline-block"></span>
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;