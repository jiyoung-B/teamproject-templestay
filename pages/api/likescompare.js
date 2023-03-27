// import Likeslist from "../../module/Likeslist";
//
// export default async (req, res) => {
//     let email = req.query.email;
//
//     try {
//         const comparelist = new Likeslist().selectCompare(email).then((cp) => cp);
//
//         console.log('plz : ', comparelist);
//
//         res.status(200).json(await comparelist);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// }