// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import RegistrantsModal from "@/components/RegistrantsModal";
// import { toast } from "sonner";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRegistrantsModal, setShowRegistrantsModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   // ✅ Fetch organizer stats from backend
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/dashboard-stats");
//         if (!res.ok) throw new Error("Failed to load stats");
//         const data = await res.json();
//         setStats(data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center gradient-bg text-white">
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen gradient-bg text-white">
//       <Navbar />

//       <section className="max-w-6xl mx-auto pt-32 pb-20 px-6">
//         {/* Dashboard Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-bold mb-10 text-center"
//         >
//           Organizer Dashboard
//         </motion.h1>

//         {/* Summary Cards */}
//         {stats ? (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
//             >
//               {/* Total Events */}
//               <div className="glass-card p-6 text-center">
//                 <h2 className="text-2xl font-semibold text-yellow-400">
//                   Total Events
//                 </h2>
//                 <p className="text-5xl font-bold mt-2">{stats.total_events}</p>
//               </div>

//               {/* Total Registrations */}
//               <div className="glass-card p-6 text-center">
//                 <h2 className="text-2xl font-semibold text-yellow-400">
//                   Total Registrations
//                 </h2>
//                 <p className="text-5xl font-bold mt-2">
//                   {stats.total_registrations}
//                 </p>
//               </div>

//               {/* Top Event */}
//               <div className="glass-card p-6 text-center">
//                 <h2 className="text-2xl font-semibold text-yellow-400">
//                   Top Event
//                 </h2>
//                 <p className="text-lg mt-2">
//                   {stats.event_summary?.[0]?.title || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {stats.event_summary?.[0]?.count || 0} registrations
//                 </p>
//               </div>
//             </motion.div>

//             {/* Events List */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="glass-card p-8"
//             >
//               <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
//                 Event Registrations Overview
//               </h2>

//               {stats.event_summary && stats.event_summary.length > 0 ? (
//                 <div className="space-y-4">
//                   {stats.event_summary.map((event) => (
//                     <div
//                       key={event.id}
//                       className="flex justify-between items-center bg-white/5 px-5 py-4 rounded-lg hover:bg-white/10 transition"
//                     >
//                       <div>
//                         <h3 className="text-lg font-semibold text-white">
//                           {event.title || "Untitled Event"}
//                         </h3>
//                         <p className="text-gray-400 text-sm">
//                           {event.count} student
//                           {event.count !== 1 ? "s" : ""} registered
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => {
//                           if (!event.id) {
//                             toast.error("Invalid event ID");
//                             return;
//                           }
//                           setSelectedEvent(event);
//                           setShowRegistrantsModal(true);
//                         }}
//                         className="btn-secondary text-sm px-4 py-2"
//                       >
//                         View Registrants
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400 text-center py-10">
//                   No event data available.
//                 </p>
//               )}
//             </motion.div>
//           </>
//         ) : (
//           <p className="text-center text-gray-400 mt-10">No data found.</p>
//         )}
//       </section>

//       {/* ✅ Registrants Modal */}
//       <RegistrantsModal
//         isOpen={showRegistrantsModal}
//         onClose={() => setShowRegistrantsModal(false)}
//         eventId={selectedEvent?.id}
//         eventTitle={selectedEvent?.title}
//       />

//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import RegistrantsModal from "@/components/RegistrantsModal";
import API_BASE_URL from "@/config/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrantsModal, setShowRegistrantsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dashboard-stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent"
        >
          Organizer Dashboard
        </motion.h1>

        {stats ? (
          <>
            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  label: "Total Events",
                  value: stats.total_events,
                },
                {
                  label: "Total Registrations",
                  value: stats.total_registrations,
                },
                {
                  label: "Top Event",
                  value: stats.event_summary?.[0]?.title || "N/A",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card text-center p-6 hover:shadow-xl"
                >
                  <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
                    {card.label}
                  </h2>
                  <p className="text-4xl font-bold text-white">
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Event Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8"
            >
              <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
                Event Registrations Overview
              </h2>
              {stats.event_summary?.length > 0 ? (
                <div className="space-y-4">
                  {stats.event_summary.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between items-center bg-white/5 px-6 py-4 rounded-lg hover:bg-white/10 transition"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">
                          {event.title || "Untitled Event"}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {event.count} student{event.count !== 1 ? "s" : ""} registered
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRegistrantsModal(true);
                        }}
                        className="btn-secondary text-sm"
                      >
                        View Registrants
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-10">No data found.</p>
              )}
            </motion.div>
          </>
        ) : (
          <p className="text-center text-gray-400 mt-10">No data found.</p>
        )}
      </section>

      <RegistrantsModal
        isOpen={showRegistrantsModal}
        onClose={() => setShowRegistrantsModal(false)}
        eventId={selectedEvent?.id}
        eventTitle={selectedEvent?.title}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
