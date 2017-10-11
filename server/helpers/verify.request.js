import JWT from 'jsonwebtoken';

import Config from '../config/config';


function verify(req){
	let token = req.headers.token;
	
	return verifyWithToken(token);
}

function verifyWithToken(token){
	return new Promise((resolve, reject)=>{
		JWT.verify(token,Config.secret_token,(err,data) => {
			if(err){
				return reject(err);
			}
			resolve(data);
		});
	});
}

export default {verifyWithToken, verify};