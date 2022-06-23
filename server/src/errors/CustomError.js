import { GraphQLYogaError } from '@graphql-yoga/node'

class CustomError {
    constructor(message) {
        return new GraphQLYogaError(message || 'Something went wrong');
    }

    static authError() {
        return new CustomError('Authentication falled');
    }
}

export default CustomError;