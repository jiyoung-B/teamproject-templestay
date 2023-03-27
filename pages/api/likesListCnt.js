// import Likeslist from "/module/Likeslist";
//
// export default async (req, res) => {
//     let LK_NO = req.query.LK_NO;
//
//     try {
//         const rowData = new Likeslist().selectCount(LK_NO).then((aa) => aa);
//         res.status(200).json(await rowData);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// }