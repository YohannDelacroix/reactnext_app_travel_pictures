import React from 'react'
import TravelMemoriesAccessForm from './TravelMemoriesAccessForm'

const LandingTravelMemories = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full text-center">
            <div className="max-w-xl w-full bg-white shadow-lg p-8 rounded-2xl text-center">
                <h1 className="text-4xl text-[#a6c9e2] mb-4 font-extrabold">Get your travel photos</h1>
                <p className="text-gray-600 mb-6">Have you just met one of our photographers in the street? Get access to the photos they took of you by entering your ID!</p>
                <TravelMemoriesAccessForm />
            </div>
        </div>
    )
}

export default LandingTravelMemories