import Member from "../../../models/Member";

export default async (req, res) => {
    const [email, passwd] = [req.query.email, req.query.passwd];


    try {
        const member = new Member().login(email)
            .then(result => result);

        console.log('api member', await member)

        const result = (await member)[0];
        console.log('api login result: ', result);
        const data = { name: await result.name, email: await result.email,
            passwd: await result.passwd }
        console.log('api login : ', data);
        console.log('api pwd : ', await result.passwd);


        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

