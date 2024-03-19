import './App.css';
import FloatingCard from "./components/card/FloatingCard";
import {useRef, useState} from "react";


function App() {
    const floatingCardRef = useRef(null);

    return (
        <div>
            <FloatingCard ref={floatingCardRef}>Drag Me</FloatingCard>
        </div>
    )
}

export default App
