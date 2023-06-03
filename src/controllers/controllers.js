
exports.home = function (req, res) {
 res.status(200).json({msg: "Home Page"})
}

exports.about = function (req, res) {
 res.status(200).json({msg: "About Page"})
}