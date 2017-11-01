var formidable = require('formidable');
var db = require('../models/db.js');
var md5 = require('../models/md5.js');
var session = require('express-session');
var path = require('path');
var fs = require('fs');



// 首页
exports.showIndex = function(req,res,next) {
    console.log('showIndex -- working --');
    console.log('******************** --');
    if(req.session.login == '1') {
        db.find('user',{'nickname' : req.session.nickname}, function (err,result) {
            var avatar = result[0].avatar || 'defaultHead.jpg';
            console.log(result[0]);
            res.render('index',{
                'login' : req.session.login == '1' ? true :false,
                'nickname' : req.session.login == '1' ? req.session.nickname : '',
                'active' : 'mainpage',
                'avatar' : avatar
            });
        });
    }else {
        res.render('index',{
            'login' : req.session.login == '1' ? true :false,
            'nickname' : req.session.login == '1' ? req.session.nickname : '',
            'active' : 'mainpage',
            'avatar' : 'defaultHead.jpg'
        });

    }
};
// //注册页面
// exports.showRegister = function(req,res,next) {
//     res.render('register',{
//         'login' : req.session.login == '1' ? true :false,
//         'nickname' : req.session.login == '1' ? req.session.nickname : '',
//         'active' : 'register'

//     });
// };
// //注册业务
// exports.doRegister = function(req,res,next) {
//     /*
//     * 获取用户输入的信息
//     * 是否存在相同用户名
//     * 保存这个人
//     */
//     var form = new formidable.IncomingForm();
//     form.parse(req,function(err,fields,files) {
//         var email = fields.email;
//         var nickname = fields.nickname;
//         var password = fields.password;
//         //加密密码
//         password = md5(md5(password)+'sv2017');
//         console.log(email);
//         db.find('user',{'nickname' : nickname},function(err,result){
//             console.log(result);
//             if(err) {
//                 //服务器错误
//                 res.send('-3');
//                 return;
//             }
//             if(result.length != 0) {
//                 //用户名被占用
//                 res.send('-1');
//                 return;
//             }
//             db.insertOne('user',{
//                 'nickname' : nickname,
//                 'password' :password,
//                 'email' : email,
//                 'avatar' : 'defaultHead.jpg'

//             }, function (err,result) {
//                 if(err) {
//                     res.send('-3');
//                     return;
//                 }
//                 req.session.login = '1';
//                 req.session.nickname = nickname;
//                 req.session.avatar = 'defaultHead.jpg';
//                 res.send('1');
//             });
//         })
//     })
// };
// exports.showLogin = function (req,res,next) {
//   res.render('login',{
//       'login' : req.session.login == '1' ? true :false,
//       'nickname' : req.session.login == '1' ? req.session.nickname : '',
//       'active' : 'login'
//   });
// };
// //登录
// exports.doLogin = function (req,res,next) {
//   var form = new formidable.IncomingForm();
//     form.parse(req, function (err,fields,files) {
//         var nickname = fields.nickname;
//         var password = fields.password;
//         password = md5(md5(password)+'sv2017');
//         db.find('user',{'nickname' : nickname}, function (err,result) {
//             if(err) {res.send('-3'); return;}
//             if(result.length === 0) {
//                 res.send('0');
//                 return;
//             }
//             if(result[0].password === password){
//                 req.session.login = '1';
//                 req.session.nickname = nickname;
//                 req.session.avatar = result[0].avatar;
//                 res.send('1');
//                 return;
//             }else {
//                 res.send('-1');
//             }

//         })
//     });
// };
// //设置头像
// exports.showSetAvatar = function(req,res,next) {
//     /*if(req.session.login !== '1') {
//         res.end('Illegal');
//         return;
//     }*/
//     res.render('setAvatar',{
//         'login' : true,
//         'nickname' : req.session.nickname,
//         'active' : '修改头像'
//     })
// };
// exports.doSetAvatar = function (req,res,next) {
//     var form = new formidable.IncomingForm();
//     form.uploadDir =path.normalize( __dirname + '/../avatar');
//     console.log( form.uploadDir);
//     form.parse(req, function (err,fields,files) {
//         console.log(files);
//         var oldPath = files.userAvatar.path;
//         var newPath = path.normalize(__dirname+'/../avatar/')+req.session.nickname + '.jpg';
//         console.log(oldPath);
//         console.log(newPath);
//         fs.rename(oldPath,newPath, function (err) {
//             if(err) {
//                 console.log('upload avatar failed');
//                 return;
//             }
//             console.log('OK');
//         });
//     });
// };
// exports.showCutPic = function (req,res,next) {

// };