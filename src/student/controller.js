const pool = require('../../db');
const queries = require('./query');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addStudent = (req, res) => {
    const {name, email, age, dob} = req.body;

    // check if email exist
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exists.")
        }
    })

    //add student to db
    pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
        if (error) throw error;
        res.status(201).send("Student Created Success")
        console.log(results.rows)
    })
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    //if student doesn't exist
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student doesn't exists");
        }
    });

    //Delete student
    pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student Removed Success")
        console.log(results.status)
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    //if student doesn't exist
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student doesn't exists");
        }

        pool.query(queries.updateStudent, [name, email, id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Update success")
            console.log("Updated version is :" + results.rows)
        })
    })
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
};