const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllEmployees = async (req, res) => {
  const employees = await prisma.employee.findMany({
    include: { salaries: true },
  });
  res.json(employees);
};

exports.createEmployee = async (req, res) => {
  const data = req.body;
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        name: data.name,
        ssn: data.ssn,
        dob: new Date(data.dob),
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        joinDate: new Date(data.joinDate),
        exitDate: data.exitDate ? new Date(data.exitDate) : null,
      },
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Something went wrong!' });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.employee.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Delete failed' });
  }
};
