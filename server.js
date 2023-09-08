const express = require('express');
const app = express();
const path = require('path');
const { ObjectId } = require('mongodb');
/* import crypto from "crypto"; */
/* import util from "util"; */
const helmet = require('helmet')
//asddf
//login
/* const dotenv = require('dotenv') */
require("dotenv").config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(helmet())

app.use(express.json());
var cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
var db;

app.use(express.static(path.join(__dirname, 'react/build')));

app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use('/static', express.static('static'));
app.use('/public', express.static('public'))

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:8080;"
  );
  next();
});

app.use(session({
  secret: process.env.KEY, // 세션을 암호화할 때 사용할 비밀 키
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

MongoClient.connect(process.env.DB_URL,{ useUnifiedTopology: true } , function(err,client) {
    if(err) return console.log(err);

    db = client.db('toyproject');

    app.listen(8080, function() {
        console.log('listening on 8080')
    })
        
})

//암호화
/* const createHashedPassword = (password) => {
  return crypto.createHash("sha512").update(password).digest("base64");
};
 */
/* const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);
const createSalt = async () => {
  const buf = await randomBytesPromise(64);

  return buf.toString("base64");
};

export const createHashedPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
  const hashedPassword = key.toString("base64");

  return { hashedPassword, salt };
};

export const verifyPassword = async (password, userSalt, userPassword) => {
  const key = await pbkdf2Promise(password, userSalt, 99999, 64, "sha512");
  const hashedPassword = key.toString("base64");

  if (hashedPassword === userPassword) return true;
  return false;
}; */

console.log(typeof process.env.DB_URL)

//Login
app.post('/loginServer', passport.authenticate('local', {failureRedirect: '/loginserver'}), (req,res) => {
  console.log(req.user);
  res.status(200).json(req.user);
})

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pwd',
  session: true,
  passReqToCallback: false,
}, function (InputId, InputPw, done) {
  // console.log(InputId, InputPw);
  db.collection('info').findOne({id: InputId}, (err,result) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    if (!result) {
      console.log("id X")
      return done(null, false, { message: '존재하지 않는 아이디입니다' });
    }
    if (InputPw === result.pwd) {
      console.log('로그인 성공, 아이디:', InputId); // 성공 시 아이디 출력
      return done(null, result);
    } else {
      console.log("pwd X")
      return done(null, false, { message: '비번틀림' });
    }

  })
}))
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  db.collection('info').findOne({id: id}, (err,result) => {
    done(null, result);
  })
});

function Logined(req,res,next) {
  if(req.user) {
    next()
  } else {
    res.send('not logined')
    res.redirect('/')
  }
}

app.post('/info', (req,res) => {
  console.log(req.body)
  db.collection('info').insertOne( {id: req.body.id, pwd: req.body.pwd} , (err, result) => {
    /* console.log('success99')  */
    res.send("success")
  })
  
})

app.post('/data2', (req,res) => {
  console.log(req.body)
  db.collection('todolist').insertOne( {
    title : req.body.title, 
    content:req.body.content, 
    date: req.body.date,
    complete: false,
    writer: req.body.writer
  }, (err, result) => {

    res.send("success")
  })
  
})


//
app.get('/data2', (req,res) => {
  db.collection('todolist').find().toArray((err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result); 
    }
    });
})

app.post("/modify/:id", (req, res) => {
  console.log('서버까진 왔네요')
  db.collection("todolist").updateOne({ _id: ObjectId(req.params.id), writer: req.body.user },
    {
      $set: {
        complete:true
      }
    },
    
    (err, result) => {
      
      if(err) {
        console.log('ㅋㅋ')
      }
      else{
        console.log('성공인가?')
        res.send('OHOHOHOH')
      }
    }
  );
});



 app.delete("/delete/:id", (req, res) => {
  db.collection("todolist").deleteOne({ _id: ObjectId(req.params.id), writer: req.body.user },(err, result) => {
    if(err) {
      console.log(err);
    
    }

    if(result.deletedCount == 0) {
      res.status(500).send('FAil')
      console.log('it is not your post')
    }
    else {
      res.send('delete success');
    }
    }

  );
});



//Logout
app.get('/logout', (req, res, next) => {
  req.logOut(err => {
    if (err) {
      return next(err);
    } else {
      console.log('logout')
      res.send('logout success')
    }
  });
});





/* app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname, '/react/build/index.html'))
}) */

app.get('/home', Logined, function (req, res) {
  res.sendFile(path.join(__dirname, '/react/build/index.html'));
});

/* app.get('*', Logined, function (req, res) {
  res.sendFile(path.join(__dirname, '/react/build/index.html'));
}); */

  
