// Manage routes/paths to DoctorController

// 1. Import express.
import express from 'express';
import DoctorController from './Doctors.controller.js';
import jwtAuth from "../../middlewares/jwt.middleware.js";

// 2. Initialize Express router.
const doctorRouter = express.Router();

const doctorController = new DoctorController();

// All the paths to controller methods.

//register doctors with with username and password
doctorRouter.post('/doctors/register', (req, res) => {
    doctorController.doctorSignUp(req, res)
})


//returns the JWT to be used for further process
doctorRouter.post('/doctors/login', (req, res) => {
    doctorController.doctorSignIn(req, res)
})

//register patients with with username and password
doctorRouter.post('/patients/register', jwtAuth, (req, res) => {
    doctorController.patientSignUp(req, res)
})

//create reports for patients by doctor
doctorRouter.post('/patients/:id/create_report',jwtAuth, (req, res) => {
    doctorController.createReport(req, res)
})

//List all the reports of a patient oldest to latest
doctorRouter.get('/patients/:id/all_reports', jwtAuth, (req, res) => {
    doctorController.allReports(req, res)
})
//List all the reports of all the patients filtered by a specific status
doctorRouter.get('/reports/:status', jwtAuth, (req, res) => {
    doctorController.reportStatus(req, res)
})

export default doctorRouter;
