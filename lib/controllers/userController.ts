import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');

export class UserController {

    private user_service: UserService = new UserService();

    public create_user(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.email && req.body.password) {
            const user_params: IUser = {
                email: req.body.email,
                password: req.body.password,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New user created'
                }]
            };
            this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('user created successfully', user_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('received user successfully', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_user(req: Request, res: Response) {
        if (req.params.id &&
            req.body.email ||
            req.body.password) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    user_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'User updated'
                    });
                    const user_params: IUser = {
                        _id: req.params.id,
                        email: req.body.email ? req.body.email : user_data.email,
                        password: req.body.password ? req.body.password : user_data.password,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
                        modification_notes: user_data.modification_notes
                    };
                    this.user_service.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('user was updated successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('user was deleted successfully', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}