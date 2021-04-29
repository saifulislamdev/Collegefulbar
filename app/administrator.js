const express = require('express');
const app = express();
const async = require('async');
const con = require('./index').con;
const { create } = require('express-handlebars');

// TODO: put files in models folder

function createAccountType(accountType, con) {
    /* 
    Purpose: Creates an account type in the DB (i.e. Student, Administrator, etc.). 
    Input:
        accountType: account type to be created in the DB [string]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, 'Data too long for column 'Name' at row 1']).
    */
    let sql = 'INSERT INTO AccountType VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(sql, accountType, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : resolve([true]);
        });
    });
}

function getAccountTypes(con) {
    /* 
    Purpose: Retrieves an array of all account types in the DB as objects
    Input:
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If an error occurs, returns an array with only one element of false (i.e. [false])
        If there is no account types in the DB, returns an empty array. 
        Otherwise, returns an array of objects that contain the account type in each object.
    */
    let sql = 'SELECT * FROM AccountType';
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            return err ? resolve([false]) : resolve(result);
        });
    });
}

function deleteAccountType(accountType, con) {
    /* 
    Purpose: Deletes an account type in the DB if it exists (i.e. Student, Administrator, etc.). 
    Input:
        accountType: account type to be deleted in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
        If accountType does not exist in DB, returns [false, 'No rows affected'].
    */
    let sql = 'DELETE FROM AccountType WHERE Name = ?';
    return new Promise((resolve, reject) => {
        con.query(sql, accountType, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
        });
    });
}

function createDepartment(id, name, con) {
    /* 
    Purpose: Creates an department in the DB (i.e. Computer Science, Electrical Engineering, etc.). 
    Input:
        id: to be inserted in Id column in Department table (can be NULL if user does not specify a certain id)
        name: name of the department (i.e. Computer Science) to be inserted in the Name column of the Department table
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    if (id === null) var sql = 'INSERT INTO Department(name) VALUES (?)';
    else var sql = 'INSERT INTO Department VALUES (?)';
    return new Promise((resolve, reject) => {
        if (id === null) {
            con.query(sql, name, (err, result) => {
                return err ? resolve([false, err.sqlMessage]) : resolve([true]);
            });
        } else {
            con.query(sql, [[id, name]], (err, result) => {
                return err ? resolve([false, err.sqlMessage]) : resolve([true]);
            });
        }
    });
}

function getDepartments(con) {
    /* 
    Purpose: Retrieves an array of all departments in the DB as objects
    Input:
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If an error occurs, returns an array with only one element of false (i.e. [false])
        If there are no departments in the DB, returns an empty array. 
        Otherwise, returns an array of objects that contain the department type in each object.
    */
    let sql = 'SELECT * FROM Department';
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            return err ? resolve([false]) : resolve(result);
        });
    });
}

function deleteDepartment(id, con) {
    /* 
    Purpose: Deletes a department in the DB if it exists (i.e. Computer Science, Electrical Engineering, etc.). 
    Input:
        id: id of department to be deleted in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
        If id does not exist in DB, returns [false, 'No rows affected'].
    */
    let sql = 'DELETE FROM Department WHERE Id = ?';
    return new Promise((resolve, reject) => {
        con.query(sql, id, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
        });
    });
}

function createGrade(name, con) {
    /* 
    Purpose: Creates a grade type in the DB (i.e. 'A', 'B', 'C', 'D', 'F', etc.). 
    Input:
        name: grade to be created in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'INSERT INTO Grade VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(sql, name, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : resolve([true]);
        });
    });
}

// TODO: for both administrator.js and instructor.js
function getGrades(con) {
    /* 
    Purpose: Retrieves an array of all grade types in the DB as objects
    Input:
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If an error occurs, returns an array with only one element of false (i.e. [false])
        If there are no grades in the DB, returns an empty array. 
        Otherwise, returns an array of objects that contain the grade in each object.
    */
    let sql = 'SELECT * FROM Grade';
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            return err ? resolve([false]) : resolve(result);
        });
    });
}

function deleteGrade(name, con) {
    /* 
    Purpose: Deletes a grade type in the DB if it exists (i.e. 'A', 'B', 'C', 'D', 'F', etc.). 
    Input:
        name: name of grade to be deleted in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
        If name does not exist in DB, returns [false, 'No rows affected'].
    */
    let sql = 'DELETE FROM Grade WHERE Name = ?';
    return new Promise((resolve, reject) => {
        con.query(sql, name, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
        });
    });
}

function createSemester(name, con) {
    /* 
    Purpose: Creates a semester in the DB (i.e. 'Winter', 'Spring', 'Summer', 'Fall', etc.). 
    Input:
        name: semester to be created in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'INSERT INTO Semester VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(sql, name, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : resolve([true]);
        });
    });
}

function getSemesters(con) {
    /* 
    Purpose: Retrieves an array of all semesters in the DB as objects
    Input:
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If an error occurs, returns an array with only one element of false (i.e. [false])
        If there are no grades in the DB, returns an empty array. 
        Otherwise, returns an array of objects that contain the grade in each object.
    */
    let sql = 'SELECT * FROM Semester';
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            return err ? resolve([false]) : resolve(result);
        });
    });
}

function deleteSemester(name, con) {
    /* 
    Purpose: Deletes a semester in the DB if it exists (i.e. 'Winter', 'Spring', 'Summer', 'Fall', etc.). 
    Input:
        name: name of semester to be deleted in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
        If name does not exist in DB, returns [false, 'No rows affected'].
    */
    let sql = 'DELETE FROM Semester WHERE Name = ?';
    return new Promise((resolve, reject) => {
        con.query(sql, name, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
        });
    });
}

function assignCurrentSemester(name, year, con) {
    /* 
    Purpose: Updates the current semester in the DB so that students are allowed to enroll, view, and drop courses for this semester and not previous semesters.
    Warning:
        name must already be in Semester table's Name column
    Input:
        name: semester name for the current semester [string]
        year: the year of the current semester [int]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, 'Data too long for column 'Name' at row 1']).
    */
    let sql = 'INSERT INTO CurrentSemester(Name, Year) VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(sql, [[name, year]], (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : resolve([true]);
        });
    });
}

function assignNextSemester(name, year, con) {
    /* 
    Purpose: Updates the next semester in the DB so that students are allowed to enroll, view, and drop courses for this semester, current semester, and not previous semesters.
    Warning:
        name must already be in Semester table's Name column
    Input:
        name: semester name for the next semester [string]
        year: the year of the next semester [int]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If the anticipated next semester is the same as the current semester in the DB, returns [false, 'Next semester cannot be current semester']
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'INSERT INTO NextSemester(Name, Year) VALUES (?)';
    return new Promise((resolve, reject) => {
        async.waterfall([
            function verify(callback) {
                con.query('SELECT Name, Year FROM CurrentSemester ORDER BY DateAdded DESC LIMIT 1', (err, result) => {
                    let currSem = result[0];
                    if (currSem['Name'] === name && currSem['Year'] === year) {
                        callback(null, false);
                        return resolve([false, 'Next semester cannot be current semester']);
                    }
                    callback(null, true);
                });
            },
            function execute(verification) {
                if (!verification) return;
                con.query(sql, [[name, year]], (err, result) => {
                    return err ? resolve([false, err.sqlMessage]) : resolve([true]);
                });
            }
        ]);
    });
}

function createInstructor(id, name, email, con) {
    /* 
    Purpose: Creates an instructor in the DB
    Input:
        id: to be inserted in Id column in Instructor table (must specify a specific ID number; cannot be null] [int]
        name: name of the instructor (i.e. 'John Doe') to be inserted in the Name column of the Instructor table [null, empty string, string]
        email: email of the instructor (i.e. 'johndoe@gmail.com') to be inserted in the Email column of the Instructor table (must be unique; not used by other instructors) [null, empty string, string]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'INSERT INTO Instructor VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(sql, [[id, name, email]], (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : resolve([true]);
        });
    });
}

function getInstructors(con) {
    /* 
    Purpose: Retrieves an array of all instructors in the DB as objects
    Input:
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If an error occurs, returns an array with only one element of false (i.e. [false])
        If there are no instructors in the DB, returns an empty array. 
        Otherwise, returns an array of objects that contain the instructor's information in each object.
    */
    let sql = 'SELECT * FROM Instructor';
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            return err ? resolve([false]) : resolve(result);
        });
    });
}

function deleteInstructor(id, con) {
    /* 
    Purpose: Deletes an instructor in the DB if it exists 
    Input:
        id: id of the instructor to be deleted in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Id' at row 1"]).
        If id does not exist in DB, returns [false, 'No rows affected'].
    */
    let sql = 'DELETE FROM Instructor WHERE Id = ?';
    return new Promise((resolve, reject) => {
        con.query(sql, id, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
        });
    });
}

function createCourse(id, title, dept, credits, cost, con) {
    /* 
    Purpose: Creates a course in the DB
    Warning: 
        dept must already be in Department table's Id column
    Input:
        id: course ID to be inserted in Id column of Course table (must specify a specific ID number; cannot be null and must be unique) [int)
        title: title/name of the course to be inserted in the Title column of Course table [string]
        dept: ID of the department that the course belongs to (same ID as the one in the Department table) [int]
        credits: the number of credits the course is [int]
        cost: how much the course costs (decimal with at most precision 2)
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'INSERT INTO Course VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(sql, [[id, title, dept, credits, cost]], (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : resolve([true]);
        });
    });
}

// TODO: for administrator and student.js
function viewCourses(con) {
    let sql = "SELECT * FROM course";
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            return err ? resolve([false]) : resolve(result);
        });
    });
}

function updateCourse(id, newTitle, newDept, newCredits, newCost, con) {
    /* 
    Purpose: Updates a course's information in the DB
    Warning: 
        newDept must already be in Department table's Id column
    Input:
        id: course ID to be updated in Course table (must specify a specific ID number; cannot be null and must be unique) [int]
        newTitle: new title/name of the course that is being updated [string]
        newDept: new department ID of the course that is being updated (same ID as the one in the Department table) [int]
        newCredits: the number of credits the course is being updated to [int]
        newCost: the new cost of the course (decimal with at most precision 2)
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
        If no such row in the Course table has a matching id, returns [false, 'No rows affected'].
    */
    let sql = 'UPDATE Course \
                SET Title = ?, \
                    Dept = ?, \
                    Credits = ?, \
                    Cost = ? \
                WHERE Id = ?';
    return new Promise((resolve, reject) => {
        con.query(sql, [newTitle, newDept, newCredits, newCost, id], (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
        });
    });
}

function deleteCourse(id, con) {
    /* 
    Purpose: Deletes a course in the DB if it exists 
    Input:
        id: id of the course to be deleted in the DB
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Id' at row 1"]).
        If id does not exist in DB, returns [false, 'No rows affected'].
    */
    let sql = 'DELETE FROM Course WHERE Id = ?';
    return new Promise((resolve, reject) => {
        con.query(sql, id, (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
        });
    });
}

function createClass(classId, courseId, section, instructor, year, semester, con) {
    /* 
    Purpose: Creates a class in the DB
    Warning: 
        courseId must already be in Course table's Id column
        instructor must already be in Instructor table's Id column
        semester must already be in Semester table's Name column
        year and semester must collectively be either the current or next semester
    Input:
        classId: class ID for the class the user wants to create (if null, automatically sets a class ID) [int]
        courseId: course ID that references a course in the Course table (must specify a specific ID number that's in the Course table's Id column, cannot be null, int)
        section: section of the class (cannot be null) [string]
        instructor: ID of the instructor that teaches the class (same ID as the one in the Instructor table) [int]
        year: the year the class takes place (cannot be null) [int]
        semester: the semester the class takes place (same as the name in the Semester table, cannot be null) [string]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
        If the year and semester does not belong to the current or next semester, returns [false, 'Desired year or semester does not belong to the current or next semesters'].
    */
    if (classId === null) var sql = 'INSERT INTO Class(CourseId, Section, Instructor, Year, Semester) VALUES (?)';
    else var sql = 'INSERT INTO Class VALUES (?)';
    return new Promise((resolve, reject) => {
        async.waterfall([
            function verify(callback) {
                con.query('SELECT Name, Year FROM CurrentSemester ORDER BY DateAdded DESC LIMIT 1; \
                           SELECT Name, Year FROM NextSemester ORDER BY DateAdded DESC LIMIT 1;', (err, result) => {
                    let currSem = result[0][0]['Name'];
                    let currYear = result[0][0]['Year'];
                    let nextSem = result[1][0]['Name'];
                    let nextYear = result[1][0]['Year'];
                    if ((currSem !== semester || currYear !== year) && (nextSem !== semester || nextYear !== year)) {
                        callback(null, false);
                        return resolve([false, 'Desired year or semester does not belong to the current or next semesters']);
                    }
                    callback(null, true);
                });
            },
            function execute(verification) {
                if (!verification) return;
                if (classId === null) var args = [[courseId, section, instructor, year, semester]];
                else var args = [[classId, courseId, section, instructor, year, semester]];
                con.query(sql, args, (err, result) => {
                    return err ? resolve([false, err.sqlMessage]) : resolve([true]);
                });
            }
        ]);
    });
}


// TODO: for administrator.js and student.js
function getCurrentClasses() {
}

// TODO: for administrator.js and student.js
function getNextClasses() {
}

function updateClass(courseId, currSection, currYear, currSemester, newSection, newInstructor, newYear, newSemester, con) {
    /* 
    Purpose: Updates a class's information in the DB
    Warning: 
        newInstructor must already be in Instructor table's Id column
        newSemester must already be in Semester table's Name column
    Input:
        courseId: course ID of class that is being updated in Class table [int]
        currSection: current section of class that is being updated in Class table [string]
        currYear: current year of class that is being updated in Class table [int]
        currSemester: current semester of class that is being updated in Class table [string]
        newSection: new section of class that is being updated in Class table (can be the same as the current section, cannot be null) [string]
        newInstructor: new ID of the instructor that teaches the class (can be the same as the current instructor, same ID as the one in the Instructor table, int)
        newYear: new year of class that is being updated in Class table (cannot be null) [int)
        newSemester: new semester of class that is being updated in Class table (same as the name in the Semester table, cannot be null) [string]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
        If no such row in the Class table has a matching courseId, currSection, currYear, and currSemester, returns [false, 'No rows affected'].
        If the newYear and newSemester does not belong to the current or next semester, returns [false, 'Desired year or semester does not belong to the current or next semesters'].
    */
    let sql = 'UPDATE Class \
                SET Section = ?, \
                    Instructor = ?, \
                    Year = ?, \
                    Semester = ? \
                WHERE CourseId = ? AND \
                    Section = ? AND \
                    Year = ? AND \
                    Semester = ?';
    return new Promise((resolve, reject) => {
        async.waterfall([
            function verify(callback) {
                con.query('SELECT Name, Year FROM CurrentSemester ORDER BY DateAdded DESC LIMIT 1; \
                           SELECT Name, Year FROM NextSemester ORDER BY DateAdded DESC LIMIT 1;', (err, result) => {
                    let currSem = result[0][0]['Name'];
                    let currYear = result[0][0]['Year'];
                    let nextSem = result[1][0]['Name'];
                    let nextYear = result[1][0]['Year'];
                    if ((currSem !== newSemester || currYear !== newYear) && (nextSem !== newSemester || nextYear !== newYear)) {
                        callback(null, false);
                        return resolve([false, 'Desired year or semester does not belong to the current or next semesters']);
                    }
                    callback(null, true);
                });
            },
            function execute(verification) {
                if (!verification) return;
                con.query(sql, [newSection, newInstructor, newYear, newSemester, courseId, currSection, currYear, currSemester], (err, result) => {
                    return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
                });
            }
        ]);
    });
}

function deleteClass(courseId, section, year, semester, con) {
    /* 
    Purpose: Deletes a class in the DB if it exists 
    Input:
        courseId: course ID for the to-be deleted class [int]
        section: section of the to-be deleted class [string]
        year: the year in which the to-be deleted class takes place (int)
        semester: the semester in which the to-be deleted class takes place [string]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Id' at row 1"]).
        If the year and semester does not belong to the next semester, returns [false, 'Year or semester does not belong to the next semester'] (cannot delete classes from the past or present)
        If a matching courseId, section, year, and semester does not exist in DB, returns [false, 'No rows affected'].
    */
    let sql = 'DELETE FROM Class WHERE CourseId = ? AND Section = ? AND Year = ? AND Semester = ?';
    return new Promise((resolve, reject) => {
        async.waterfall([
            function verify(callback) {
                con.query('SELECT Name, Year FROM NextSemester ORDER BY DateAdded DESC LIMIT 1', (err, result) => {
                    let nextSem = result[0];
                    if (nextSem['Name'] !== semester || nextSem['Year'] !== year) {
                        callback(null, false);
                        return resolve([false, 'Year or semester does not belong to the next semester']);
                    }
                    callback(null, true);
                });
            },
            function execute(verification) {
                if (!verification) return;
                con.query(sql, [courseId, section, year, semester], (err, result) => {
                    return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
                });
            }
        ]);
    });
}

function createStudent(id, name, ssn, con) {
    /* 
    Purpose: Creates a pending student in the DB
    Input:
        id: student ID number of the potential student to be inserted in the Id column of Student table (must specify a specify a unique ID number; cannot be null) [int]
        name: full name of the potential student to be inserted in the Name column of Student table [string]
        ssn: Social Security Number of the potential student to be inserted in SSN column of Student table [int]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'INSERT INTO Student(Id, Name, Credits, Registered, Probation, SSN) VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(sql, [[id, name, 0, true, false, ssn]], (err, result) => {
            return err ? resolve([false, err.sqlMessage]) : resolve([true]);
        });
    });
}

function assignGraduation(id, con) {
    /* 
    Purpose: Marks a student as having graduated in the DB (deregisters the student)
    Input:
        id: student ID number of the student [int]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is no matching id, returns [false, 'No matching id'].
        If the student is not registered as a student anymore (may have already graduated, transferred, or got kicked out), returns [false, 'Not registered as a student anymore'].
        If student is on probation, returns [false, 'Student on probation'].
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'UPDATE Student SET Registered = false WHERE Id = ?';
    return new Promise((resolve, reject) => {
        async.waterfall([
            function verify(callback) {
                con.query('SELECT Registered, Probation FROM Student WHERE Id = ?', id, (err, result) => {
                    if (result.length === 0) {
                        callback(null, false);
                        return resolve([false, 'No matching id']);
                    }
                    if (result[0]['Registered'] === 0) {
                        callback(null, false);
                        return resolve([false, 'Not registered as a student anymore']);
                    }
                    if (result[0]['Probation'] === 1) {
                        callback(null, false);
                        return resolve([false, 'Student on probation']);
                    }
                    callback(null, true);
                });
            },
            function execute(verification) {
                if (!verification) return;
                con.query(sql, id, (err, result) => {
                    return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
                });
            }
        ]);
    });
}

function assignProbation(id, con) { // TODO: work on each function from here forward with code quality
    /* 
    Purpose: Puts a student on probation in the DB
    Input:
        id: student ID number of the student [int]
        con: connection to DB (result of createConnection() method)
    Output: [Promise]
        If there is no error, returns an array with only one element of true (i.e. [true])
        If there is no matching id, returns [false, 'No matching id'].
        If student is not registered anymore, returns [false, 'Student not registered anymore'].
        If student is already on probation, returns [false, 'Student already on probation'].
        If there is an error, returns false with the SQL message in an array (i.e. [false, "Data too long for column 'Name' at row 1"]).
    */
    let sql = 'UPDATE Student SET Probation = true WHERE Id = ?';
    return new Promise((resolve, reject) => {
        async.waterfall([
            function verify(callback) {
                con.query('SELECT Registered, Probation FROM Student WHERE Id = ?', id, (err, result) => {
                    if (result.length === 0) {
                        callback(null, false);
                        return resolve([false, 'No matching id']);
                    }
                    if (result[0].Registered === 0) {
                        callback(null, false);
                        return resolve([false, 'Student not registered anymore']);
                    }
                    if (result[0].Probation === 1) {
                        callback(null, false);
                        return resolve([false, 'Student already on probation']);
                    }
                    callback(null, true);
                });
            },
            function execute(verification) {
                if (!verification) return;
                con.query(sql, id, (err, result) => {
                    return err ? resolve([false, err.sqlMessage]) : result.affectedRows > 0 ? resolve([true]) : resolve([false, 'No rows affected']);
                });
            }
        ]);
    });
}

function removeProbation(id, con) {
}


// TODO: for administrator.js
function verifyAdministratorLogin() {
}





// TODO: for db-setup.js
function seed() {
}

// TODO: check if all features are implemented in the proposal

/* Testing */
(async () => {
    const res1 = await createAccountType('Administrator', con);
    const res2 = await createAccountType('Instructor', con);
    const res3 = await createAccountType('Student', con);
    const res4 = await createDepartment(1, 'Computer Science', con);
    const res5 = await createDepartment(2, 'Electrical Engineering', con);
    const res6 = await createDepartment(3, 'Computer Engineering', con);
    const res7 = await createGrade('A', con);
    const res8 = await createGrade('B', con);
    const res9 = await createGrade('C', con);
    const res10 = await createGrade('D', con);
    const res11 = await createGrade('F', con);
    const res12 = await createSemester('Winter', con);
    const res13 = await createSemester('Spring', con);
    const res14 = await createSemester('Summer', con);
    const res15 = await createSemester('Fall', con);
    const res16 = await assignCurrentSemester('Spring', 2021, con);
    const res17 = await assignNextSemester('Fall', 2021, con);
    const res18 = await createInstructor(1, 'John Connor', 'john.anthony.connor@gmail.com', con);
    const res19 = await createInstructor(2, 'Hesham Auda', 'hauda@ccny.cuny.edu', con);
    const res20 = await createInstructor(3, 'Akbar Islam', 'nysaifulislam@gmail.com', con);
    const res21 = await createInstructor(4, 'Akira Kawaguchi', 'akawaguchi@ccny.cuny.edu', con);
    const res22 = await createCourse(1, 'Database Systems', 1, 3, 1000.00, con);
    const res23 = await createCourse(2, 'Data Structures', 1, 3, 1000.00, con);
    const res24 = await createCourse(3, 'Algorithms', 1, 3, 1000.00, con);
    const res25 = await createClass(32157, 1, 'H', 1, 2021, 'Spring', con);
    const res26 = await createClass(32179, 1, 'M', 2, 2021, 'Spring', con);
    const res27 = await createClass(34280, 1, 'A', 4, 2021, 'Fall', con);
    const res28 = await createStudent(123, 'Saiful Islam', 123456789, con);
    const res29 = await createStudent(456, 'Akbar Haider', 111111111, con); 
    
    // const res = await enrollInClass(32157, null, null, null, null, 123, con);
    // const res = await enrollInClass(32231, null, null, null, null, 123, con);

    // const res = await getClassInfo(1, 'H', 2021, 'Spring', con);
    // console.log(res[0]['Year'], res[0]['Semester']);
    // const res = await assignProbation(123, con);
    // const res = await enrollInClass(null, 1, 'H', 2021, 'Spring', 123, con);
    // const res = await getClassInfo(1, 'A', 2021, 'Fall', con);
    // const res = await updateClass(1, 'TEST', 2021, 'Spring', 'TEST', 2, 2021, 'Winter', con);
    // console.log(res16);
    // console.log(res17);
    // console.log(res18);
    // const res = await createClass(null, 1, 'TEST', 2, 2021, 'Winter', con);
    // const res = await getClasses(con);
    // console.log(res);
    // const res = await deleteAccountType('Student', con);
    // const res = await getAccountTypes(con);
    // const res = await deleteAccountType('Teacher', con);
    // const res = await createDepartment(2, 'Test department', con);
    // const res = await deleteDepartment(26, con);
    // const res = await getDepartments(con);
    // const res = await deleteGrade('E', con);
    // const res = await deleteGrade('F', con);
    // const res = await getGrades(con);
    // const res = await deleteSemester('Fa', con);
    // const res = await getSemesters(con);
    // const res = await createInstructor(123, 'John Doe', 'johndoe@gmail.com', con);
    // const res = await deleteInstructor(0, con);
    // const res = await getInstructors(con);
    // const res = await updatedInstructorForClass(123, 'Bob', con);
    // const res = await createCourse(100, 'Saiful's Awesome Lab', 1, 3, 1000.00, con);
    // const res = await deleteCourse(1, con);
    // const res = await updateCourse(101, 'Saiful's New Awesome Lab', 1, 4, 1500.00, con);
    // const res = await deleteClass(1, 'B', 2021, 'Spring', con);
    // const res = await getClassInfo(1, 'H', 2021, 'Spring', con);
    // const res = await getClasses(con);
    // const res = await createStudent(123321, 'Saiful Islam', 123456789, con);
    // const res = await registerAsStudent(123321, 'Saiful Islam', 123456789, 'nysaifulislam@gmail.com', con);
    // const res = await enrollInClass(null, 1, 'H', 2021, 'Spring', )
    // const res = await assignProbation(123321, con);
    // const res = await assignGraduation(123321, con);
    // const res = await enrollInClass(null, 1, 'H', 2021, 'Spring', 123321, con);
    // const res = await enrollInClass(32200, null, null, null, null, 123321, con);

    // console.log(res);
})();

app.listen(5002, () => {
    console.log('Server Started on Port 5002');
});

module.exports ={
createAccountType,
getAccountTypes,
deleteAccountType,
createDepartment,
getDepartments,
deleteDepartment,
getGrades,
createGrade,
deleteGrade,
getSemesters,
deleteSemester,
createSemester,
assignCurrentSemester,
assignNextSemester,
getInstructors,
createInstructor,
deleteInstructor,
createCourse,
updateCourse,
viewCourses,
deleteCourse,
createClass,
updateClass,
deleteClass,
createStudent,
assignGraduation,
assignProbation
};