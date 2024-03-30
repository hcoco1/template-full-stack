#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports

from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from flask_cors import CORS


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

login_manager = LoginManager()
login_manager.init_app(app)

# Simulated database of users
users = {'user@example.com': {'password': 'password123'}}

class User(UserMixin):
    def __init__(self, email):
        self.id = email

@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return None

    user = User(email)
    return user

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('username')  # Assuming email is used as the username
    password = data.get('password')

    if email in users:
        return jsonify({'message': 'User already exists'}), 409

    # Here you would hash the password before storing it
    users[email] = {'password': password}
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('username')
    password = data.get('password')
    
    if email not in users or users[email]['password'] != password:
        return jsonify({'message': 'Invalid credentials'}), 401

    user = User(email)
    login_user(user)
    return jsonify({'message': 'Logged in successfully'})

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})


if __name__ == '__main__':
    app.run(port=5555, debug=True)

