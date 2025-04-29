

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';
import { CircularProgress, Alert, Box, TextField } from '@mui/material';

const FlagshipEvent = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchYear, setSearchYear] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/events`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                setFilteredEvents(data); // Initialize with all events
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    /**
     * Extracts the year from a date string in MM/DD/YYYY or MM-DD-YYYY format
     * @param {string} dateString - The date string to parse
     * @returns {string} The extracted year or 'Unknown' if parsing fails
     */
    const extractYearFromDate = (dateString) => {
        if (!dateString) return 'Unknown';
        
        // Handle date ranges (e.g., "9/2/2023 - 12/2/2023")
        const dateRange = dateString.split(' - ');
        const firstDate = dateRange[0];
        
        // Match YYYY format at the end of the string after last / or -
        const yearMatch = firstDate.match(/(?:\/|-)(\d{4})$/);
        
        return yearMatch ? yearMatch[1] : 'Unknown';
    };

    // Filter events based on search year
    useEffect(() => {
        if (!searchYear) {
            setFilteredEvents(events);
            return;
        }

        const filtered = events.filter(event => {
            const eventYear = extractYearFromDate(event.dates);
            return eventYear.includes(searchYear);
        });

        setFilteredEvents(filtered);
    }, [searchYear, events]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading events: {error}
                </Alert>
                <Box display="flex" justifyContent="center">
                    <button 
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </Box>
            </Box>
        );
    }

    return (
        <section className="conference-section max-w-7xl mx-auto px-6 py-20 lg:py-28 relative overflow-hidden">
            <div className="floating-shapes absolute w-full h-full top-0 left-0 z-1 overflow-hidden">
                <div className="shape shape-1 bg-primary absolute rounded-full opacity-10 w-[300px] h-[300px] top-[-100px] left-[-100px] animate-float-15" />
                <div className="shape shape-2 bg-primary absolute rounded-full opacity-10 w-[200px] h-[200px] bottom-[-50px] right-[-50px] animate-float-12-reverse" />
            </div>

            <div className="conference-container flex flex-col items-center text-center relative z-10">
                <h1 className="conference-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    CUMUNA Conference Events
                </h1>

                <p className="conference-subtitle text-lg md:text-xl text-gray-600 max-w-3xl mb-12">
                    Explore our flagship MUN events with committees, delegates, and impactful themes.
                </p>

                {/* Year Search Input */}
                <div className="w-full max-w-md mb-8">
                    <TextField
                        fullWidth
                        label="Search by year"
                        variant="outlined"
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                        placeholder="e.g. 2023"
                        inputProps={{
                            maxLength: 4,
                            pattern: "[0-9]*",
                            inputMode: "numeric"
                        }}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        {filteredEvents.length} events found
                    </p>
                </div>

                {filteredEvents.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-xl text-gray-600 mb-4">
                            {searchYear ? `No events found for year ${searchYear}` : 'No events found'}
                        </p>
                        {user?.role === 'admin' && (
                            <Link 
                                to="/create-event"
                                className="btn btn-primary"
                            >
                                Create New Event
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="conference-highlights flex flex-wrap justify-center gap-6 mb-12">
                        {filteredEvents.map((event) => {
                            const year = extractYearFromDate(event.dates);

                            return (
                                <div 
                                    key={event._id} 
                                    className="highlight-card bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full sm:w-80 hover:-translate-y-[5px] transition-transform"
                                >
                                    <img 
                                        src={event.bannerUrl} 
                                        alt="Event Banner" 
                                        className="rounded-lg mb-4 w-full h-40 object-cover" 
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = '/default-event.jpg';
                                        }}
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.theme}</h3>
                                    <div className="text-left space-y-2">
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Dates:</span> {event.dates || 'Not specified'}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Year:</span> {year}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Committees:</span> {event.totalCommittees || 0}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Delegates:</span> {event.totalDelegates || 0}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">International:</span> {event.internationalDelegates || 0}
                                        </p>
                                    </div>

                                    <Link 
                                        to={`/conference/${event._id}`}
                                        className="cta-button btn btn-primary px-2 py-1 text-lg font-semibold w-full block text-center mt-4"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FlagshipEvent;