from .DB import db

class Diet(db.Model):
    __tablename__ = 'diets'

    id               = db.Column(db.Integer, primary_key = True)
    name             = db.Column(db.String(50), unique = True)
    slug             = db.Column(db.String(50), unique = True)
    photo            = db.Column(db.String(100))
    dietician        = db.Column(db.String(50))
    restrict         = db.Column(db.String(200))
    intake           = db.Column(db.String(50))
    carbohydrates    = db.Column(db.String(500))
    protein          = db.Column(db.String(500))
    fats             = db.Column(db.String(500))
    breakfast        = db.Column(db.Float)
    morningsnack     = db.Column(db.Float)
    lunch            = db.Column(db.Float)
    eveningsnack     = db.Column(db.Float)
    dinner           = db.Column(db.Float)

    def __init__(self, form):
        for key in form:
            if form[key] is None:
                pass
            else:
                setattr(self,key,form[key])

    def set(self, form):
        for key in form:
            if form[key] is None:
                pass
            else:
                setattr(self,key,form[key])
        
    def __repr__(self):
        return '<Diet: name = %r>' % self.name
