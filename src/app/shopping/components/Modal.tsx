/**
 * Modal Component
 * 
 * Reusable modal component that displays a dialog box in the center of the screen.
 * It listens for clicks outside the modal to close itself when triggered.
 * Content inside the modal is customizable by passing children as props.
 * 
 * @component
 * 
 * @param {Object} props                - The props for the Modal component
 * @param {boolean} props.isOpen        - Flag indicating whether the modal is visible or not
 * @param {Function} props.handleClose  - Function to close the modal
 * @param {ReactNode} props.children    - Content to be displayed inside the modal
 * 
 * @returns {JSX.Element|null}          - The rendered modal component or null if it's not open
 * @author Yohann Delacroix
 */

import { useRef, useEffect, ReactNode } from "react";
import { ImCross } from "react-icons/im";

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };
         // If the modal is open, add event listener for detecting clicks outside
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        // Clean up event listener when the modal is closed or component is unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, handleClose]);

    // If the modal is not open, return null (don't render anything)
    if (!isOpen) return null;

    return (
        <div ref={modalRef}
            className="flex flex-col justify-around w-[60%] h-[25%] px-3 py-6 bg-[#A6C9E2] bg-opacity-80 fixed z-10 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[0.8rem] text-black
                                    lg:text-[0.7rem]">
            <div className="absolute top-[0.5rem] right-[0.5rem] hover:text-red-500 cursor-pointer"
                onClick={handleClose}><ImCross /></div>
            {children}
        </div>
    );
};

export default Modal;
