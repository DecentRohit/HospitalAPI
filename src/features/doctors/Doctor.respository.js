import mongoose from "mongoose";
import { DoctorModel } from "./DoctorSchema.js";
import { patientModel } from "../patients/patientSchema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import { reportModel } from "../report/reportSchema.js";
import { ObjectId } from "mongodb";


export default class DoctorRepository {
    
    async doctorSignUp(data) {
        const { name, email, password, type } = data
        try {
            const newDoctor = new DoctorModel({
                name,
                email,
                password,
                type
            });
            await newDoctor.save();
            return newDoctor;
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                console.log(err);
                throw new ApplicationError(err.message, 500);
            }
        }
    }
    async patientSignUp(patient) {

        try {
            const Alreadypatient = await patientModel.findOne({
                name: patient.name,
                phone: patient.phone,
            })
            if (Alreadypatient) {
                return Alreadypatient;
            }
            const newPatient = new patientModel({
                name: patient.name,
                phone: patient.phone,
            });
            await newPatient.save();
            return newPatient;
        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }
    async doctorSignIn(email, password) {
        try {
            return await DoctorModel.findOne({ email, password });
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async findByEmail(email) {
        try {
            return await DoctorModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async createReport(data) {
        try {

            const { patientId, status, doctorID } = data;
            const patient = await patientModel.findById(new mongoose.Types.ObjectId(patientId));
            if (!patient) {
                return "no patient found for mentioned id";
            }

            const newReport = new reportModel({
                patient: new ObjectId(patientId),
                createdBy: new ObjectId(doctorID),
                status,
                date: new Date()
            });
            await newReport.save();
            await patient.report.push(new ObjectId(newReport._id))
            await patient.save();
            return newReport;
        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }
    async getAllReports(patientId) {
        try {

            const reports = await reportModel.find({ patient: new mongoose.Types.ObjectId(patientId) });
            if (!reports) {
                return "no patient report found for mentioned id";
            }
            console.log(reports)
            return reports;

        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }

    async getAllReportStatus(status) {
        try {

            const reports = await reportModel.find({ status });
            if (!reports || reports.length == 0) {
                return `no patient report found for status ${status}`;
            }
            console.log(reports)
            return reports;

        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }
}

