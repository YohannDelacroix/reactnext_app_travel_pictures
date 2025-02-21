import React from 'react'
import { parentSrcType } from '../types/parentSrcType';
import SideBar from './SideBar';
import PageContainer from './PageContainer';

// Props definition for the Shopping Gallery component
interface shoppingGalleryProps {
    children: React.ReactNode;
    parentSrc: parentSrcType;                   //Source component   
}

//Render a shopping gallery with the gallery and a sidebar on the right (in desktop mode)
const ShoppingGallery = ({ children, parentSrc }: shoppingGalleryProps) => {
    return (
        <PageContainer parentSrc={parentSrc}>
            <div className="flex flex-col gap-y-2 gap-x-2 items-start justify-between
                            md:flex-row md:flex-wrap">
                {children}
            </div>
        </PageContainer>
    )
}

export default ShoppingGallery