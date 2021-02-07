import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { arePushEventsInLast24Hours, Status } from '../services/github-users';

export const activeUsersController = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.user;

    if (!username) {
        return res.status(400).json({
            message: 'UserName parameter is empty'
        });
    }
    try {
        let currentPage = 1;
        let status = Status.LOAD_MORE;
        

        const pageLimit = process.env.GITHUB_PAGINATION_LIMIT||10;

        while (status === Status.LOAD_MORE && currentPage < pageLimit) {
            const resp = await axios.get(`${process.env.GITHUB_URL}/users/${username}/events/public?page=${currentPage}`);
            status = arePushEventsInLast24Hours(resp.data);
            currentPage++;
        }

        return res.status(200).json({
            active: status === Status.TRUE
        });
    } catch (err) {
        const errorMessage = `Failed to load events for user = ${username}`;
        return res.status(404).json({
            message: errorMessage
        });
    }
};
