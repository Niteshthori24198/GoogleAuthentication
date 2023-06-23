
const express = require('express')

const {passport} = require('./config/gauth')

const { connection } = require('./DB/db')

const jwt = require('jsonwebtoken')

require('dotenv').config()


const app = express()

app.use(express.json())



// Google Authentication code

const googleAuthentication = async (req, res) => {

    // Successful authentication, redirect to home page.

    console.log(req.user)

    const user = req.user

    let token = jwt.sign({ UserID: user._id}, process.env.SecretKey, { expiresIn: "24h" })

    // front end url : - Netlify

    const frontendURL = "http://127.0.0.1:5500/GoogleAuth/google.html"

    res.send(`
                <a href="${frontendURL}?token=${token}&Name=${user.Name}" id="myid" style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #222222; margin: 0; padding: 0; overflow: scroll;">
                    <img style="width:100%;" src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif">
                </a>
                <script>
                    let a = document.getElementById('myid')
                    setTimeout(()=>{
                        a.click()
                    },3000)
                    console.log(a)
                </script>
        `)

}





app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session:false }), googleAuthentication )





app.listen(3000,async ()=>{
    try {

        await connection
        
        console.log('connected')
    } catch (error) {
        console.log(error)
    }
})