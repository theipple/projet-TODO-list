var express = require('express');
var connect = require('connect');

var app = express();

app//.use(express.cookieParser())
.use(connect.cookieParser('todotopsecret'))
.use(express.session({secret: 'todotopsecret'}))
.use(express.bodyParser())

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];req.session.cookie.maxAge = 3600000 * 24 * 365;
    }
    next();
})

.get('/todo', function(req, res) {
	res.render('todo.ejs', {todolist: req.session.todolist});
})
.post('/todo/ajouter/', function(req, res) {
	if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
        console.log('ajout ' + req.body.newtodo);
    }
    res.redirect('/todo');
})
.get('/todo/:id', function(req, res){
	if (req.params.id != ''){
		res.render('todo_modify.ejs', {todo: req.session.todolist[req.params.id], id: req.params.id});
	}
})
.post('/todo/modify', function(req, res){
	if(req.body.newtodoname != '' && req.body.id != ''){
		console.log('modif ' + req.session.todolist[req.body.id] + ' en ' + req.body.newtodoname);
		req.session.todolist[req.body.id] = req.body.newtodoname;
	}
	res.redirect('/todo');
})
.get('/todo/supprimer/:id', function(req, res){
	if (req.params.id != '') {
		console.log('suppr ' + req.session.todolist[req.params.id]);
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})
.post('/todo/reset', function(req, res){
    req.session.todolist = [];
    console.log('suppression de toute la liste');
    res.redirect('/todo');
})
.use(function(req, res, next){
	res.redirect('/todo');
})

.listen(8080);
