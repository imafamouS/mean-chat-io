import JWT from 'jsonwebtoken';

import BaseController from './base.controller';
import UserModel from '../models/user.model';
import HelperResponse from '../helpers/helper.response';
import HttpStatus from '../utils/http.status';
import Config from '../config/config';

class UserController extends BaseController {
    constructor() {
        super(UserModel);

        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.count = this.count.bind(this);

        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    create(req, res) {
        let obj = new UserModel(req.body);
        obj.save()
            .then(data => { res.json(HelperResponse.makeJsonResponseSuccess('Created successful', data)); })
            .catch(err => { res.json(HelperResponse.makeJsonResponseFailure(err)); });
    }

    login(req, res) {
        let query = { username: req.body.username };
        UserModel.findOne(query, (err, user) => {
            if (err) {
                res.json(HelperResponse.makeJsonResponseFailure(err));
            }
            if (!user) {
                let err = new Error('Username does not exist');
                res.json(HelperResponse.makeJsonResponseFailure(err));
            } else {
                user.comparePassword(req.body.password, function(error, isMatch) {
                    if (!isMatch) {
                        res.json(HelperResponse.makeJsonResponseSuccess('Wrong password', null));
                    } else {
                        let token = JWT.sign({ user: user }, Config.secret_token);
                        res.json(HelperResponse.makeJsonResponseSuccess(HttpStatus[200], { token: token }));
                    }
                });
            }
        });
    }
}

export default UserController;
