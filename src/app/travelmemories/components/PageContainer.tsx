import React from 'react'
import { parentSrcType } from '../types/parentSrcType';
import SideBar from './SideBar';
import classNames from 'classnames';

// Props definition for the Shopping Gallery component
interface pageContainerProps {
    children: React.ReactNode;
    parentSrc: parentSrcType;                   //Source component   
}

//PageContainer renders a content and a sidebar responsive given the screen sizes
const PageContainer = ({ children, parentSrc }: pageContainerProps) => {
    return (
        <div className={classNames(
            "flex flex-col gap-y-2",
            "lg:flex-row lg:gap-x-2 lg:items-start"
        )}
        >
            <div className={classNames(
            "lg:w-[75%]",
            {"mb-4": parentSrc === parentSrcType.PAYMENT}
        )}>{children}</div>
            <SideBar parentSrc={parentSrc} />
            
        </div >
    )
}

export default PageContainer