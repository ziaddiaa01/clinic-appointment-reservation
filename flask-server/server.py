from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager,create_access_token
from pymongo import MongoClient
from bson import ObjectId
import json

app = Flask(__name__)
jwt = JWTManager(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['clinic_reservation_system']

users = db.Users
doctors = db.Doctors
appointments = db.Appointmens



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    role = data['role']
    user = users.find_one({'email': email})
    if user:
        return jsonify({'message': 'Email already exists'}), 
    user_id = users.insert_one({
        'username': username,
        'email': email,
        'password': password,
        'role': role,
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
    userId = str(user['_id'])
    if(user['role'] == "doctor"):
        doctor = doctors.find_one({'user_id': userId})
        doctorId=str(doctor['_id'])
        return jsonify({'message': 'Signin successful','role':user['role'],'doctorId':doctorId , "username":user['username']})
    else :
        return jsonify({'message': 'Signin successful','role':user['role'], "username":user['username']})
    





@app.route('/doctors/create_slot/<doctor_id>', methods=['POST'])
def create_slot(doctor_id):
    data = request.get_json()
    date = data['date']
    hour = data['hour']
    # Convert doctor_id to ObjectId
    doctor_id = ObjectId(doctor_id)
    # Get the current number of slots for the doctor
    doctor = doctors.find_one({'_id': doctor_id})
    if doctor:
        slots_count = len(doctor.get('slots', []))
        new_slot = {
            'slot-id': str(slots_count + 1),  # Increment the slot-id based on the current count
            'date': date,
            'hour': hour,
        }
        filter = {'_id': doctor_id}
        update = {'$push': {'slots': new_slot}}
        result = doctors.update_one(filter, update)
        
        if result.modified_count > 0:
            return jsonify({'message': 'Slot inserted successfully'})
        else:
            return jsonify({'message': 'No changes were made'})
    else:
        return jsonify({'message': 'Doctor not found'})



@app.route('/patient/create_appointment/<patient_name>', methods=['POST'])
def create_appointment(patient_name):
    data = request.get_json()
    doctor_name = data['doctorName']
    date = data['date']
    hour = data['hour']
    appointments_count = appointments.count_documents({})
    new_appointment = {
        'appointment_number': str(appointments_count + 1),
        'patient_name': patient_name,
        'doctor_name': doctor_name,
        'date': date,
        'hour': hour,
    }
    result = appointments.insert_one(new_appointment)
    if result.inserted_id:
        return jsonify({'message': 'Appointment inserted successfully'})
    else:
        return jsonify({'message': 'No changes were made'})




@app.route('/doctors/edit/<doctor_id>/<slot_Id>', methods=['PUT'])
def edit_slot(doctor_id, slot_Id):
    data = request.get_json()
    date = data['date']
    hour = data['hour']
    new_slot = {
        'slot-id': data['slot-id'],
        'date': date,
        'hour': hour
    }
    filter = {'_id': ObjectId(doctor_id), 'slots.slot-id': slot_Id}
    update = {'$set': {'slots.$': new_slot}}
    print(new_slot)
    result = doctors.update_one(filter, update)
    if result.modified_count > 0:
        return jsonify({'message': 'Slot Updated successfully'})
    else:
        return jsonify({'message': 'No changes were made'})

@app.route('/patient/edit/<patient_name>/<appointment_id>', methods=['PUT'])
def edit_appointment(patient_name, appointment_id):
    data = request.get_json()
    name = data['doctor_name']
    date = data['date']
    hour = data['hour']
    new_appointment = {
        'appointment_number': appointment_id,
        'doctor_name': name,
        'date': date,
        'hour': hour
    }
    filter = {'patient_name': patient_name, 'appointment_number': appointment_id}
    update_query = {'$set': new_appointment}
    result = appointments.update_one(filter, update_query)
    if result.modified_count > 0:
        return jsonify({'message': 'Appointment Updated successfully'})
    else:
        return jsonify({'message': 'No changes were made'})




@app.route('/doctors', methods=['GET'])
def get_doctors():
    all_doctors = doctors.find()
    doctor_list = []
    for doctor in all_doctors:
        doctor_data = {
            'id': str(doctor['_id']),
            'name': doctor['name']
        }
        doctor_list.append(doctor_data)
    return jsonify(doctor_list)

@app.route('/doctors/slots/<doctor_id>', methods=['GET'])
def view_slots(doctor_id):
    doctor = doctors.find_one({'_id': ObjectId(doctor_id)})
    if not doctor:
        return jsonify({'message': 'Doctor not found'})
    available_slots = []
    for slot in doctor['slots']:
        available_slots.append({'date': slot['date'], 'hour': slot['hour'], 'slot-id':slot['slot-id']})
    return jsonify({'slots': available_slots})


@app.route('/patient/appointments/<patient_name>', methods=['GET'])
def view_appointments(patient_name):
    appointment = list(appointments.find({'patient_name': patient_name}))
    if not appointment:
        return jsonify({'message': 'Appointment not found'})
    all_appointments = []
    for details in appointment:
        all_appointments.append({'date': details['date'], 'hour': details['hour'], 'doctor_name': details['doctor_name'],'appointment_number':details['appointment_number']})
        print(all_appointments)
    return jsonify({'appointments': all_appointments})




@app.route('/doctors/delete/<doctor_id>/<slot_id>', methods=['DELETE'])
def delete_slot(doctor_id, slot_id):
    doctor = doctors.find_one({'_id': ObjectId(doctor_id)})
    if doctor:
        slots = doctor['slots']
        for slot in slots:
            if slot['slot-id'] == slot_id:
                slots.remove(slot)
                doctors.update_one({'_id': ObjectId(doctor_id)}, {'$set': {'slots': slots}})
                return jsonify({'message': 'Slot deleted successfully'})
        return jsonify({'message': 'Slot not found'})
    else:
        return jsonify({'message': 'Doctor not found'})

@app.route('/patient/delete/<appointment_id>', methods=['DELETE'])
def delete_appointment(appointment_id):
    if (appointments.find_one({'appointment_number':appointment_id})):
        appointments.delete_one({'appointment_number': appointment_id})
        return jsonify({'message': 'Appointment canceled successfully'})
    else:
        return jsonify({'message': 'Appointment not found '})


if __name__ == '__main__':
    app.run(debug=True)
