import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';

export class UserController {

  private user_service: UserService = new UserService();

  public create_user(req: Request, res: Response) {
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
      insufficientParameters(res);
    }
  }

  public get_user(req: Request, res: Response) {
    res.send(req.user);
  }

  public update_user(req: Request, res: Response) {
    if (req.body.email ||
      req.body.password) {
          req.user.modification_notes.push({
            modified_on: new Date(Date.now()),
            modified_by: null,
            modification_note: 'User updated'
          });
          const user_params: IUser = {
            _id: req.user._id,
            email: req.body.email ? req.body.email :  req.user.email,
            password: req.body.password ? req.body.password :  req.user.password,
            is_deleted: req.body.is_deleted ? req.body.is_deleted :  req.user.is_deleted,
            modification_notes: req.user.modification_notes
          };
          this.user_service.updateUser(user_params, (err: any) => {
            if (err) {
              mongoError(err, res);
            } else {
              successResponse('user was updated successfully', null, res);
            }
          });
    } else {
      insufficientParameters(res);
    }
  }

  public async delete_user(req: Request, res: Response) {
    this.user_service.deleteUser(req.user._id, (err: any, delete_details) => {
         if (delete_details.deletedCount !== 0) {
            successResponse('user was deleted successfully', null, res);
        } else {
            failureResponse('invalid user', null, res);
        }
    });
  }
}
