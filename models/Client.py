from .DB import db

class Client(db.Model):
    __tablename__ = 'clients'

    id              = db.Column(db.Integer, primary_key = True)
    name            = db.Column(db.String(50), unique = True)
    slug            = db.Column(db.String(50), unique = True)
    email           = db.Column(db.String(50), unique = True)
    profile         = db.Column(db.String(100))
    age             = db.Column(db.Integer)
    height          = db.Column(db.Float)
    height_unit     = db.Column(db.String(5))
    weight          = db.Column(db.Float)
    weight_unit     = db.Column(db.String(5))
    bmi             = db.Column(db.Float)
    bodyfat         = db.Column(db.Float)
    bodyfat_unit    = db.Column(db.String(5))
    goal            = db.Column(db.String(100))
    goal_unit       = db.Column(db.String(5))
    startdate       = db.Column(db.String(15))
    enddate         = db.Column(db.String(15))
    outcome         = db.Column(db.String(20))
    outcome_unit    = db.Column(db.String(5))
    restrict        = db.Column(db.String(100))
    diet            = db.Column(db.Integer)
    score           = db.Column(db.Integer)
    lastlogin       = db.Column(db.DateTime)

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
        self.lastlogin = form['lastlogin']
        
    def __repr__(self):
        return '<Client: name = %r>' % self.name
