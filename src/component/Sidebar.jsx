import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
function Sidebar({
  chats,
  setMessages,
  setChatId,
  messages,
  userName
}) {
  
  const handleLogout=async()=>{
    try{
      localStorage.removeItem("token")
      window.location.href="/"
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='bg-white backdrop-blur-md  flex flex-col gap-3 h-screen '>
      <div>
        <h1 className='text-2xl font-bold flex gap-2  px-4 pt-2'><span className='text-[#333C4E]'>Poly</span><span className='text-[#1A2E6B]'>Chat</span></h1>
      </div>
      <div className='pb-4 px-4'>
        <button
          onClick={() => {
            setMessages([])
            setChatId(null)
          }}
          className='flex items-center  gap-2 bg-[#1A2E6B] text-white py-3 px-5 text-xl w-full rounded-xl font-semibold cursor-pointer hover:bg-[#1d3d9e] transition-all duration-200'>
          <ion-icon name="add-outline"></ion-icon>
          <span>New Chat</span>
        </button>
      </div>
      <div className='pb-4 px-4 flex flex-col gap-1 overflow-y-scroll '>
        {/* maps chat history */}
        <h1 className='px-4 text-xl font-semibold pb-0 m-0'>Your Chats</h1>
        {chats.map((chat) => (
          <div
            className='hover:bg-slate-200 font-medium font-serif py-1 px-4 text-lg text-[#6B7280] cursor-pointer rounded-xl transition-all duration-200'
            onClick={() => {
              setChatId(chat._id)
              setMessages(chat.messages)
            }}
            key={chat._id}>
            {chat.title}
          </div>
        ))}
      </div>
      <div className='border-t-2 border-gray-300'>
        {/* profile view */}
        <div className='flex flex-col'>
          <div className='py-4  px-8 flex  font-semibold text-xl text-[#333C4E] items-center gap-5'>
            <ion-icon name="settings-outline"></ion-icon>
            <span>Settings</span>
          </div>
          <div className='px-6 mb-5'>
            <div className='bg-[#F8FAFC] flex items-center justify-evenly  border border-[#E0E2E7] rounded-2xl py-2'>
              <div>
                <h1 className='px-4  text-lg font-medium text-[#6B7280]'>
                  {userName.name || "User"}
                </h1>
                <h1 className='px-4 text-sm font-medium text-[#6B7280]'>{userName.email || "user"}</h1>
              </div>
              <button
                onClick={handleLogout}
                className='font-bold text-2xl cursor-pointer'
              ><ion-icon name="log-out-outline"></ion-icon></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
