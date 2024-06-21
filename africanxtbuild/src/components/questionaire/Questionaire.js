import * as React from "react";
import "./Questionaire.css";

const Questionaire = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="time-and-icons">
                    <div className="time">9:41</div>
                    <div className="icons">
                        <div className="icon-wrapper">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/82280934ec2d29ebbb78b56c6a0fd4ec2502de9ba360763e64df0a8d9bc482c3?"
                                className="icon-background"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/688ba00fbe58227ed5be8da1090220e8b0846710a6ca4568e026fffd2db2e006?"
                                className="icon-foreground"
                            />
                        </div>
                        <div className="icon-wrapper">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c1937d0c7775bf80f2e3b32e7abbdfa5aa13f12a4dfb37a321c797e55598dca?"
                                className="icon-background"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/315c4dd2ef4712b21d46880034f3da8ed2e9bae807ae5c718c7313800f14042c?"
                                className="icon-foreground"
                            />
                        </div>
                        <div className="icon-wrapper large">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/abd87139193e2c681f470fc76d77658c5c65d9ef1663d2b299df2961f3ccb20a?"
                                className="icon-background"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eaed7ad595d68cf957259ec0c7b372c973f866c86599c82815d94b9ac4b45bc?"
                                className="icon-foreground"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="progress-container">
                    <div className="progress-indicator">
                        <div className="progress-icon">􀆉</div>
                        <div className="progress-bar">
                            <div className="progress-fill" />
                        </div>
                    </div>
                    <div className="progress-text">
                        12 <span>/ 23</span>
                    </div>
                </div>
                <div className="question">How frequently do you experience these feelings?</div>
                <div className="option-container">
                    <div className="option">
                        all the time
                        <img
                            loading="lazy"
                            srcSet="..."
                            className="option-icon"
                        />
                    </div>
                    <div className="option">most of the time</div>
                    <div className="option">some of the time</div>
                    <div className="option">very rarely</div>
                </div>
            </div>
        </div>
    );
}
export default Questionaire;
