import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({
    currentTrack,
    audioRef,
    setDuration,
    progressBarRef,
    handleNext,
}) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    return (
        <div style={{
            height: '20px', bottom: 30,
            position: 'relative',
        }}>
            <audio
                src={currentTrack.src}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleNext}
            />
            <div className="audio-info">
                <div className="text">
                    <p>{currentTrack.author}</p>
                </div>
                <div className="audio-image">
                    {currentTrack.thumbnail ? (
                        <img src={currentTrack.thumbnail} alt="audio avatar" />
                    ) : (
                        <div className="icon-wrapper">
                            <span className="audio-icon">
                                <BsMusicNoteBeamed />
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className="audio-button-container">
                <button className="audiobtn vibes">Just Vibes</button>
                <button className="audiobtn memo">Voice Memo</button>
            </div> */}
        </div>
    );
};
export default DisplayTrack;