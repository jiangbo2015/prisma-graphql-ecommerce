import { AuthChecker } from 'type-graphql'

import { Context } from './context'

// create auth checker function
const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
    if (!roles) {
        // if `@Authorized()`, check only if user exists
        return user !== undefined
    }

    // there are some roles defined now

    // and if no user, restrict access
    if (!user) {
        return false
    }

    // if role is ADMIN or roles includes role
    if (user.role === 'ADMIN' || roles.includes(user.role as string)) {
        return true
    }

    // no roles matched, restrict access
    return false
}

export default authChecker
