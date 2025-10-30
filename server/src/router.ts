import express, {Request, Response} from 'express';
import axios from 'axios';
import { wastetypes, wastpage, searchResult, recyclingmethod } from './types/apiTypes';
import { LeaderboardModel } from './models/Leaderboard';


import dotenv from 'dotenv';
dotenv.config(); 

const router = express.Router();
const API_BASE_URL = process.env.url;
const headers = {
    'client_id': process.env.client_id,
    'client_secret': process.env.client_secret
}


router.get('/wastetypes', async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang;
        const response = await axios.get<wastetypes[]>(`${API_BASE_URL}/waste-types?lang=${lang}`, {headers});
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching waste types:', error);
        throw error;
    }
});

router.get('/wastetypes/:types', async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang;
        const types = req.query.types;
        const response = await axios.get<wastpage>(`${API_BASE_URL}/waste-types?search=${types}&lang=${lang}`, {headers});
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}); 


router.get('/recyclingmethods', async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang;
        const response = await axios.get<recyclingmethod[]>(`${API_BASE_URL}/recycling-methods?lang=${lang}`, {headers});
        res.json(response.data)
    } catch (error) {   
        console.error('Error fetching recycling methods:', error);
        throw error;
    }
});


router.get('/recyclingmethods/:method', async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang;
        const method = req.query.method
        const response = await axios.get<recyclingmethod[]>(`${API_BASE_URL}/recycling-methods?search=${method}&lang=${lang}`, {headers});
        res.json(response.data)
    } catch (error) {   
        console.error('Error fetching recycling methods:', error);
        throw error;
    }
});


router.get('/wastepages', async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang;
        const page = req.query.page || 1;
        const response = await axios.get<wastpage[]>(`${API_BASE_URL}/waste-pages?lang=${lang}&page=${page}`, { headers });
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching waste pages:', error);
        throw error;
    }
});

router.get('/search/:q/:wastetype/:recyclingMethod', async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang;
        const q = req.query.q;
        const recyclingMethod = req.query.recyclingMethod
        const wastetype = req.query.wastetype
        const response = await axios.get<searchResult[]>(`${API_BASE_URL}/search?q=${q}&lang=${lang}&wasteType%5B%5D=${wastetype}&recyclingMethod%5B%5D=${recyclingMethod}&includeSynonyms=true `, {headers});
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
});

router.get('/wastepages/:id', async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang;
        const response = await axios.get<wastpage>(`${API_BASE_URL}/waste-pages/${req.params.id}?lang=${lang}`, {headers});
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}); 

router.get('/leaderboards', async (eq: Request, res: Response) => {
    try {
        const data = await LeaderboardModel.find().sort({ points: -1 });
        const leaderboards = data.map((item, idx) => ({
            ranking: idx + 1,
            name: item.username,
            points: item.points,
        }));
        res.json(leaderboards);
    } catch (error) {
        console.error('Error fetching leaderboards:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboards' });
    }
});



export default router;