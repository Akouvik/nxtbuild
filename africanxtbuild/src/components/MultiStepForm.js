import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, prevStep, setFormData } from './redux/formSlice';
import './MultiStepForm.css';
import logo from './Africa-NXT-Logo.png'
import { useNavigate } from 'react-router-dom';


const MultiStepForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { step, formData } = useSelector((state) => state.form);
    const [input, setInput] = useState('');
    const [activeOption, setActiveOption] = useState(null);

    const steps = [
        {
            type: 'select',
            question: 'How frequently do you experience these feelings?',
            options: ['all the time', 'most of the time', 'some of the time', 'very rarely'],
            bgColor: '#C3B091',
            titleColor: '#808000',
            textColor: '#fff'
        },
        {
            type: 'input',
            question: 'Please describe your feelings in a few words.',
            bgColor: '#F4A460',
            titleColor: '#654321',
            textColor: '#F5F5DC'
        },
        {
            type: 'select',
            question: 'How often do you feel stressed?',
            options: ['always', 'often', 'sometimes', 'never'],
            bgColor: '#F5F5DC',
            titleColor: '#228B22',
            textColor: '#FFFDD0'
        },
        {
            type: 'select',
            question: 'How often do you feel stressed?',
            options: ['always', 'often', 'sometimes', 'never'],
            bgColor: '#483C32',
            titleColor: '#8A9A5B',
            textColor: '#B2AC88'
        },
        {
            type: 'select',
            question: 'How often do you feel stressed?',
            options: ['always', 'often', 'sometimes', 'never'],
            bgcolorcolor: '#C19A6B',
            titleColor: '#008080',
            textColor: '#FFFFF0'
        },
        {
            type: 'select',
            question: 'How often do you feel stressed?',
            options: ['always', 'often', 'sometimes', 'never'],
            bgColor: '#E97451',
            titleColor: '#9C9C7C',
            textColor: '#FAF0E6'
        },
        {
            type: 'select',
            question: 'How often do you feel stressed?',
            options: ['always', 'often', 'sometimes', 'never'],
            bgColor: '#CC7722',
            titleColor: '#C04000',
            textColor: '#D3D3D3'
        }
    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setFormData({ [step]: input }));
        setInput('');
        if (step < steps.length) {
            dispatch(nextStep());
        }
    };

    const handleOptionClick = (option) => {
        dispatch(setFormData({ [step]: option }));
        // if (step < steps.length) {
        //     dispatch(nextStep());
        // }
    };

    const progress = step == 1 ? 0 : ((step - 1) / steps.length) * 100;
    const handleFormSubmit = () => {
        navigate("/signinform")
    }
    return (
        <div className="multi-step-form-container">
            <div className="content" style={{ borderRadius: 10 }}>
                <div className="progress-container">
                    <div className="progress-indicator">
                        <div className="progress-icon">􀆉</div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <img src={logo} style={{ backgroundColor: step === steps.length ? "pink" : steps[step]?.bgColor }} />
                    <div className="progress-text">
                        {step} <span>/ {steps.length}</span>
                    </div>
                </div>
                <div className="question" style={{ backgroundColor: step === steps.length ? "pink" : steps[step]?.titleColor, borderRadius: 10, color: ' #FFF', padding: 30 }}>{steps[step - 1]?.question}</div>
                <div style={{ marginBottom: 30 }}>
                    {steps[step - 1]?.type === 'select' ? (
                        <div className="option-container">
                            {steps[step - 1].options.map((option) => (

                                <div
                                    key={option}
                                    className='option'
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                    {formData[step] === option && <span> ✔</span>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group input-form">
                                <textarea
                                    className='input-field'
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value.replace('\\n', '\n'))}
                                />

                            </div>
                        </form>
                    )}
                </div>
                <div className="form-step form-step-input-next" >
                    {step !== steps.length &&
                        <button type="submit"
                            onClick={() => dispatch(nextStep())}
                            style={{ backgroundColor: steps[step]?.titleColor, borderColor: steps[step]?.titleColor, color: '#fff' }}>Next</button>
                    }
                </div>
                <div className="form-step">
                    {step > 1 && <button onClick={() => dispatch(prevStep())} style={{ backgroundColor: step === steps.length ? "#00caca" : steps[step]?.titleColor, borderColor: step === steps.length ? "#00caca" : steps[step]?.titleColor, color: '#fff' }}>Previous</button>}
                </div>
                {step === steps.length && (
                    <div className="form-step">
                        <button onClick={() => navigate("/signuplogin", { state: 'signup' })} style={{ backgroundColor: "#00caca", fontWeight: "bolder", color: '#fff', fontSize: 20, borderColor: '#00caca' }}>Submit</button>
                    </div>
                )}


            </div>
            <div className="progress-bar" >
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%`, backgroundColor: "#72c4d0" }}
                ></div>
            </div>
        </div>
    );
};

export default MultiStepForm;
