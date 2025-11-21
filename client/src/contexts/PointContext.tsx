import React, { createContext, useContext, useState } from 'react';
import { fetchData } from 'lib/utils';
import { useUser } from './UserContext';

type PointContextType = {
    points: number;
    setPoints: (value: number) => void;
    submit: () => Promise<void>;
};

const PointContext = createContext<PointContextType | undefined>(undefined);

export const PointSender: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { username } = useUser();
    const [points, setPoints] = useState(0);
   
    const submit = async () => {
        const baseUrl = process.env.REACT_APP_SERVER;
        try {
            await fetchData(`${baseUrl}/leaderboards`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username, points })
            });
            console.log('Points submitted:', points);
            setPoints(0)
        } catch (error) {
            console.error('Failed to submit points', error);
        }
    };

    return (
        <PointContext.Provider value={{ points, setPoints, submit }}>
            {children}
        </PointContext.Provider>
    );
};

export const usePoints = () => {
    const context = useContext(PointContext);
    if (!context) throw new Error('usePoints must be used inside PointSender');
    return context;
};
