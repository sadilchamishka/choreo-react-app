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
        const url = new URL('https://31a57f13-21c4-482e-a01e-44560ede5feb-dev.e1-us-east-azure.choreoapis.dev/ewbb/reading-books-list-service/v1.0/predict');
        url.searchParams.append('param1', formData.gravity);
        url.searchParams.append('param2', formData.ph);
        url.searchParams.append('param3', formData.osmo);
        url.searchParams.append('param4', formData.cond);
        url.searchParams.append('param5', formData.urea);
        url.searchParams.append('param6', formData.calc);

        const headers = {
            accept: 'application/json',
            'Test-Key': 'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2MTExZmY5MC0wYzYwLTRiNjQtOGZhNy1hZGMxY2ZkZjAxYThAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJSZWFkaW5nIGJvb2tzIGxpc3Qgc2VydmljZSAtIEJvb2tzIFJFU1QgRW5kcG9pbnQiLCJjb250ZXh0IjoiXC8zMWE1N2YxMy0yMWM0LTQ4MmUtYTAxZS00NDU2MGVkZTVmZWJcL2V3YmJcL3JlYWRpbmctYm9va3MtbGlzdC1zZXJ2aWNlXC92MS4wIiwicHVibGlzaGVyIjoiY2hvcmVvX3Byb2RfYXBpbV9hZG1pbiIsInZlcnNpb24iOiJ2MS4wIiwic3Vic2NyaXB0aW9uVGllciI6bnVsbH1dLCJleHAiOjE3MzQ0OTIzODcsInRva2VuX3R5cGUiOiJJbnRlcm5hbEtleSIsImlhdCI6MTczNDQ5MTc4NywianRpIjoiMjdhYWY3ZjQtZTEwOS00ZDc0LTk3NzMtZTk4YzlhOTdlY2NiIn0.GdomR9EZ93E-lRpBfnKbQ9RY0CRPBFUj1Hmim1tsOKMUrzvfpdqsCzXepCTG2iKcT4dMwvQAH-KAsnuYexnRilbT3ShXqMleBehofaM04q-X1EolmFKnhA5unsfWnvSX71hAsXZK41vbWD9jSdL87AYdOfutm2KvZukfylFqkx_343GS8tBNWSm111sLYU8N1tk7wNlDGnRwWfyxoZMt-beR-3Pd8TMgPH5un2KtrRIgZ-NArmEg7RDSZhpCd7QPnb7lT4J9w1N_yfmQiSlZrNC0j9PPwffbTc4qtK-I1UACweFg5FUlc9flLdcGaJwruxAE0jK-Nl0z3RBAKzFbpf-Gcwjd1kEISknLvtFI5SKblEesL6Y5RY-HfFRtXSp0LT98CfKH7EZiqiiOGs_dx5c5sdg8ITYK-G53iQHNWKPsw2ERxjvo7eiGx-AtR5K1B68t5JpEPBWR9jBBcI1JHKKjfiQqpt5vqbE1Pqsi6ZNxFX96GBhjU1JdkQhVxHDBaP9JNeYOcPPYgbTZ80aJaPS2kVkau0U35_koX2bojCXr3GHYCK9xZUP7Iu3ZbeExwAoWXhxnBu1_eOVZmNoQprYEYf_kUaHtmVKB72NHgLGBbkv1Jz1reMm-sMIW9GS8pr05Jriwn_c-oZvMiP3iI1mArT2F3comxS6Aq-l8zH4'
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
