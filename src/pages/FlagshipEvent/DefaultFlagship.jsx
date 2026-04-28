// import React from 'react';
// import { Link } from 'react-router-dom';

// const DefaultFlagship = () => {
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-10">
//             <header className="text-center mb-12 border-b border-base-200 pb-10">
//                 {/* <h1 className="text-4xl font-bold text-primary mb-2">
//                     Empowering Tomorrow's Diplomats
//                 </h1> */}
//                 <h1 className="text-4xl font-bold text-primary mb-2 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
//                     Empowering Tomorrow's Diplomats
//                 </h1>
//                 <p className="text-base-content/60 max-w-xl mx-auto text-lg font-light">
//                     Shaping the leaders of tomorrow through diplomacy, debate, and international cooperation
//                 </p>
//             </header>

//             <div className="flex flex-wrap gap-8 justify-center">
//                 {/* Card 1 */}
//                 <div className="card w-full max-w-sm bg-white text-black shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
//                     <div className="card-body items-center text-center">
//                         <h2 className="card-title text-primary bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">Committee Sessions</h2>
//                         <div className="text-4xl mt-2 text-secondary">🗣️</div>
//                         <p className="text-base-content/60 mt-4">
//                             Engage in lively debates representing your assigned country's position on global issues. Develop resolutions through collaboration and negotiation with other delegates.
//                         </p>
//                         <div className="card-actions mt-4">
//                             <Link
//                                 to="/allconferences"
//                                 className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
//                             >
//                                 See More Events
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="card w-full max-w-sm bg-base-100 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
//                     <div className="card-body items-center text-center">
//                         <h2 className="card-title text-primary bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">Resolution Drafting</h2>
//                         <div className="text-4xl mt-2 text-secondary">✍️</div>
//                         <p className="text-base-content/60 mt-4">
//                             Work with fellow delegates to craft comprehensive resolutions that address complex international problems with viable, multilateral solutions.
//                         </p>
//                         <div className="card-actions mt-4">
//                             <Link
//                                 to="/allconferences"
//                                 className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
//                             >
//                                 See More Events
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Card 3 */}
//                 <div className="card w-full max-w-sm bg-base-100 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
//                     <div className="card-body items-center text-center">
//                         <h2 className="card-title text-primary bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">Voting & Consensus</h2>
//                         <div className="text-4xl mt-2 text-secondary">✅</div>
//                         <p className="text-base-content/60 mt-4">
//                             Participate in formal voting procedures to adopt resolutions, practicing the art of diplomacy to build consensus among diverse national interests.
//                         </p>
//                         <div className="card-actions mt-4">
//                             <Link
//                                 to="/allconferences"
//                                 className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
//                             >
//                                 See More Events
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default DefaultFlagship;

import React from 'react';
import { Link } from 'react-router-dom';

const DefaultFlagship = () => {
    return (
        <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <header className="text-center mb-12 border-b border-gray-200 pb-10">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                        Empowering Tomorrow's Diplomats
                    </h1>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg font-light">
                        Shaping the leaders of tomorrow through diplomacy, debate, and international cooperation
                    </p>
                </header>

                <div className="flex flex-wrap gap-8 justify-center">
                    {/* Card 1 */}
                    <div className="card w-full max-w-sm bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Committee Sessions</h2>
                            <div className="text-4xl mt-2">🗣️</div>
                            <p className="text-gray-600 mt-4">
                                Engage in lively debates representing your assigned country's position on global issues. Develop resolutions through collaboration and negotiation with other delegates.
                            </p>
                            <div className="card-actions mt-4">
                                <Link
                                    to="/allconferences"
                                    className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                                >
                                    See More Events
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card w-full max-w-sm bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Resolution Drafting</h2>
                            <div className="text-4xl mt-2">✍️</div>
                            <p className="text-gray-600 mt-4">
                                Work with fellow delegates to craft comprehensive resolutions that address complex international problems with viable, multilateral solutions.
                            </p>
                            <div className="card-actions mt-4">
                                <Link
                                    to="/allconferences"
                                    className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                                >
                                    See More Events
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card w-full max-w-sm bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Voting & Consensus</h2>
                            <div className="text-4xl mt-2">✅</div>
                            <p className="text-gray-600 mt-4">
                                Participate in formal voting procedures to adopt resolutions, practicing the art of diplomacy to build consensus among diverse national interests.
                            </p>
                            <div className="card-actions mt-4">
                                <Link
                                    to="/allconferences"
                                    className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                                >
                                    See More Events
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultFlagship;