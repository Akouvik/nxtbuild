import { useReactMediaRecorder } from 'react-media-recorder';
import React, { useEffect, useState } from 'react';
import './AudioRecorder.css'; // Import your CSS file for styling

const AudioRecorder = (props) => {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
  }

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });

  return (
    <div className="audio-recorder">
      <div className="status-bar">
        <h4>{status} </h4>
        <div className="timer">
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>
      </div>
      <div className="video-container">
        <video src={mediaBlobUrl} controls loop />
      </div>

      <div className="button-group">
        <button
          onClick={() => {
            if (!isActive) {
              startRecording();
            } else {
              pauseRecording();
            }
            setIsActive(!isActive);
          }}
        >
          {isActive ? 'Pause' : 'Record'}
        </button>
        <button
          onClick={() => {
            stopRecording();
            pauseRecording();
          }}
        >
          Stop
        </button>
        <button onClick={stopTimer}>Clear</button>
      </div>
    </div>
  );
};

export default AudioRecorder;
