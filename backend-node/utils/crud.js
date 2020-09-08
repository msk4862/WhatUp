const getMany = model => async (req, res) => {
    model.find({})
        .then((posts) => {
            res.status(200).send(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({"error":"Something went wrong!"});
        });
}
const getOne = model => async (req, res) => {

}
const createOne = model => async (req, res) => {

}
const updateOne = model => async (req, res) => {

}
const removeOne = model => async (req, res) => {

}

const crudControllers = model => ({
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model),
});

module.exports = crudControllers;