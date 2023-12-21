db = db.getSiblingDB("clinic_reservation_system");
db.Users.drop();
db.Users.insertMany([{
    "_id": ObjectId("654bd86157dd82d37ac925f8"),
    "username": "jhon",
    "email": "jhon@example.com",
    "password": "jhon1231311",
    "role": "doctor"
  },
  {
  "_id":  ObjectId("654fa82262e1f35693f45dd6"),
  "username": "sayed",
  "email": "sayed@example.com",
  "password": "sayed1231311",
  "role": "patient"
  }
]);

db.Appointmens.drop();
db.Appointmens.insertMany([{
    "_id": ObjectId( "654ec1088d9ae29dde56931e"),
    "patient_name": "sayed",
    "doctor_name": "jhon",
    "date": "18/08/2022",
    "hour": "8:00 PM",
    "appointment_number": "1"
  }]);

db.Doctors.drop();
db.Doctors.insertMany([{
    "_id": ObjectId("5f9a2e8e4a3e4e001f2e8a1d"),
    "user_id": "654bd86157dd82d37ac925f8",
    "name": "jhon",
    "slots": [
      {
        "slot-id": "1",
        "date": "2/2/2022",
        "hour": "2:00 PM"
      },
      {
        "slot-id": "2",
        "date": "13/12/2023",
        "hour": "9:00 PM"
      },
      {
        "slot-id": "3",
        "date": "15/12/2023",
        "hour": "9:00 PM"
      },
      {
        "slot-id": "4",
        "date": "3/3/2023",
        "hour": "2:00 PM"
      },
      {
        "slot-id": "5",
        "date": "5/3/2023",
        "hour": "10:00 PM"
      },
      {
        "slot-id": "6",
        "date": "9/9/2023",
        "hour": "9:00 PM"
      }
    ]
  }
  ]);
  