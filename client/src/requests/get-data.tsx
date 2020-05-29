import {useStore} from "react-redux";
import {State} from "../redux/state";

const getData = () => {
    const filter = useStore<State>().getState().filter.active;


};

export default getData;
