// server/routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Thêm nhân viên
router.post('/', async (req, res) => {
    const employee = new Employee(req.body);
    try {
        await employee.save();
        res.status(201).send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Lấy danh sách nhân viên
router.get('/', async (req, res) => {
    const employees = await Employee.find();
    res.send(employees);
});

// Sửa thông tin nhân viên
router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) return res.status(404).send('Employee not found');
        res.send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Xóa nhân viên
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');
        res.send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
