import "./styles.css"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Products } from "./components/Products"

export const App = (props) => {
    return (
        <div className="App">
            <Navbar />
            <Products />
            <Footer />
        </div>
    )
}
