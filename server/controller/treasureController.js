module.exports = {
    dragonTreasure: async (req,res) => {
        const dbInstance = req.app.get('db')

        const treasure = await dbInstance.get_dragon_treasure([1])

        return res.status(200).send(treasure)
    },

    getMyTreasure: async (req,res) => {
        const dbInstance = req.app.get('db')
        const {id} = req.session.user

        const myTreasure = await dbInstance.get_my_treasure([id])
        return res.send(myTreasure)
    },

    getAllTreasure: async (req,res) => {
        const dbInstance = req.app.get('db')

        const allTreasure = await dbInstance.get_all_treasure()
        return res.status(200).send(allTreasure)
    },
    addMyTreasure: async (req, res) => {
        const { id } = req.session.user;
        const { treasureURL } = req.body;
        const myTreasure = await req.app.get('db').add_user_treasure([treasureURL, id]);
        return res.status(201).send(myTreasure);
      }
}