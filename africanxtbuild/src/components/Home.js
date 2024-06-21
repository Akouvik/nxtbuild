import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/countSlice';


const Home = () => {
    const count = useSelector((state) => state.count.count);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Home</h1>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};

export default Home;
