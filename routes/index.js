var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var todos = require('../models/db');

let csrfProtection = csrf({ cookie: true })

router.get('/', csrfProtection, function(req, res, next) {
	todos.find()
	.then((data) => {
	  res.render('index', { 
		  title: 'ToDoApp',
		  todos: data,
		  csrfToken: req.csrfToken()
	  })
	})
	.catch((err) => {
		res.send(err)
	})
});
router.post('/add', csrfProtection, (req, res) => {
	let newPost = new todos()
	newPost.task = req.body.task
	newPost.in_date = new Date()
	newPost.save((err) => {
		if (err) return res.send(err)
		res.redirect('/')
	})
})
router.get('/edit/:id', csrfProtection, (req, res) => {
	todos.find({_id:req.params.id})
		.then((task) => {
			res.render('edit',{
				title: "Edit Task",
				task: task,
				csrfToken: req.csrfToken()
			})
		})
})
router.put('/update/:id', csrfProtection, (req, res) => {
	let newtask = {};
	newtask.task = req.body.task;
	newtask.in_date = new Date();
	let query = {_id:req.params.id}
	todos.update(query, newtask)
		.then((todo) => {
			res.send(todo)
		})
})
router.delete('/destroy/:id', (req, res) => {
	todos.remove({_id:req.params.id})
	.then((res) => res.send(res))
	.catch((err) => res.send(err))
})
module.exports = router;
