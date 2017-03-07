import os
import json
import math
from flask import Flask, flash, redirect, render_template, \
	 request, url_for, g, send_file

from models.DB import db
from models.Client import Client
from models.Diet import Diet
from Utils import Utils

app = Flask(__name__)
app.config.from_object('config')
db.init_app(app)
Utils.setApplication(app)

#Homepage - currently clients page
@app.route('/')
def index():
	db.create_all()
	return render_template('index.html', clients = Client.query.all())

#Doctor login page
@app.route('/login')
def login():
	return render_template('login.html')
	
#Clients listings page
@app.route('/clients/')
def clients():
	db.create_all()
	search = request.args.get('search') or ''
	page = request.args.get('page') or 1
	page = int(page) or 1
	offset = (page - 1) * 5		
	pages = Client.query.filter(Client.name.like('%' + search + '%')).count()
	pages = int(math.ceil(pages / float(5)))

	return render_template('clients.html', clients = Client.query.filter(Client.name.like('%' + search + '%')).offset(offset).limit(5), search = search, pages = pages, page = page)

#Creating new client
@app.route('/client/new', methods = ['GET', 'POST'])
def client_new():
	if request.method == 'POST':
		db.create_all()
		data = request.form.to_dict()
		
		data['slug'] = Utils.slugify(data['name'])
		exist = Client.query.filter_by(name=data['name']).first() or Client.query.filter_by(slug=data['slug']).first() or Client.query.filter_by(email=data['email']).first()
		
		if(exist):
			flash('This user already exists!', 'danger')
			return render_template('client_new.html')
		else:
			data = Utils.simplifyClient(data)
			if(request.files and request.files['image']):
				data['profile'] = Utils.uploadImage('profiles', newname=data['slug'])			

			client = Client(data)
			db.session.add(client)
			db.session.commit()
			
			flash('New client profile was created successfully.', 'success')
			return redirect(url_for('clients'))

	diets = Diet.query.with_entities(Diet.id, Diet.name).all()
	return render_template('client_new.html', diets = diets)

#Individual client page
@app.route('/client/<slug>', methods = ['GET', 'POST'])
def client(slug):
	db.create_all()
	if request.method == 'POST':
		db.create_all()
		data = request.form.to_dict()
		client = Client.query.filter_by(id = data['id']).first()
		
		data['slug'] = Utils.slugify(data['name'])
		exist = False
		if client.name != data['name']:
			exist = Client.query.filter_by(name=data['name']).first() or False
		if exist is False and client.slug != data['slug']:
			exist = Client.query.filter_by(slug=data['slug']).first() or False
		if exist is False and client.email != data['email']:
			exist = Client.query.filter_by(email=data['email']).first() or False

		if(exist):
			flash('Client name and email must be unique.', 'danger')
			return render_template('client.html', client = client)

		data = Utils.simplifyClient(data)
		if(request.files and request.files['image']):
			data['profile'] = Utils.uploadImage('profiles', newname=data['slug'])		

		client.set(data)

		db.session.commit()
		flash('Client profile was updated successfully.', 'success')
		return render_template('client.html', client = client)

	return render_template('client.html', client = Client.query.filter_by(slug=slug).first_or_404())

#Diets listing page
@app.route('/diets/')
def diets():
	db.create_all()
	search = request.args.get('search') or ''
	page = request.args.get('page') or 1
	page = int(page) or 1
	offset = (page - 1) * 5		
	pages = Diet.query.filter(Diet.name.like('%' + search + '%')).count()
	pages = int(math.ceil(pages / float(5)))

	return render_template('diets.html', diets = Diet.query.filter(Diet.name.like('%' + search + '%')).offset(offset).limit(5), search = search, pages = pages, page = page)

#Creating new diet
@app.route('/diet/new', methods = ['GET', 'POST'])
def diet_new():
	if request.method == 'POST':
		db.create_all()

		data = Utils.simplifyDiet(request.form)
		data['slug'] = Utils.slugify(data['name'])

		exist = Diet.query.filter_by(name=data['name']).first() or Diet.query.filter_by(slug=data['slug']).first()
		
		if(exist):
			flash('This diet already exists!', 'danger')
			return render_template('diet_new.html')
		else:
			if(request.files and request.files['image']):
				data['photo'] = Utils.uploadImage('diets', newname=data['slug'])			

			diet = Diet(data)
			db.session.add(diet)
			db.session.commit()

			flash('New diet was created successfully.' 'success')
			return redirect(url_for('diets'))
		
	return render_template('diet_new.html')

#Individual diet page
@app.route('/diet/<slug>', methods = ['GET', 'POST'])
def diet(slug):
	db.create_all()
	if request.method == 'POST':
		db.create_all()
		data = Utils.simplifyDiet(request.form)
		diet = Diet.query.filter_by(id = data['id']).first()
		data['slug'] = Utils.slugify(data['name'])

		exist = False
		if diet.name != data['name']:
			exist = Diet.query.filter_by(name=data['name']).first() or False
		if exist is False and diet.slug != data['slug']:
			exist = Diet.query.filter_by(slug=data['slug']).first() or False

		if(exist):
			flash('Diet name must be unique.', 'danger')
			return render_template('diet.html', diet = diet)
		
		if(request.files and request.files['image']):
			data['photo'] = Utils.uploadImage('diets', newname=data['slug'])		

		diet.set(data)
		db.session.commit()
		diet.restrict = json.loads(diet.restrict)
		diet.carbohydrates = json.loads(diet.carbohydrates)
		diet.protein = json.loads(diet.protein)
		diet.fats = json.loads(diet.fats)
		flash('Diet was updated successfully.', 'success')
		return render_template('diet.html', diet = diet)

	diet = Diet.query.filter_by(slug=slug).first_or_404()

	diet.restrict = json.loads(diet.restrict)
	diet.carbohydrates = json.loads(diet.carbohydrates)
	diet.protein = json.loads(diet.protein)
	diet.fats = json.loads(diet.fats)

	return render_template('diet.html', diet = diet)

#Function for external files
@app.route('/upload/<path:filename>')
def uploaded_file(filename):
	uploadpath = app.config['UPLOAD_FOLDER']
	filepath = os.path.join(uploadpath, filename)
	return send_file(filepath)

#meal plan page
@app.route('/mealplan')
def mealplan():
    return render_template('mealplan.html')

#meal plan page
@app.route('/mealplan/preview')
def mealplan_preview():
    return render_template('mealplan_preview.html')

#error handlers
@app.errorhandler(403)
def errorhandler_403(e):
	return render_template('403.html'), 403

@app.errorhandler(404)
def errorhandler_404(e):
	return render_template('404.html'), 404

@app.errorhandler(500)
def errorhandler_500(e):
	return render_template('500.html'), 500

#Run the application
if __name__ == '__main__':
	app.run(debug = True)
