import React, { createContext, useContext, useState } from 'react';
import { fetchData } from 'lib/utils';
import { useUser } from './UserContext';


type PointContextType = {
    points: number;
    setPoints: (value: number) => void;
    addPoints: (amount: number) => void;
    submit: () => Promise<void>
};

const PointContext = createContext<PointContextType | undefined>(undefined);

export const PointSender: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { username } = useUser();
    const [points, setPoints] = useState(0);


    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    const submit = async () => {
        const baseUrl = process.env.REACT_APP_SERVER;
        try {
            console.log('trying')
            await fetchData(`${baseUrl}/leaderboards`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username, points })
            })
            console.log('success')
        } catch (error) {
            console.log('failed to send points to mongo', error)
        }
    }

    return (
        <PointContext.Provider value={{ points, setPoints, addPoints, submit }}>
            {children}
        </PointContext.Provider>
    );

}
export const usePoints = () => {
    const context = useContext(PointContext);
    if (!context) throw new Error('usePoints must be used inside PointProvider');
    return context;
};