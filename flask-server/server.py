from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
jwt = JWTManager(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['clinic_reservation_system']

users = db.Users
doctors = db.Doctors
appointments = db.Appointments



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    user = users.find_one({'email': email})
    if user:
        return jsonify({'message': 'Email already exists'}), 400

    user_id = users.insert_one({
        'username': username,
        'email': email,
        'password': password,
    }).inserted_id
    response = jsonify({'message': 'Signup successful', 'user_id': str(user_id)})
    response.headers['Content-Type'] = 'text/html;charset=utf-8'
    return response



@app.route('/signin', methods=['PUT'])
def signin():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = users.find_one({'email': email, 'password': password})
    if not user:
        return jsonify({'message': 'Invalid email or password'})
    access_token = create_access_token(identity=str(user['_id']))
    return jsonify({'message': 'Signin successful', 'access_token': access_token})


@app.route('/doctors/<doctor_id>/schedule', methods=['POST'])
@jwt_required
def set_schedule(doctor_id):
    data = request.get_json()
    day = data['day']
    slots = data['slots']

    doctors.update_one({'_id': ObjectId(doctor_id)}, {'$push': {'schedule': {'day': day, 'slots': slots}}})

    return jsonify({'message': 'Schedule set successfully'})

@app.route('/doctors/<doctor_id>/slots', methods=['GET'])
def get_available_slots(doctor_id):
    doctor = doctors.find_one({'_id': ObjectId(doctor_id)})
    if not doctor:
        return jsonify({'message': 'Doctor not found'})

    available_slots = []
    for day in doctor['schedule']:
        for slot in day['slots']:
            if slot['isAvailable']:
                available_slots.append({'day': day['day'], 'startTime': slot['startTime'], 'endTime': slot['endTime']})
    return jsonify({'slots': available_slots})


@app.route('/update_appointment/<appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    data = request.get_json()
    doctor_id = data['doctor_id']
    slot = data['slot']
    appointments.update_one({'_id': ObjectId(appointment_id)},
                            {'$set': {'doctorId': ObjectId(doctor_id), 'slot': slot}})
    return jsonify({'message': 'Appointment updated successfully'})


@app.route('/appointments/<appointment_id>', methods=['DELETE'])
def delete_appointment(appointment_id):
    appointments.delete_one({'_id': ObjectId(appointment_id)})

    return jsonify({'message': 'Appointment canceled successfully'})


@app.route('/patients/<patient_id>/appointments', methods=['GET'])
def get_patient_appointments(patient_id):
    appointments_collection = appointments.find({'patientId': ObjectId(patient_id)})
    patient_appointments = []
    for appointment in appointments_collection:
        doctor = doctors.find_one({'_id': appointment['doctorId']})
        patient_appointments.append({
            'appointment_id': str(appointment['_id']),
            'doctor_name': doctor['username'],
            'slot': appointment['slot']
        })
    return jsonify({'appointments': patient_appointments})


if __name__ == '__main__':
    app.run(debug=True)
