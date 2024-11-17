/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { BasicUserInfo } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement, useState } from "react";
import './home.css'

/**
 * Decoded ID Token Response component Prop types interface.
 */
interface AuthenticationResponsePropsInterface {
    /**
     * Derived Authenticated Response.
     */
    derivedResponse?: any;
}

export interface DerivedAuthenticationResponseInterface {
    /**
     * Response from the `getBasicUserInfo()` function from the SDK context.
     */
    authenticateResponse: BasicUserInfo;
    /**
     * ID token split by `.`.
     */
    idToken: string[];
    /**
     * Decoded Header of the ID Token.
     */
    decodedIdTokenHeader: Record<string, unknown>;
    /**
     * Decoded Payload of the ID Token.
     */
    decodedIDTokenPayload: Record<string, unknown>;
}

/**
 * Displays the derived Authentication Response from the SDK.
 *
 * @param {AuthenticationResponsePropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const AuthenticationResponse: FunctionComponent<AuthenticationResponsePropsInterface> = (
    props: AuthenticationResponsePropsInterface
): ReactElement => {

    const {
        derivedResponse
    } = props;

    const [formData, setFormData] = useState({
        gravity: '1.013',
        ph: '6.19',
        osmo: '443',
        cond: '14.8',
        urea: '124',
        calc: '1.45',
      });
    
      const [prediction, setPrediction] = useState('');
      const [risk, setRisk] = useState(0); // Progress cycle percentage
    
      const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        //Example logic for prediction and risk calculation
        const calculatedRisk = Math.random() * 100; 
        // setRisk(calculatedRisk.toFixed(2));
        setPrediction('You are not at the risk of getting Kidney Stone'); 
      };

    return (
        <div className="home-container">
          <h2>Kidney Stone Risk Prediction</h2>
          <form onSubmit={handleSubmit} className="input-form">
            <label>
              Gravity:
              <input
                type="text"
                name="gravity"
                value={formData.gravity}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              pH:
              <input
                type="text"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Osmo:
              <input
                type="text"
                name="osmo"
                value={formData.osmo}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Cond:
              <input
                type="text"
                name="cond"
                value={formData.cond}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Urea:
              <input
                type="text"
                name="urea"
                value={formData.urea}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Calc:
              <input
                type="text"
                name="calc"
                value={formData.calc}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <div className="prediction-container">
            <h3>Prediction: {prediction}</h3>
            <div className="progress-container">
              <p>Risk of Kidney Stone: {risk}%</p>
            </div>
          </div>
        </div>
      );
};
