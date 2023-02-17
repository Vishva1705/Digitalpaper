import React from 'react'
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';

export default function Sharing(props) {

    const handleCaptureClick = async () => {
        const canvas = await html2canvas(document.getElementById('download'));
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
    };

    return (
        <>
            <div>
                <li>
                    <a href="#" onClick={handleCaptureClick}>
                        Capture
                    </a>
                </li>
                <li>welcome</li>
            </div>

            <body>
                <div id='download'>   
                    <h1>welcome to the shared page</h1>
                    <div> {props.data}</div>
                </div>
            </body>

        </>
    )
}
