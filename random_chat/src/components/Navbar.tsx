'use client'
import React from 'react'
import { motion } from 'motion/react'
import { MessagesSquare } from 'lucide-react'

const Navbar = ({show}:{show:boolean}) => {


    if (!show) {
        return null;
    }

    return (
        <motion.div
            initial={{y:-40, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{duration:0.5}}
            className='fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-indigo-950/50 to-slate-900/50 backdrop-blur border-b border-cyan-400/20'
        >
            <div className='max-w-7xl mx-auto px-6 py-4 flex items-center gap-3'>
                <span className='flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/40 to-pink-500/40 border border-cyan-400/30'>
                    <MessagesSquare size={18} color='#06f' />
                </span>
                <span className='text-lg font-semibold tracking-tight bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent'>Random Chat</span>
            </div>
        </motion.div>
    )
}

export default Navbar