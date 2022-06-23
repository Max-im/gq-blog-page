const { getUserId } = require("../utils/auth")

module.exports = {
    email(parent, args, { db, request }) {
        try {
            const userId = getUserId(request, false);
            
            if (userId && String(userId) === String(parent.id)) {
                return parent.email;
            }
            return '';
        } catch(err) {console.log(err.message)}
    }
}