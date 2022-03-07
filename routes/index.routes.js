const {
    Router
} = require('express');
const router = Router();

router.get('/',(req, res) => {
    const user = req.user;
    res.render("index", {user});
});




module.exports = router;