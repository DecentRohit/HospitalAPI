import jwt from "jsonwebtoken";
import DoctorRepository from "./Doctor.respository.js";

export default class DoctorController {

  constructor() {
    this.DoctorRepository = new DoctorRepository();
  }

  
  async doctorSignUp(req, res) {
    try {
      const result = await this.DoctorRepository.doctorSignUp(req.body);
      res.status(201).send(result);

    }
    catch (err) {
      console.log(err);
      return res.status(200).send(err.message);
    }
  }


  async patientSignUp(req, res) {
    try {

      const patient = await this.DoctorRepository.patientSignUp(req.body);
      res.status(201).send(patient);

    }
    catch (err) {
      console.log(err);
      return res.status(200).send(err.message);
    }
  }

  async doctorSignIn(req, res) {
    try {
      // 1. Find user by email.
      const doctor = await this.DoctorRepository.findByEmail(req.body.email);

      if (!doctor || req.body.password !== doctor.password) {
        return res.status(400).send('Incorrect Credentials');
      }
      // 3. Create token.
      const token = jwt.sign(
        {
          doctorID: doctor._id,
          email: doctor.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );
      // 4. Send token.
      return res.status(200).send(token);
    }
    catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async allReports(req, res) {
    try {
      const patientid = req.params.id;
      const reports = await this.DoctorRepository.getAllReports(patientid)
      if (!reports) {
        return res
          .status(400)
          .send('No patient report found');
      } else {
        return res.status(201).send(reports);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async reportStatus(req, res) {
    try {
      const status = req.params.status;
      console.log(status)
      const reports = await this.DoctorRepository.getAllReportStatus(status)
      if (!reports) {
        return res
          .status(400)
          .send(`no patient report found for status ${status}`);
      } else {
        return res.status(201).send(reports);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }


  async createReport(req, res) {
    
    try {
      const patientId = req.params.id;
      const status = req.body.status;
      const doctorID = req.doctorID
      if(!status){

        return res.status(200).send("Invalid Status of Patient")

      }
      const report = await this.DoctorRepository.createReport({ patientId, status, doctorID });
      res.status(201).send(report);

    }
    catch (err) {
      console.log(err);
      return res.status(200).send(err.message);
    }
  }

}
