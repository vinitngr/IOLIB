import { Request, Response } from 'express';

export const checkAuth = (req: Request, res: Response) => {
    res.send('checkAuth');
};


export const register = (req: Request, res: Response) => {
    res.send('register');
};


export const logout = (req: Request, res: Response) => {
    res.send('logout');
};

export const login = (req: Request, res: Response) => {
    res.send('login');
};

