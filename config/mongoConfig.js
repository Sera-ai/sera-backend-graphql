const mongoString = process.env.DB_HOST;

module.exports = {
    uri: `${mongoString}/Sera-GraphQL`,
};