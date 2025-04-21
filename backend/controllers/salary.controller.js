const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllSalaries = async (req, res) => {
  const salaries = await prisma.employeeSalary.findMany({
    include: { employee: true },
  });
  res.json(salaries);
};

exports.createSalary = async (req, res) => {
  const data = req.body;
  const newSalary = await prisma.employeeSalary.create({ data });
  res.json(newSalary);
};

exports.updateSalary = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updated = await prisma.employeeSalary.update({
    where: { id: parseInt(id) },
    data,
  });
  res.json(updated);
};

exports.deleteSalary = async (req, res) => {
  const { id } = req.params;
  const deleted = await prisma.employeeSalary.delete({
    where: { id: parseInt(id) },
  });
  res.json(deleted);
};
