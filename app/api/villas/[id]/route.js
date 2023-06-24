


export const GET = async (request) => {
    return {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            message: 'Hello world!'
        }
    };
}

export const POST = async (request) => {
    return {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            message: 'Hello world!'
        }
    };
}
