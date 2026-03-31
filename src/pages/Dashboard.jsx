import React, { useEffect, useState } from 'react'
import ResponseAi from '../component/ResponseAi'
import Sidebar from '../component/Sidebar'
import api from "../server/api"
function Dashboard() {
  const [messages, setMessages] = useState([])
  const [chatId, setChatId] = useState(null)
  const [chats, setChats] = useState([])
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    setUserName(user)
  }, [])

  useEffect(()=>{
    const fetchChats=async()=>{
      try{
        const res=await api.get('/users/ai/chats')
        setChats(res.data?.chats||[])

      }catch(error){
        console.log(error?.response?.data?.message||error.message)
      }
    }
    fetchChats()
  },[])
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2'>
        <Sidebar
        chats={chats}
        setMessages={setMessages}
        setChatId={setChatId}
        messages={messages}
        userName={userName}
        />
      </div>
      <div className='col-span-10'>
        <ResponseAi
        messages={messages}
        setMessages={setMessages}
        chatId={chatId}
        setChatId={setChatId}
        chats={chats}
        setChats={setChats}
        />
      </div>
    </div>
  )
}

export default Dashboard
