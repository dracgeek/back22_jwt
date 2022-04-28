const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.json({
        message: 'Welcome to the API JWT'
    })
});


app.post('/api/login', (req,res)=>{
     
    const { username, email, password } = req.body;

    const user = {
        username,
        email,
        password
    };
     
     //sql Where email = 'email' and  password = 'password'

     

    const token = jwt.sign({ user},'backend',
     { expiresIn: '1h'}, {algorithm: 'RS256'}
     );
    res.json({token});
});

app.get('/api/private', verificarToken, (req,res)=>{
    
    jwt.verify(req.token, 'backend', (err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Welcome to the API JWT',
                authData
            });
        }
    });
   
});


function verificarToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
       const bearer = bearerHeader.split(' ');
       const bearerToken = bearer[1];
       req.token = bearerToken;
       next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
  console.log('Listening on port 3000');
});