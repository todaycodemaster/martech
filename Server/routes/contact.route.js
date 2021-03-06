import express from 'express';
// import passport from 'passport';
// import validate from 'express-validation';
// import authCtrl from '../controllers/auth.controller';
// import authorization from '../services/authorization.service';
// import auth from '../services/Permissions/index';
import contactCtrl from '../controllers/contactsController';

const router = express.Router();

router.route('/addContact')
  // .post(validate(paramValidation.login), passport.authenticate('local', { session: false }), budgetCtrl.getM2dDataByMonth);
  .post(contactCtrl.addContact);

router.route('/getAll')
  .post(contactCtrl.getAll);
  
router.route('/delContact')
  .post(contactCtrl.delContact);
  
export default router;