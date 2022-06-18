import React from "react"
import loading from '../Components/Images/0016_gif_loading.gif'
import '../Components/Styles/Loading.css'

export const Loading = () => {

    return (
        <>
            <img src={loading} alt="Loading" />
            <div className="text-container">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        </>
    )
}