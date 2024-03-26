import './App.css';
import Container from "./components/container/Container";
import SpaceImage from './assets/images/space.png'


function App() {

    const style= {
        backgroundImage: `url(${SpaceImage})`
    }

    return (
        <div className='background' style={style}>
            <Container/>
            <div>
                Press A+A to add new schedule.
            </div>
        </div>
    )
}

export default App
