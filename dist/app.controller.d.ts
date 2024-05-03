import { HomeService } from './app.service';
import { Request, Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: HomeService);
    Home(req: Request, body: any, param: {
        id: string;
    }, res: Response): any;
}
