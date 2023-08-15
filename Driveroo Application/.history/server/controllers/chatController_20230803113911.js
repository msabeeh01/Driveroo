const {Chat} = require('../models/ModelOne');

const getRecentMessages = async (req,res) => {
    try {
        const getRecentMessages = await Chat.find()
        .sort({sendTime: -1})
        .limit(10); // Change the limit as per your requirement

        res.send(recentMessages);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    getRecentMessages
};