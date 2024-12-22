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
            'Authorization': 'Bearer eyJ4NXQiOiJyZXo3ZVBkVE05Wm5KVW9lMGxERDd1cjJDYVUiLCJraWQiOiJZMk0zWldZek5USTVaakpqWldRMlltTmpNMkl4WWpkbU5ESmtOR1ZoWm1VNE1qRTNaamt6T0RnME5EZ3pNVGt5TVdFNU9EUTVOMlUwT1RsaE16TmtPUV9SUzI1NiIsInR5cCI6ImF0K2p3dCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJUSDh4V2JVTm55dGlfZkI0S3VNUjg2TGk4WllhIiwiYXV0IjoiQVBQTElDQVRJT04iLCJhdWQiOlsiVEg4eFdiVU5ueXRpX2ZCNEt1TVI4NkxpOFpZYSIsImNob3JlbzpkZXBsb3ltZW50OnByb2R1Y3Rpb24iXSwibmJmIjoxNzM0ODYwNjg3LCJhenAiOiJUSDh4V2JVTm55dGlfZkI0S3VNUjg2TGk4WllhIiwib3JnX2lkIjoiMzFhNTdmMTMtMjFjNC00ODJlLWEwMWUtNDQ1NjBlZGU1ZmViIiwiaXNzIjoiaHR0cHM6XC9cL2FwaS5hc2dhcmRlby5pb1wvdFwvc2FkaWxlYXN5bWVldDFcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE3NDQ4NjA2ODcsIm9yZ19uYW1lIjoic2FkaWxlYXN5bWVldDEiLCJpYXQiOjE3MzQ4NjA2ODcsImp0aSI6ImYzMjdkOTg0LTNiZDQtNDEyMy1hYjE3LTY5OGE2OGI5MDBkZCIsImNsaWVudF9pZCI6IlRIOHhXYlVObnl0aV9mQjRLdU1SODZMaThaWWEifQ.qmf6SyLYgHgxaXXmC7Cw2JaQiPsbwFGxMdVKngxPgmeeeJFxqJkmyeMiplJ_T08dz6ha5nb_PTv0xgrpZwf5MnEZXFDvZiwX3sXNHP5fkC-4G_XJwyy1cvsUQDxcgsV-1eaJzUQF1Bgiskxc3zMMc6eZW1ZT7hYSlARZCmo4mH2IekNjF6JDCLK0DIVzEl4_oMGK2pSgap5l2vjYYWrdt67Ay_KvOHfTeeBACS3xnBmaE8FIKXPkGZzWEMztYNfw51SVjDACPne8ZPdCEVbKa3IB8r0uBhR_Aiw6yWaqmoO68k4h1gFOsExrUgtVA45sK9wi8Hr_9bqv_r5M6_C6Jg'
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
