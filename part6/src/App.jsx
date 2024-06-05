import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    )
}

// Every input has the same name attribute --> They form a button group, only one can be selected

export default App