import BlackListUserName from '../utils/blacklist.username';
import TextUtils from '../utils/text.utils';

const usernameRegex = /^(?![.-])[a-zA-Z0-9!@#$%^&*]{4,25}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

function usernameValidate(username) {
    if (TextUtils.isEmpty(username)) {
        return false;
    }
    if (BlackListUserName.validate(username)) {
        return false;
    }
    return usernameRegex.test(username);
}

function passwordValidate(password) {
    if (TextUtils.isEmpty(password)) {
        return false;
    }
    return passwordRegex.test(password);
}

function roleValidate(role){
    if(TextUtils.isEmpty(role)){
        return false;
    }

    if(role !== 'admin' && role !== 'user'){
        return false;
    }

    return true;
}

export default { usernameValidate, passwordValidate, roleValidate };