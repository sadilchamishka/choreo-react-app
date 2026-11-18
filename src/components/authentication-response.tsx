import React, { FunctionComponent, ReactElement, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './home.css';

interface AuthenticationResponsePropsInterface {
    derivedResponse?: any;
}

export const AuthenticationResponse: FunctionComponent<AuthenticationResponsePropsInterface> = (
    props: AuthenticationResponsePropsInterface
): ReactElement => {

    const { derivedResponse } = props;

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
    const [loading, setLoading] = useState(false); // Loading state for API call
    const [error, setError] = useState(''); // Error message state

    const handleChange = (e: { target: { name: string; value: string } }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Prepare API request
        const url = new URL('https://31a57f13-21c4-482e-a01e-44560ede5feb-prod.e1-us-east-azure.choreoapis.dev/ewbb/reading-books-list-service/v1.0/predict');
        url.searchParams.append('param1', formData.gravity);
        url.searchParams.append('param2', formData.ph);
        url.searchParams.append('param3', formData.osmo);
        url.searchParams.append('param4', formData.cond);
        url.searchParams.append('param5', formData.urea);
        url.searchParams.append('param6', formData.calc);

        const headers = {
            accept: 'application/json',
            'Authorization': 'Bearer eyJ4NXQiOiJyZXo3ZVBkVE05Wm5KVW9lMGxERDd1cjJDYVUiLCJraWQiOiJZMk0zWldZek5USTVaakpqWldRMlltTmpNMkl4WWpkbU5ESmtOR1ZoWm1VNE1qRTNaamt6T0RnME5EZ3pNVGt5TVdFNU9EUTVOMlUwT1RsaE16TmtPUV9SUzI1NiIsInR5cCI6ImF0K2p3dCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJ5bUpUcFhOWXN3RTZQOFVZblJ1TXBWdlVoN1VhIiwiYXV0IjoiQVBQTElDQVRJT04iLCJpc3MiOiJodHRwczovL2FwaS5hc2dhcmRlby5pby90L3NhZGlsZWFzeW1lZXQxL29hdXRoMi90b2tlbiIsImNsaWVudF9pZCI6InltSlRwWE5Zc3dFNlA4VVluUnVNcFZ2VWg3VWEiLCJhdWQiOlsieW1KVHBYTllzd0U2UDhVWW5SdU1wVnZVaDdVYSIsImNob3JlbzpkZXBsb3ltZW50OnByb2R1Y3Rpb24iXSwibmJmIjoxNzk1MDE2MTQ3LCJhenAiOiJ5bUpUcFhOWXN3RTZQOFVZblJ1TXBWdlVoN1VhIiwib3JnX2lkIjoiMzFhNTdmMTMtMjFjNC00ODJlLWEwMWUtNDQ1NjBlZGU1ZmViIiwiZXhwIjoxODk1MDE2MTIxLCJvcmdfbmFtZSI6InNhZGlsZWFzeW1lZXQxIiwiaWF0IjoxNzk1MDE2MTQ3LCJqdGkiOiJkMWYyMjViMS0wNzgyLTRmNTItOTMwYy1kODM5MDEyMmRhM2MiLCJvcmdfaGFuZGxlIjoic2FkaWxlYXN5bWVldDEifQ.SZGS0haJhIeZUIgqr4soQmDqFnSVZHPywEhWO58cCclvHzLTy_wJx2hdyMiGpFWVC7gizG4tKkfVJCEom8JGkUjxrvVGFHSpu_HCT68OmibEVPA69fZFaeDLnWyH9YDQzWKjSZcWwGwdo1KwJEGtgMOIL0dvnS_GCWkL3OLQyxvBF--g4I8pp_yGzy9CKtWW9gyhLAe-eNuTsEsIzsnscK_9eX8jllFYtXY4nU5Eqo1vOTOkxkuDLwBAoVPo8a4mYb5edv1a1wbDtA2T5JcguKQUi9iOpTPPsJhVe8f4VJuWF9QOvk80fX0sUUMe7kr2WWpxH-vdJY91SO6rQNNmgQ'
        };

        try {
            const response = await fetch(url.toString(), { headers });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const calculatedRisk = data*100;
            setRisk(parseFloat(calculatedRisk.toFixed(2)));

            setPrediction(
                calculatedRisk > 50
                    ? "You are at risk of getting Kidney Stone"
                    : "You are not at risk of getting Kidney Stone"
            );
        } catch (error: any) {
            setError('Failed to fetch risk prediction. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <div className="prediction-container">
                <h3>Prediction: {prediction}</h3>
                <div className="progress-container" style={{ width: 150, height: 150, margin: "auto" }}>
                    <CircularProgressbar
                        value={risk}
                        text={`${risk}%`}
                        styles={buildStyles({
                            textSize: "16px",
                            pathColor: risk > 50 ? "red" : "green",
                            textColor: "#000",
                            trailColor: "#ddd",
                        })}
                    />
                </div>
            </div>
        </div>
    );
};
