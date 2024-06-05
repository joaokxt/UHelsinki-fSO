import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    return (
        <div>
            All
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))} /><br></br>
            Important
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))} /><br></br>
            Non-important
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
        </div>
    )
}

export default VisibilityFilter