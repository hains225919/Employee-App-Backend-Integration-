// Task1: initiate app and run server at 3000
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('dev'));

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.static(path.join(__dirname, 'dist', 'Frontend')));
// Task2: create mongoDB connection 
const mongoose = require('mongoose');

// MongoDB Atlas connection string (or local fallback)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin123@cluster0.mongodb.net/EmployeeDB?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err.message);
    });

// Employee Schema and Model
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, { versionKey: false });

const Employee = mongoose.model('employee', employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//TODO: get single data from db  using api '/api/employeelist/:id'
app.get(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            location: req.body.location,
            position: req.body.position,
            salary: req.body.salary
        });
        const savedEmployee = await newEmployee.save();
        res.status(200).json(savedEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put(['/api/employeelist', '/employeelist', '/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const id = req.params.id || req.body._id || req.body.id;
        let updatedEmployee;

        if (id) {
            updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                {
                    name: req.body.name,
                    location: req.body.location,
                    position: req.body.position,
                    salary: req.body.salary
                },
                { returnDocument: 'after' }
            );
        } else {
            updatedEmployee = await Employee.findOneAndUpdate(
                { name: req.body.name },
                {
                    location: req.body.location,
                    position: req.body.position,
                    salary: req.body.salary
                },
                { returnDocument: 'after' }
            );
        }

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Run server at port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
