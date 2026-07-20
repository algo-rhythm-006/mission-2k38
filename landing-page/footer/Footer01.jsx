import React from 'react'
import Content from './Footer';

export default function Footer01() {
    return (
        <div
            className='relative h-screen'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='relative h-[200vh] -top-[100vh]'>
                <div className='h-screen sticky top-0'>
                    <Content />
                </div>
            </div>
        </div>
    )
}