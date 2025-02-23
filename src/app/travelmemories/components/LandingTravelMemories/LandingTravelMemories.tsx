"use client"
import React from 'react'
import TravelMemoriesAccessForm from './TravelMemoriesAccessForm'
import { Trans, useTranslation } from 'react-i18next'

const LandingTravelMemories = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-full text-center">
            <div className="max-w-xl w-full bg-white shadow-lg p-8 rounded-2xl text-center">
                <h1 className="text-4xl text-[#a6c9e2] mb-4 font-extrabold">
                    <Trans i18nKey="landingPage.title"
                        defaults="Get Your Travel Memories!"
                    />
                </h1>
                <p className="text-gray-600 mb-6">
                    <Trans i18nKey="landingPage.description"
                        defaults="Did you just meet one of our photographers on the street? Gain access to the photos they took of you by entering the ID you received in your inbox!"
                    />
                </p>
                <TravelMemoriesAccessForm />
            </div>
        </div>
    )
}

export default LandingTravelMemories