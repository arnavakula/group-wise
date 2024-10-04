//replace try catch block for routes -- purely for simplification
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}