module.exports = {
    client: {
        service: {
            name: 'ac3-todos-backend',
            url: 'http://localhost:4000',
            // process.env.NODE_ENV === 'development'
            //     ? 'http://localhost:4000'
            //     : 'https://pgfe-server.herokuapp.com',
        },
        includes: ['./src/gql/**.ts'],
    },
}
