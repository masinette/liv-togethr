const express = require('express');
const router = express.Router();
const {
    getPostsByUsers
} = require('../helpers/dataHelpers');

module.exports = ({
    getUsers,
    getUserByEmail,
    checkUserLogin,
    addUser
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // router.get('/posts', (req, res) => {
    //     getUsersPosts()
    //         .then((usersPosts) => {
    //             const formattedPosts = getPostsByUsers(usersPosts);
    //             res.json(formattedPosts);
    //         })
    //         .catch((err) => res.json({
    //             error: err.message
    //         }));
    // });

    router.post('/', (req, res) => {
        const {
            first_name,
            last_name,
            is_owner,
            email,
            password
        } = req.body;
        //checks if the email already exists before creating the user
        getUserByEmail(email)
            .then(user => {

                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(first_name, last_name, is_owner, email, password)
                }

            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })

    router.post('/login', (req, res) => {
        const {
            email,
            password
        } = req.body;
        //checks if the email already exists before creating the user
        checkUserLogin(email, password)
            .then(user => {
                console.log("INSIDE login",user)
                if (user) {
                    res.json(user);
                } else {
                    res.json({
                        msg: 'Sorry, wrong password'
                    });
                }

            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};