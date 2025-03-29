import React from 'react'
import "@/styles/loading.css"

/**
 * Loading Component
 * Displays a spinning loader to indicate that a process is in progress.
 * 
 * This component uses a CSS-based spinner animation and is designed to be
 * reusable across different sections of the application.
 *
 * Styling:
 * - The `.loading-container` provides the container for the spinner.
 * - The `.loading-spin` pseudo-element is used for the spinner animation, 
 *
 * Example Usage:
 * Writing <Loading /> anywhere in the code will display the spinner animation 
 */

const Loading = () => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
        <div className="loading-spin"></div>
    </div>
  )
}

export default Loading