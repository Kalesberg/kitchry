import os
import re
import json
from werkzeug.utils import secure_filename
from flask import request
#Utility Class

class Utils:
	@staticmethod
	def setApplication(app):
		'''Inits current application context'''
		Utils.app = app
	@staticmethod
	def slugify(s):
		'''Convert from string to url slugs'''
		s = s.lower()

		for c in [' ', '-', '.', '/']:
			s = s.replace(c, '_')
		s = re.sub('\W', '', s)
		s = s.replace('_', ' ')
		s = re.sub('\s+', ' ', s)
		s = s.strip()
		s = s.replace(' ', '-')

		return s

	@staticmethod
	def extension(filename):
		'''Get file extension'''
		return filename.rsplit('.', 1)[1].lower()

	@staticmethod
	def simplifyClient(data):
		'''Remove any values that are unset from form data in Client form'''
		fields = ['name','email','age','height','height_unit','weight','weight_unit','bmi','bodyfat','bodyfat_unit','goal','goal_unit',
			'startdate','enddate','outcome','outcome_unit','restrict','diet','score','lastlogin']
		
		for field in fields:
			if(field not in data or data[field] == ''):
				if(field is 'lastlogin'):
					data[field] = None
				elif(field in ['age','height','weight','bmi','bodyfat','diet','score']):
					data[field] = 0
				else:
					data[field] = ''
			
		return data
	
	@staticmethod
	def simplifyDiet(form):
		'''Set correct form data in Diet Form'''
		dictionary = form.to_dict()
		data = {}
		if('id' in dictionary):
			data['id'] = dictionary['id']
		fields = ['name', 'dietician', 'intake', 'breakfast', 'morningsnack', 'lunch', 'eveningsnack', 'dinner']
		for field in fields:
			data[field] = dictionary[field]
		data['restrict'] = json.dumps(form.getlist('restrict'))
		data['carbohydrates'] = json.dumps(form.getlist('carbohydrates'))
		data['protein'] = json.dumps(form.getlist('protein'))
		data['fats'] = json.dumps(form.getlist('fats'))

		return data

	@staticmethod
	def uploadImage(subfolder, newname):
		'''Upload image from form submit'''
		file = request.files['image']
		fullname = secure_filename(newname + '.' + Utils.extension(file.filename))
		uploadpath = os.path.join(Utils.app.config['UPLOAD_FOLDER'], subfolder, fullname)
		file.save(uploadpath)

		return os.path.join('/upload', subfolder, fullname)
