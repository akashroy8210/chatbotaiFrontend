import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../server/api'
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
function ResponseAi({
    messages,
    setMessages,
    chatId,
    setChatId,
    setChats
}) {
    const [step, setStep] = useState(1)
    const [query, setQuery] = useState('')
    const [error, setError] = useState("")
    useEffect(()=>{
        setStep(messages.length>0?2:1)
    })
    const handleResponse = async () => {
        if (!query.trim()) return;
        setError("")
        const currentQuery=query
        const userMsg = { role: "user", content: currentQuery}
        setMessages((prev) => [...prev, userMsg])
        setQuery('')
        setStep(2)
        try {
            const res = await api.post('/users/ai/new-chat', {
                userMessage:currentQuery,
                chatId
             })
            const newChatId=res.data.chatId
            setChatId(newChatId)
            const botMsg = { role: "assistant", content: res.data.reply }
            setMessages((prev) => [...prev, botMsg])
            setChats((prev=>{
                const exists=prev.some((c)=>c._id===newChatId)
                if(!exists){
                    return [
                        {
                            _id:newChatId,
                            title:currentQuery.slice(0,20),
                            messages:[userMsg,botMsg]
                        },
                        ...prev
                    ]
                }
                return prev.map((c)=>
                c._id===newChatId ? {...c, messages:[...c.messages,userMsg,botMsg]}
                :c
                )
            }))
        } catch (err) {
            setError(err.response.data.message)
            console.log(err.response.data.message)
        }
    }

    return (
        <div>
            <div className='flex'>
                {error && <p>{error}</p>}
                {step === 1 ? (
                    <div className='flex justify-center items-center mx-auto h-screen'>
                        <div className='flex flex-col justify-center items-center gap-10'>
                        <div className='flex flex-col gap-10'>
                            <h1 className='text-6xl font-bold flex flex-col items-center'><span className='text-[#333C4E]'>Where do you want to</span><span className='text-[#213980]'>explore today?</span></h1>
                            <p className='text-[#6B7280] font-semibold text-lg text-center'>Query multiple advacned models simultaneously</p>
                        </div>
                        <div className='bg-white border border-[#213980] w-150 flex  relative px-2 rounded-full shadow-xl'>
                            <ion-icon
                                className='absolute left-3 top-[14px] text-[#333C4E] text-2xl'
                                name="search-outline"></ion-icon>
                            <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value) }}
                                onKeyDown={(e) => e.key === "Enter" && handleResponse()}
                                placeholder='typing....'
                                className='outline-none w-full text-lg font-semibold text-[#333C4E] px-10 py-3'
                            />
                            <button
                                onClick={handleResponse}
                                
                            >
                                <ion-icon
                                    className="bg-[#213980] text-white text-2xl px-2 py-2 absolute right-2 top-[7px] rounded-full"
                                    name="arrow-up-outline"></ion-icon></button>
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className='flex flex-col relative justify-center items-center h-screen mx-auto max-w-3xl '>   
                        <div className="flex-1 overflow-y-auto space-y-4  w-full overflow-hidden mt-3 ">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`rounded-lg ${msg.role === "user"
                                            ? "bg-[#1A2E6B] text-white max-w-[70%] px-4 py-[1px] font-semibold rounded-2xl ml-auto"
                                            : " text-[#333C4E] bg-[#F0F1F5] w-full px-4 py-2 :  "
                                        }`}
                                >
                                    <div className='markddown  prose prose-invert'>
                                        <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={
                                            {
                                                code({inline,children}){
                                                    return inline ?(
                                                        <code className='bg-gray-700 p-4 rounded-lg overflow-x-auto'>
                                                            {children}
                                                        </code>
                                                    ):(
                                                        <pre className='bg-[#1A2E6B] text-white p-4 rounded-2xl my-2 mx-2 overflow-x-auto'>
                                                            <code>{children}</code>
                                                        </pre>
                                                    )
                                                }
                                            }
                                        }
                                         >{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='bg-white backdrop-blur-2xl border border-[#333C4E] w-200 flex mb-10  relative items-center  py-1 px-3 rounded-full shadow-xl  '>
                            <ion-icon
                                className='absolute left-3 top-[18px] text-[#333C4E] text-2xl'
                                name="search-outline"></ion-icon>
                            <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value) }}
                                onKeyDown={(e) => e.key === "Enter" && handleResponse()}
                                placeholder='typing....'
                                className='outline-none w-full text-lg font-semibold text-[#333C4E] px-10 py-2'
                            />
                            <button onClick={handleResponse}>
                                <ion-icon
                                    className="bg-[#1A2E6B] text-white cursor-pointer text-2xl px-2 py-2 absolute right-2 top-[7px] rounded-full"
                                    name="arrow-up-outline"></ion-icon></button>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default ResponseAi
