// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import EventCard from '@/components/EventCard';
// import AddEventModal from '@/components/AddEventModal';
// import { eventsData } from '@/data/eventsData';
// import { Search, Plus } from 'lucide-react';
// import { isAuthenticated, getUserRole } from '@/utils/auth';

// const Events = () => {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState(eventsData);
//   const [filteredEvents, setFilteredEvents] = useState(eventsData);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isVisible, setIsVisible] = useState(false);
//   const [showAddEventModal, setShowAddEventModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     setIsVisible(true);
//     setIsLoggedIn(isAuthenticated());
//     setUserRole(getUserRole());
//   }, []);

//   useEffect(() => {
//     let filtered = events;

//     // Filter by category
//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(event => event.category === selectedCategory);
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         event.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredEvents(filtered);
//   }, [selectedCategory, searchQuery, events]);

//   const handleAddEvent = (newEvent) => {
//     const updatedEvents = [newEvent, ...events];
//     setEvents(updatedEvents);
//   };

//   const categories = ['All', 'Tech Talk', 'Workshop', 'Festival', 'Competition'];

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />
      
//       {/* Header Section */}
//       <section className="pt-32 pb-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-12"
//           >
//             <h1 className="text-5xl sm:text-6xl font-bold mb-4" data-testid="events-page-title">Discover Events</h1>
//             <p className="text-lg text-gray-300">Find the perfect event that matches your interests</p>
//           </motion.div>

//           {/* Filter and Search Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="glass-card p-6 mb-12"
//             data-testid="filter-search-bar"
//           >
//             <div className="flex flex-col md:flex-row gap-4 items-center">
//               {/* Search Input */}
//               <div className="flex-1 w-full relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//                   data-testid="search-input"
//                 />
//               </div>

//               {/* Category Filter */}
//               <div className="flex gap-2 flex-wrap justify-center">
//                 {categories.map((category, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
//                       selectedCategory === category
//                         ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
//                         : 'bg-white/5 text-gray-300 hover:bg-white/10'
//                     }`}
//                     data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Add Event Button for Organizers */}
//           {isLoggedIn && userRole === 'Organizer' && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-8"
//             >
//               <button
//                 onClick={() => setShowAddEventModal(true)}
//                 className="btn-primary flex items-center gap-2"
//                 data-testid="add-event-btn"
//               >
//                 <Plus size={20} />
//                 <span>Create New Event</span>
//               </button>
//             </motion.div>
//           )}

//           {/* Events Count */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <p className="text-gray-300" data-testid="events-count">
//               Showing <span className="font-semibold text-yellow-400">{filteredEvents.length}</span> events
//             </p>
//           </motion.div>

//           {/* Events Grid */}
//           {filteredEvents.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="events-grid">
//               {filteredEvents.map((event, index) => (
//                 <motion.div
//                   key={event.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                 >
//                   <EventCard event={event} onClick={() => navigate(`/event/${event.id}`)} />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-20"
//               data-testid="no-events-message"
//             >
//               <p className="text-2xl text-gray-400">No events found matching your criteria</p>
//               <button
//                 onClick={() => {
//                   setSelectedCategory('All');
//                   setSearchQuery('');
//                 }}
//                 className="mt-6 btn-secondary"
//                 data-testid="reset-filters-btn"
//               >
//                 Reset Filters
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </section>

//       <Footer />

//       {/* Add Event Modal */}
//       <AddEventModal
//         isOpen={showAddEventModal}
//         onClose={() => setShowAddEventModal(false)}
//         onAddEvent={handleAddEvent}
//       />
//     </div>
//   );
// };

// export default Events;





// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import EventCard from "@/components/EventCard";
// import AddEventModal from "@/components/AddEventModal";
// import { Search, Plus } from "lucide-react";
// import { isAuthenticated, getUserRole } from "@/utils/auth";
// import { toast } from "sonner";

// const Events = () => {
//   const navigate = useNavigate();

//   // State management
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isVisible, setIsVisible] = useState(false);
//   const [showAddEventModal, setShowAddEventModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState("");

//   const categories = ["All", "Tech Talk", "Workshop", "Festival", "Competition"];

//   // Fetch events from FastAPI backend
//   useEffect(() => {
//     setIsVisible(true);
//     setIsLoggedIn(isAuthenticated());
//     setUserRole(getUserRole());

//     fetch("${API_BASE_URL}/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//       })
//       .catch((err) => {
//         console.error("Failed to load events:", err);
//         toast.error("Failed to load events from backend.");
//       });
//   }, []);

//   // Filter events by category and search
//   useEffect(() => {
//     let filtered = [...events];

//     if (selectedCategory !== "All") {
//       filtered = filtered.filter((event) => event.category === selectedCategory);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (event) =>
//           event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           event.description?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredEvents(filtered);
//   }, [selectedCategory, searchQuery, events]);

//   // Add new event and send to backend
//   const handleAddEvent = async (newEvent) => {
//     try {
//       const response = await fetch("${API_BASE_URL}/events", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newEvent),
//       });

//       if (response.ok) {
//         const savedEvent = await response.json();
//         setEvents((prev) => [savedEvent, ...prev]);
//         setFilteredEvents((prev) => [savedEvent, ...prev]);
//         toast.success("Event added successfully!");
//       } else {
//         toast.error("Failed to save event.");
//       }
//     } catch (err) {
//       console.error("Error adding event:", err);
//       toast.error("Error connecting to backend.");
//     }
//   };

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />

//       {/* Header Section */}
//       <section className="pt-32 pb-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-12"
//           >
//             <h1
//               className="text-5xl sm:text-6xl font-bold mb-4"
//               data-testid="events-page-title"
//             >
//               Discover Events
//             </h1>
//             <p className="text-lg text-gray-300">
//               Find the perfect event that matches your interests
//             </p>
//           </motion.div>

//           {/* Filter and Search Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="glass-card p-6 mb-12"
//             data-testid="filter-search-bar"
//           >
//             <div className="flex flex-col md:flex-row gap-4 items-center">
//               {/* Search Input */}
//               <div className="flex-1 w-full relative">
//                 <Search
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//                   data-testid="search-input"
//                 />
//               </div>

//               {/* Category Filter */}
//               <div className="flex gap-2 flex-wrap justify-center">
//                 {categories.map((category, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
//                       selectedCategory === category
//                         ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
//                         : "bg-white/5 text-gray-300 hover:bg-white/10"
//                     }`}
//                     data-testid={`filter-${category
//                       .toLowerCase()
//                       .replace(" ", "-")}`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Add Event Button for Organizers */}
//           {isLoggedIn && userRole === "Organizer" && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-8"
//             >
//               <button
//                 onClick={() => setShowAddEventModal(true)}
//                 className="btn-primary flex items-center gap-2"
//                 data-testid="add-event-btn"
//               >
//                 <Plus size={20} />
//                 <span>Create New Event</span>
//               </button>
//             </motion.div>
//           )}

//           {/* Events Count */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <p className="text-gray-300" data-testid="events-count">
//               Showing{" "}
//               <span className="font-semibold text-yellow-400">
//                 {filteredEvents.length}
//               </span>{" "}
//               events
//             </p>
//           </motion.div>

//           {/* Events Grid */}
//           {filteredEvents.length > 0 ? (
//             <div
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               data-testid="events-grid"
//             >
//               {filteredEvents.map((event, index) => {
//                 const eventId = event._id || event.id; // ✅ use Mongo or fallback
//                 return (
//                   <motion.div
//                     key={eventId || index}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                   >
//                     <EventCard
//                       event={event}
//                       onClick={(id) => navigate(`/event/${eventId}`)} // ✅ fixed navigation
//                     />
//                   </motion.div>
//                 );
//               })}
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-20"
//               data-testid="no-events-message"
//             >
//               <p className="text-2xl text-gray-400">
//                 No events found matching your criteria
//               </p>
//               <button
//                 onClick={() => {
//                   setSelectedCategory("All");
//                   setSearchQuery("");
//                 }}
//                 className="mt-6 btn-secondary"
//                 data-testid="reset-filters-btn"
//               >
//                 Reset Filters
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </section>

//       <Footer />

//       {/* Add Event Modal */}
//       <AddEventModal
//         isOpen={showAddEventModal}
//         onClose={() => setShowAddEventModal(false)}
//         onAddEvent={handleAddEvent}
//       />
//     </div>
//   );
// };

// export default Events;






import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import AddEventModal from "@/components/AddEventModal";
import { Search, Plus, Filter, ChevronDown } from "lucide-react";
import { isAuthenticated, getUserRole } from "@/utils/auth";
import { toast } from "sonner";
import API_BASE_URL from "@/config/api";

const Events = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // ✅ Fetch events
  useEffect(() => {
    setIsVisible(true);
    setIsLoggedIn(isAuthenticated());
    setUserRole(getUserRole());

    fetch(`${API_BASE_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setEvents(sorted);
        setFilteredEvents(sorted);
        setCategories([
          "All",
          ...new Set(sorted.map((e) => e.category || "Uncategorized")),
        ]);
      })
      .catch((err) => {
        console.error("Failed to load events:", err);
        toast.error("Failed to load events from backend.");
      });
  }, []);

  // ✅ Filter + Sort + Search
  useEffect(() => {
    let filtered = [...events];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (event) =>
          event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

    setFilteredEvents(filtered);
  }, [selectedCategory, searchQuery, sortOrder, events]);

  // ✅ Add new event
  const handleAddEvent = async (newEvent) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const saved = await response.json();
        setEvents((prev) => [saved, ...prev]);
        toast.success("Event added successfully!");
      } else toast.error("Failed to save event.");
    } catch (err) {
      console.error(err);
      toast.error("Backend connection error.");
    }
  };

  // ✨ Dropdown animation
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] },
    },
    exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      {/* 🏁 Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              Discover Events
            </h1>
            <p className="text-lg text-gray-300">
              Find or create amazing events happening around you!
            </p>
          </motion.div>

          {/* 🔍 Search + Filter + Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 mb-12 relative z-[50] overflow-visible"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* 🔍 Search Bar */}
              <div className="flex-1 w-full relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              {/* 🗂 Category Dropdown */}
              <div className="relative z-[999]">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center justify-between gap-2 px-6 py-3 bg-white/5 border border-yellow-400/40 rounded-full text-white min-w-[170px] hover:border-yellow-400 transition-all"
                >
                  <Filter size={18} className="text-yellow-400" />
                  <span>{selectedCategory}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform text-yellow-400 ${
                      showCategoryDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showCategoryDropdown && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-3 w-full bg-[#1b1835]/95 backdrop-blur-md border border-yellow-400/30 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.1)] overflow-hidden z-[9999]"
                    >
                      {categories.map((cat, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setShowCategoryDropdown(false);
                          }}
                          className={`px-5 py-3 cursor-pointer text-left text-sm transition-all ${
                            selectedCategory === cat
                              ? "bg-yellow-400/20 text-yellow-300 font-medium"
                              : "hover:bg-yellow-400/10 text-white"
                          }`}
                        >
                          {cat}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* 🕒 Sort Dropdown */}
              <div className="relative z-[999]">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center justify-between gap-2 px-6 py-3 bg-white/5 border border-yellow-400/40 rounded-full text-white min-w-[170px] hover:border-yellow-400 transition-all"
                >
                  <span>
                    {sortOrder === "latest" ? "Latest First" : "Oldest First"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform text-yellow-400 ${
                      showSortDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-3 w-full bg-[#1b1835]/95 backdrop-blur-md border border-yellow-400/30 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.1)] overflow-hidden z-[9999]"
                    >
                      {["latest", "oldest"].map((order) => (
                        <li
                          key={order}
                          onClick={() => {
                            setSortOrder(order);
                            setShowSortDropdown(false);
                          }}
                          className={`px-5 py-3 cursor-pointer text-left text-sm transition-all ${
                            sortOrder === order
                              ? "bg-yellow-400/20 text-yellow-300 font-medium"
                              : "hover:bg-yellow-400/10 text-white"
                          }`}
                        >
                          {order === "latest" ? "Latest First" : "Oldest First"}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ➕ Add Event */}
          {isLoggedIn && userRole === "Organizer" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 mb-8 text-right"
            >
              <button
                onClick={() => setShowAddEventModal(true)}
                className="btn-primary flex items-center gap-2 ml-auto"
              >
                <Plus size={20} />
                <span>Create New Event</span>
              </button>
            </motion.div>
          )}

          {/* 📅 Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <EventCard
                    event={event}
                    onClick={() => navigate(`/event/${event._id || event.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">
                No events found matching your filters
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSortOrder("latest");
                }}
                className="mt-6 btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default Events;

