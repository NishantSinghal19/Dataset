
const { readDataset, writeDataset } = require('../database/utils');

function addRecord(req, res) {
  const newRecord = req.body;
  const dataset = readDataset();
  dataset.push(newRecord);
  writeDataset(dataset);
  res.status(201).json({ message: 'Record added successfully' });
}

function deleteRecord(req, res) {
  const nameToDelete = req.params.name;
  const dataset = readDataset();
  const updatedDataset = dataset.filter(record => record.name !== nameToDelete);
  writeDataset(updatedDataset);
  res.json({ message: 'Record deleted successfully' });
}

function getSummarySalary(req, res) {
    const dataset = readDataset();
    const salaries = dataset.map(record => parseFloat(record.salary));
    const mean = salaries.reduce((acc, salary) => acc + salary, 0) / salaries.length;
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    res.json({ mean, min, max });
  }
  

  function getContractSummarySalary(req, res) {
    const dataset = readDataset();
    const contractSalaries = dataset
      .filter(record => record.on_contract === "true")
      .map(record => parseFloat(record.salary));
  
    if (contractSalaries.length === 0) {
      return res.json({ message: 'No contract records found' });
    }
  
    const mean = contractSalaries.reduce((acc, salary) => acc + salary, 0) / contractSalaries.length;
    const min = Math.min(...contractSalaries);
    const max = Math.max(...contractSalaries);
    res.json({ mean, min, max });
  }

function getDepartmentSummarySalary(req, res) {
    const dataset = readDataset();
    const departmentStats = {};
  
    dataset.forEach(record => {
      const department = record.department;
      const salary = parseFloat(record.salary);
  
      if (!departmentStats[department]) {
        departmentStats[department] = [];
      }
  
      departmentStats[department].push(salary);
    });
  
    const departmentSummaries = {};
    for (const department in departmentStats) {
      const salaries = departmentStats[department];
      const mean = salaries.reduce((acc, salary) => acc + salary, 0) / salaries.length;
      const min = Math.min(...salaries);
      const max = Math.max(...salaries);
      departmentSummaries[department] = { mean, min, max };
    }
  
    res.json(departmentSummaries);
  }
  function getNestedSalarySummaryStatistics(req, res) {
    const dataset = readDataset();
    const departmentStats = {};
  
    dataset.forEach(record => {
      const department = record.department;
      const subDepartment = record.sub_department;
      const salary = parseFloat(record.salary.replace(/[^0-9.-]+/g, '')); // Remove non-numeric characters and treat salary as a number
  
      if (!departmentStats[department]) {
        departmentStats[department] = {};
      }
  
      if (!departmentStats[department][subDepartment]) {
        departmentStats[department][subDepartment] = [];
      }
  
      departmentStats[department][subDepartment].push(salary);
    });
  
    const departmentSummaries = {};
  
    for (const department in departmentStats) {
      departmentSummaries[department] = {};
      for (const subDepartment in departmentStats[department]) {
        const salaries = departmentStats[department][subDepartment];
        const mean = salaries.reduce((acc, salary) => acc + salary, 0) / salaries.length;
        const min = Math.min(...salaries);
        const max = Math.max(...salaries);
        departmentSummaries[department][subDepartment] = { mean, min, max };
      }
    }
  
    res.json(departmentSummaries);
  }
  
  
  module.exports = {
    addRecord,
    deleteRecord,
    getSummarySalary,
    getContractSummarySalary,
    getDepartmentSummarySalary,
    getNestedSalarySummaryStatistics
  };