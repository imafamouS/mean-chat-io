import Helper from '../helpers/helper.response';
import VerifyRequest from '../helpers/verify.request';

class BaseController {

    constructor(model) {
        this.model = model;
    }

    getAll(req, res) {
        this.model.find({})
            .then(data => { res.json(Helper.makeJsonResponseSuccess(null, data)); })
            .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
    }

    getById(req, res) {
        let query = { _id: req.params.id };
        this.model.findOne(query)
            .then(data => { res.json(Helper.makeJsonResponseSuccess(null, data)); })
            .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
    }

    count(req, res) {
        this.model.count()
            .then(count => { res.json(Helper.makeJsonResponseSuccess(null, count)); })
            .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
    }

    create(req, res) {
        VerifyRequest.verify(req)
            .then(user => {
                let obj = new this.model(req.body);
                obj.save()
                    .then(data => { res.json(Helper.makeJsonResponseSuccess('Created successful', data)); })
                    .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
            })
            .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
    }

    update(req, res) {
        VerifyRequest.verify(req)
            .then(user => {
                let query = { _id: req.params.id };
                this.model.findOneAndUpdate(query, req.body, { 'upsert': true, runValidators: true }).exec()
                    .then(data => { res.json(Helper.makeJsonResponseSuccess('Updated successful', data)); })
                    .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
            })
            .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
    }

    delete(req, res) {
        VerifyRequest.verify(req)
            .then(user => {
                let query = { _id: req.params.id };
                this.model.findOneAndRemove(query)
                    .then(data => { res.json(Helper.makeJsonResponseSuccess('Deleted successful', data)); })
                    .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
            })
            .catch(err => { res.json(Helper.makeJsonResponseFailure(err)); });
    }
}

export default BaseController;
