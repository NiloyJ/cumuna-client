import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";




const EventDetails = () => {
    const { user } = useContext(AuthContext);
    const [committees, setCommittees] = useState([
      {
        id: 1,
        name: "UN Security Council",
        topic: "Addressing the crisis in the South China Sea",
        awards: [
          { type: "Best Delegate", winner: "Maria Gonzalez", institution: "University of Mexico" },
          { type: "Outstanding Diplomacy", winner: "John Smith", institution: "Harvard University" }
        ]
      },
      {
        id: 2,
        name: "WHO",
        topic: "Global pandemic response coordination",
        awards: [
          { type: "Best Delegate", winner: "James Wilson", institution: "University of Toronto" }
        ]
      }
    ]);
    
    const [conferenceData, setConferenceData] = useState({
      year: "2022",
      theme: "Bridging Global Divides",
      description: "Our 2022 theme challenged delegates to find common ground in an increasingly polarized world.",
      days: "3",
      dateRange: "November 18-20, 2022",
      totalCommittees: "28",
      totalDelegates: "1,450",
      delegateDescription: "From 85 countries across 6 continents",
      bannerImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      ]
    });
  
    const addCommittee = () => {
      const newId = committees.length > 0 ? Math.max(...committees.map(c => c.id)) + 1 : 1;
      setCommittees([
        ...committees,
        {
          id: newId,
          name: "New Committee",
          topic: "Committee topic",
          awards: [{ type: "Best Delegate", winner: "", institution: "" }]
        }
      ]);
    };
  
    const updateCommittee = (id, field, value) => {
      setCommittees(committees.map(committee => 
        committee.id === id ? { ...committee, [field]: value } : committee
      ));
    };
  
    const updateAward = (committeeId, awardIndex, field, value) => {
      setCommittees(committees.map(committee => {
        if (committee.id === committeeId) {
          const updatedAwards = [...committee.awards];
          updatedAwards[awardIndex] = { ...updatedAwards[awardIndex], [field]: value };
          return { ...committee, awards: updatedAwards };
        }
        return committee;
      }));
    };
  
    const addAward = (committeeId) => {
      setCommittees(committees.map(committee => 
        committee.id === committeeId 
          ? { ...committee, awards: [...committee.awards, { type: "New Award", winner: "", institution: "" }] } 
          : committee
      ));
    };
  
    const removeAward = (committeeId, awardIndex) => {
      setCommittees(committees.map(committee => {
        if (committee.id === committeeId) {
          const updatedAwards = [...committee.awards];
          updatedAwards.splice(awardIndex, 1);
          return { ...committee, awards: updatedAwards };
        }
        return committee;
      }));
    };
  
    const updateConferenceData = (field, value) => {
      setConferenceData({ ...conferenceData, [field]: value });
    };
  
    const updateGalleryImage = (index, url) => {
      const updatedImages = [...conferenceData.galleryImages];
      updatedImages[index] = url;
      setConferenceData({ ...conferenceData, galleryImages: updatedImages });
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section with Editable Banner */}
        <header className="relative bg-blue-900 overflow-hidden h-96">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          {user ? (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <input
                type="text"
                value={conferenceData.bannerImage}
                onChange={(e) => updateConferenceData('bannerImage', e.target.value)}
                className="bg-white bg-opacity-90 p-2 rounded w-3/4 text-center"
                placeholder="Enter banner image URL"
              />
            </div>
          ) : null}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${conferenceData.bannerImage})` }}
          ></div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              {user ? (
                <input
                  type="text"
                  value={`${conferenceData.year} Conference Archive`}
                  onChange={(e) => updateConferenceData('year', e.target.value.replace(' Conference Archive', ''))}
                  className="bg-transparent border-b border-white text-center w-full"
                />
              ) : (
                `${conferenceData.year} Conference Archive`
              )}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              {user ? (
                <input
                  type="text"
                  value={conferenceData.theme}
                  onChange={(e) => updateConferenceData('theme', e.target.value)}
                  className="bg-transparent border-b border-white text-center w-full text-4xl sm:text-5xl lg:text-6xl font-extrabold"
                />
              ) : (
                conferenceData.theme
              )}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {user ? (
                <textarea
                  value={conferenceData.description}
                  onChange={(e) => updateConferenceData('description', e.target.value)}
                  className="bg-transparent border-b border-blue-200 text-center w-full resize-none"
                  rows="2"
                />
              ) : (
                conferenceData.description
              )}
            </p>
          </div>
        </header>
  
        {/* Conference Highlights */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {user ? (
                  <input
                    type="text"
                    value={`${conferenceData.year} Conference Highlights`}
                    onChange={(e) => {}}
                    className="bg-transparent border-b border-blue-600 text-center mx-auto max-w-md"
                  />
                ) : (
                  `${conferenceData.year} Conference Highlights`
                )}
              </h2>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="text-blue-600 font-bold text-2xl mb-2">
                  {user ? (
                    <input
                      type="text"
                      value={conferenceData.days}
                      onChange={(e) => updateConferenceData('days', e.target.value)}
                      className="bg-transparent border-b border-blue-600 w-8 text-center"
                    />
                  ) : (
                    conferenceData.days
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Days</h3>
                <p className="text-gray-600 mt-2">
                  {user ? (
                    <input
                      type="text"
                      value={conferenceData.dateRange}
                      onChange={(e) => updateConferenceData('dateRange', e.target.value)}
                      className="bg-transparent border-b border-blue-200 w-full"
                    />
                  ) : (
                    conferenceData.dateRange
                  )}
                </p>
              </div>
  
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="text-blue-600 font-bold text-2xl mb-2">
                  {user ? (
                    <input
                      type="text"
                      value={conferenceData.totalCommittees}
                      onChange={(e) => updateConferenceData('totalCommittees', e.target.value)}
                      className="bg-transparent border-b border-blue-600 w-8 text-center"
                    />
                  ) : (
                    conferenceData.totalCommittees
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Committees</h3>
                <p className="text-gray-600 mt-2">
                  {user ? (
                    <textarea
                      value={conferenceData.delegateDescription}
                      onChange={(e) => updateConferenceData('delegateDescription', e.target.value)}
                      className="bg-transparent border-b border-blue-200 w-full resize-none"
                    />
                  ) : (
                    conferenceData.delegateDescription
                  )}
                </p>
              </div>
  
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="text-blue-600 font-bold text-2xl mb-2">
                  {user ? (
                    <input
                      type="text"
                      value={conferenceData.totalDelegates}
                      onChange={(e) => updateConferenceData('totalDelegates', e.target.value)}
                      className="bg-transparent border-b border-blue-600 w-16 text-center"
                    />
                  ) : (
                    conferenceData.totalDelegates
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Delegates</h3>
                <p className="text-gray-600 mt-2">
                  {user ? (
                    <textarea
                      value={conferenceData.delegateDescription}
                      onChange={(e) => updateConferenceData('delegateDescription', e.target.value)}
                      className="bg-transparent border-b border-blue-200 w-full resize-none"
                    />
                  ) : (
                    conferenceData.delegateDescription
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Committees Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {user ? (
                  <input
                    type="text"
                    value={`${conferenceData.year} Committees`}
                    onChange={(e) => {}}
                    className="bg-transparent border-b border-blue-600 text-left max-w-md"
                  />
                ) : (
                  `${conferenceData.year} Committees`
                )}
              </h2>
              {user && (
                <button
                  onClick={addCommittee}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add Committee
                </button>
              )}
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {committees.map((committee) => (
                <div key={committee.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  {user ? (
                    <input
                      type="text"
                      value={committee.name}
                      onChange={(e) => updateCommittee(committee.id, 'name', e.target.value)}
                      className="text-xl font-bold text-gray-800 mb-2 w-full bg-gray-100 p-1 rounded"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{committee.name}</h3>
                  )}
                  {user ? (
                    <textarea
                      value={committee.topic}
                      onChange={(e) => updateCommittee(committee.id, 'topic', e.target.value)}
                      className="text-gray-600 mb-4 w-full bg-gray-100 p-1 rounded resize-none"
                      rows="2"
                    />
                  ) : (
                    <p className="text-gray-600 mb-4">{committee.topic}</p>
                  )}
                  
                  <div className="space-y-3">
                    {committee.awards.map((award, awardIndex) => (
                      <div key={awardIndex} className="bg-blue-50 p-3 rounded relative">
                        {user && (
                          <button
                            onClick={() => removeAward(committee.id, awardIndex)}
                            className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                        {user ? (
                          <input
                            type="text"
                            value={award.type}
                            onChange={(e) => updateAward(committee.id, awardIndex, 'type', e.target.value)}
                            className="font-semibold text-blue-700 mb-1 w-full bg-blue-100 p-1 rounded"
                          />
                        ) : (
                          <h4 className="font-semibold text-blue-700 mb-1">{award.type}</h4>
                        )}
                        {user ? (
                          <input
                            type="text"
                            value={award.winner}
                            onChange={(e) => updateAward(committee.id, awardIndex, 'winner', e.target.value)}
                            className="text-gray-700 w-full bg-blue-100 p-1 rounded mb-1"
                            placeholder="Winner name"
                          />
                        ) : (
                          <p className="text-gray-700">{award.winner}</p>
                        )}
                        {user ? (
                          <input
                            type="text"
                            value={award.institution}
                            onChange={(e) => updateAward(committee.id, awardIndex, 'institution', e.target.value)}
                            className="text-gray-700 w-full bg-blue-100 p-1 rounded"
                            placeholder="Institution"
                          />
                        ) : (
                          <p className="text-gray-500 text-sm">{award.institution}</p>
                        )}
                      </div>
                    ))}
                    {user && (
                      <button
                        onClick={() => addAward(committee.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Award
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Photo Gallery */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {user ? (
                  <input
                    type="text"
                    value={`${conferenceData.year} Conference Gallery`}
                    onChange={(e) => {}}
                    className="bg-transparent border-b border-blue-600 text-center mx-auto max-w-md"
                  />
                ) : (
                  `${conferenceData.year} Conference Gallery`
                )}
              </h2>
            </div>
  
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {conferenceData.galleryImages.map((image, index) => (
                <div key={index} className="h-48 overflow-hidden rounded-lg relative">
                  {user && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => updateGalleryImage(index, e.target.value)}
                        className="bg-white bg-opacity-90 p-2 rounded w-4/5 text-center text-xs"
                        placeholder="Enter image URL"
                      />
                    </div>
                  )}
                  <img 
                    src={image} 
                    alt={`Conference ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg">
              {user ? (
                <input
                  type="text"
                  value={`Global Diplomacy Forum - Preparing Future Leaders Since ${conferenceData.year - 12}`}
                  onChange={(e) => {}}
                  className="bg-transparent border-b border-gray-600 text-center w-full max-w-2xl"
                />
              ) : (
                `Global Diplomacy Forum - Preparing Future Leaders Since ${conferenceData.year - 12}`
              )}
            </p>
            <p className="mt-4 text-gray-400">
              {user ? (
                <input
                  type="text"
                  value={`© ${conferenceData.year} Global Diplomacy Forum. All content and data from ${conferenceData.year - 1} conference.`}
                  onChange={(e) => {}}
                  className="bg-transparent border-b border-gray-600 text-center w-full max-w-2xl"
                />
              ) : (
                `© ${conferenceData.year} Global Diplomacy Forum. All content and data from ${conferenceData.year - 1} conference.`
              )}
            </p>
          </div>
        </footer>
      </div>
    );
  };

export default EventDetails;