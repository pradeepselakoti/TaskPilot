import React, { useState } from "react";
import { TbMailCheck } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";

function Notification() {
  const notificationList = [
    {
      heading: "System update complete",
      date: "2024-03-19",
      time: "09:30 AM",
      From: "System Admin",
      Category: "Sysytem Update",
      Priority: "High",
    },
    {
      heading: "New User Registration Spike",
      date: "2024-03-19",
      time: "10:30 AM",
      From: "Team leader",
      Category: "Registration",
      Priority: "Low",
    },
    {
      heading: "Database Backup Scheduled",
      date: "2024-03-19",
      time: "11:30 AM",
      From: "Manager",
      Category: "database backup shedule",
      Priority: "Medium",
    },
  ];

  const [mailIndex, setMailIndex] = useState(0);

  const [isOpenMobileNotifi, setIsOpenMobileNotifi] = useState(false);

  function handleNotifcationSidebar(index) {
    setMailIndex(index);
    // console.log(mailIndex);
    setIsOpenMobileNotifi(true);
    // console.log(isOpenMobileNotifi);
  }
  return (
    <div className="p-4 lg:p-8 h-screen">
      <div className="flex justify-between mb-4 md:mb-6">
        <h1 className="md:text-2xl font-bold">Notification Details</h1>
        <div className="space-x-6 text-white text-sm ">
          <button className="bg-blue-800 rounded-lg px-3 py-2 shadow-gray-300 shadow-lg text-xs md:text-sm ">
            Mark All as Read
          </button>
        </div>
      </div>

      {/* notification bar */}
      <div className="flex md:space-x-2 lg:space-x-4">
        <div
          className={`${
            isOpenMobileNotifi ? "hidden md:block" : "block"
          } min-h-[300px] min-w-full md:min-w-48 lg:min-w-72 bg-white rounded-xl shadow-lg lg:space-y-4 md:space-y-2 space-y-2 p-2 md:p-3 lg:p-7`}
        >
          {notificationList.map((noti, index) => (
            <div
              onClick={() => handleNotifcationSidebar(index)}
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer  ${
                mailIndex === index
                  ? "bg-blue-100 duration-200"
                  : "hover:bg-gray-200 duration-200      "
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-blue-700"></div>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-sm md:text-xs lg:text-sm">
                  {noti.heading}
                </p>
                <div className="flex space-x-2 font-light text-xs">
                  <p>{noti.date}</p>
                  <p>{noti.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notification detais For laptop screen ratio */}
        <div className="h-fit bg-white rounded-xl shadow-lg w-full p-8 px-10 hidden md:block">
          <div className="flex justify-between">
            <div className="space-y-2">
              <p className="font-bold text-xl">
                {notificationList[mailIndex]?.heading}
              </p>
              <div className="flex space-x-2 font-light text-xs ">
                <p>{notificationList[mailIndex]?.date}</p>
                <p>{notificationList[mailIndex]?.time}</p>
              </div>
            </div>
            <div className="space-x-3 flex items-center">
              <TbMailCheck className="w-6 h-6 cursor-pointer" />
              {/* <button className='bg-blue-800 py-1 px-3 text-white rounded-lg'>Mark as Read</button> */}
              <MdOutlineDeleteForever className="w-7 h-7 cursor-pointer text-red-400" />
              {/* <button className='border-gray-400 border-2 text-black py-1 px-3  rounded-lg'>Delete</button> */}
              <button className="px-3 h-9 bg-green-200 rounded-3xl text-green-800 text-sm">
                Success
              </button>
            </div>
          </div>

          <div className="w-full border-b-2 border-gray-100">
            <div className="mt-7 lg:w-full flex justify-between  pb-5">
              <div className="text-sm">
                <p className="font-semibold mb-1">From</p>
                <p>{notificationList[mailIndex]?.From}</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold mb-1">Category</p>
                <p>{notificationList[mailIndex]?.Category}</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold mb-1">Priority</p>
                <p>{notificationList[mailIndex]?.Priority}</p>
              </div>
            </div>
          </div>

          <div className="text-sm mt-5 border-b-2 border-gray-100 pb-5">
            <p className="font-semibold  mb-1">Message</p>
            <p>
              The e-commerce platform has been successfully updated to version
              2.1.0. All systems are operating normally.
            </p>
          </div>

          <div className="space-x-4 mt-5"></div>
        </div>

        {/* Notification detais For mobole screen ratio */}
        {isOpenMobileNotifi ? (
          <div className="h-fit bg-white rounded-xl shadow-lg w-full p-4 px-5 block md:hidden">
            <div className="flex justify-between mb-3">
              <IoArrowBackSharp
                onClick={() => setIsOpenMobileNotifi(false)}
                className="w-5 h-5 cursor-pointer"
              />
              <div className="flex space-x-2">
                <TbMailCheck className="w-5 h-5 cursor-pointer" />
                <MdOutlineDeleteForever className="w-6 h-6 cursor-pointer text-red-400" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="font-bold text-sm md:text-xl">
                  {notificationList[mailIndex]?.heading}
                </p>
                <div className="flex space-x-2 font-light text-xs ">
                  <p>{notificationList[mailIndex]?.date}</p>
                  <p>{notificationList[mailIndex]?.time}</p>
                </div>
              </div>
              <div className="space-x-3 flex items-center ml-2">
                <button className="px-2 rounded-xl md:px-3 h-9 bg-green-200 md:rounded-3xl text-green-800 text-xs md:text-sm ">
                  Success
                </button>
              </div>
            </div>

            <div className="w-full border-b-2 border-gray-100">
              <div className="mt-7 flex justify-between pb-5 ">
                <div className="text-xs md:text-sm">
                  <p className="font-semibold mb-1">From</p>
                  <p>{notificationList[mailIndex]?.From}</p>
                </div>
                <div className="text-xs md:text-sm">
                  <p className="font-semibold mb-1">Category</p>
                  <p>{notificationList[mailIndex]?.Category}</p>
                </div>
                <div className="text-xs md:text-sm">
                  <p className="font-semibold mb-1">Priority</p>
                  <p>{notificationList[mailIndex]?.Priority}</p>
                </div>
              </div>
            </div>

            <div className="text-sm mt-5 border-b-2 border-gray-100 pb-5">
              <p className="font-semibold mb-1">Message</p>
              <p className="text-xs md:text-sm">
                The e-commerce platform has been successfully updated to version
                2.1.0. All systems are operating normally.
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Notification;
