import React from 'react'
import { parentSrcType } from '../types/parentSrcType';
import SideBar from './SideBar';

// Props definition for the LinkButton component
interface linkButtonProps {
    children: React.ReactNode; 
    parentSrc: parentSrcType;                   //Source component   
}

//Render a shopping gallery with the gallery and a sidebar on the right (in desktop mode)
const ShoppingGallery = ({children, parentSrc}: linkButtonProps) => {
    return (
        <div className="flex flex-col gap-y-2
                            lg:flex-row lg:gap-x-2">
            <div className="flex flex-col gap-y-2 gap-x-2 items-start justify-between
                            md:flex-row md:flex-wrap">
                {children}
            </div>
            <SideBar parentSrc={parentSrc} />
        </div>
    )
}

export default ShoppingGallery