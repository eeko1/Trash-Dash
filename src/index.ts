import express, {Request, Response} from 'express';
import axios from 'axios';
import { wastetypes, wastpage, searchResult, recyclingmethod } from './types/apiTypes';

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
        const response = await axios.get<wastetypes[]>(`${API_BASE_URL}/waste-types`, {headers});
        res.json(response.data)
        console.log(JSON.stringify(response.data, null, 2))
    } catch (error) {
        console.error('Error fetching waste types:', error);
        throw error;
    }
});

router.get('/recyclingmethods', async (req: Request, res: Response) => {
    try {
        const response = await axios.get<recyclingmethod[]>(`${API_BASE_URL}/recycling-methods`, {headers});
        res.json(response.data)
        console.log(response.data)
    } catch (error) {   
        console.error('Error fetching recycling methods:', error);
        throw error;
    }
});

router.get('/wastepages', async (req: Request, res: Response) => {
    try {
        const response = await axios.get<wastpage[]>(`${API_BASE_URL}/waste-pages`, {headers});
        res.json(response.data)
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching waste pages:', error);
        throw error;
    }
});

router.get('/search', async (req: Request, res: Response) => {
    try {
        const response = await axios.get<searchResult[]>(`${API_BASE_URL}/search`, {headers});
        res.json(response.data)
        console.log(JSON.stringify(response.data, null, 2))
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
});

router.get('/wastepages/:id', async (req: Request, res: Response) => {
    try {
        const response = await axios.get<searchResult[]>(`${API_BASE_URL}/waste-pages/${req.params.id}`, {headers});
        res.json(response.data)
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}); 


export default router;