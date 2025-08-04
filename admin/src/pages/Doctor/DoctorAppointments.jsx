import { AppContext } from "@/context/AppContext";
import { DoctorContext } from "@/context/DoctorContext";
import React, { useContext, useEffect, useState } from "react";
import { Check, X, User, Calendar, Clock, DollarSign } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProgressBar from "@/components/ProgressBar";
import { motion } from "motion/react";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // loader progress simulation
  const simulateProgress = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    return interval;
  };

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const progressInterval = simulateProgress();

      await getAppointments();

      setLoadingProgress(100);
      clearInterval(progressInterval);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0);
      }, 500);
    }
  };

  useEffect(() => {
    if (dToken) {
      fetchAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Profile Image Popup view */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged view"
            draggable="false"
            className="max-w-[90vw] max-h-[90vh] object-cover rounded-2xl border-4 border-white shadow-2xl select-none motion-preset-expand motion-duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          All Appointments
        </h1>
        <p className="text-gray-600">
          Manage and track all your patient appointments
        </p>
      </div>

      {/* Appointments Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px] flex-col p-8">
            <ProgressBar progress={loadingProgress} />
          </div>
        ) : appointments.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px] flex-col p-8">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Appointments Found
              </h3>
              <p className="text-gray-500">
                You don't have any appointments scheduled at the moment.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Header */}
            <div className="hidden lg:grid grid-cols-[0.5fr_2fr_1fr_1.5fr_2fr_1fr_1.5fr] gap-4 py-4 px-6 border-b bg-gray-50 sticky top-0 z-10">
              <p className="font-semibold text-gray-700">#</p>
              <p className="font-semibold text-gray-700">Patient</p>
              <p className="font-semibold text-gray-700">Age</p>
              <p className="font-semibold text-gray-700">Payment</p>
              <p className="font-semibold text-gray-700">Date & Time</p>
              <p className="font-semibold text-gray-700">Fees</p>
              <p className="font-semibold text-gray-700">Actions</p>
            </div>

            {/* Appointments List */}
            <div className="max-h-[70vh] overflow-y-auto doctorlist-scrollbar">
              {appointments
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <motion.div
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-[0.5fr_2fr_1fr_1.5fr_2fr_1fr_1.5fr] gap-4 items-center py-4 px-6">
                      <p className="text-gray-600 font-medium">{index + 1}</p>

                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                          draggable="false"
                          src={item.userData.image}
                          alt="user image"
                          onClick={() => setSelectedImage(item.userData.image)}
                        />
                        <div>
                          <p className="font-medium text-gray-800 capitalize">
                            {item.userData.name}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600">
                        {!isNaN(Date.parse(item.userData.dob))
                          ? `${calculateAge(item.userData.dob)} years`
                          : "N/A"}
                      </p>

                      <div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            item.payment
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {item.payment ? "Online" : "Cash"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {slotDateFormat(item.slotDate)}
                        </span>
                        <Clock className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-gray-600">{item.slotTime}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-800">
                          {currencySymbol}
                          {item.amount}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.cancelled ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : (
                          <>
                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className="p-2 rounded-lg text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                                  >
                                    <X size={16} />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white px-2 py-1 text-xs">
                                  Cancel Appointment
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={() =>
                                      completeAppointment(item._id)
                                    }
                                    className="p-2 rounded-lg text-green-500 border border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                                  >
                                    <Check size={16} />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white px-2 py-1 text-xs">
                                  Mark as Completed
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={() =>
                                      (window.location.href = "/my-patients")
                                    }
                                    className="p-2 rounded-lg text-blue-500 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                  >
                                    <User size={16} />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white px-2 py-1 text-xs">
                                  View Patient Details
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                          draggable="false"
                          src={item.userData.image}
                          alt="user image"
                          onClick={() => setSelectedImage(item.userData.image)}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 capitalize mb-1">
                            {item.userData.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>
                              Age:{" "}
                              {!isNaN(Date.parse(item.userData.dob))
                                ? `${calculateAge(item.userData.dob)} years`
                                : "N/A"}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.payment
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {item.payment ? "Online" : "Cash"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {slotDateFormat(item.slotDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{item.slotTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-800">
                            {currencySymbol}
                            {item.amount}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.cancelled ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Cancelled
                            </span>
                          ) : item.isCompleted ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          ) : (
                            <>
                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <button
                                      onClick={() =>
                                        cancelAppointment(item._id)
                                      }
                                      className="p-2 rounded-lg text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                                    >
                                      <X size={16} />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-gray-800 text-white px-2 py-1 text-xs">
                                    Cancel
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <button
                                      onClick={() =>
                                        completeAppointment(item._id)
                                      }
                                      className="p-2 rounded-lg text-green-500 border border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                                    >
                                      <Check size={16} />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-gray-800 text-white px-2 py-1 text-xs">
                                    Complete
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <button
                                      onClick={() =>
                                        (window.location.href = "/my-patients")
                                      }
                                      className="p-2 rounded-lg text-blue-500 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                    >
                                      <User size={16} />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-gray-800 text-white px-2 py-1 text-xs">
                                    Details
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
