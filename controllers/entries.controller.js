const db = require("../models");
const Entry = db.entries;
const Op = db.Sequelize.Op;

// Create and Save a new Entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.steps) {
    res.status(400).send({
      message: "Steps can not be empty!",
    });
    return;
  }

  // Create a Entry
  const entry = {
    steps: req.body.steps,
    firstNumber: req.body.num1,
    secondNumber: req.body.num2,
  };

  // Save Entry in the database
  Entry.create(entry)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Entry.",
      });
    });
};

// Retrieve all Entries from the database.
exports.findAll = (req, res) => {
  const steps = req.query.steps;
  var condition = steps ? { steps: { [Op.iLike]: `%${steps}%` } } : null;
  var perPageCnt = req.query.perpage ? req.query.perpage : 10;
  var offset = req.query.offset ? req.query.offset : 0;

  Entry.findAll({ where: condition, limit: perPageCnt, offset: offset })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving entries.",
      });
    });
};

// Find a single Entry with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Entry.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Entry with id=" + id,
      });
    });
};

// Update a Entry by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Entry.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entry was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Entry with id=${id}. Maybe Entry was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Entry with id=" + id
      });
    });
};

// Delete a Entry with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Entry.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entry was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Entry with id=${id}. Maybe Entry was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Entry with id=" + id
      });
    });
};

// Delete all Entries from the database.
exports.deleteAll = (req, res) => {
  Entry.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Entries were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all entries."
      });
    });
};

// Find all published Entries
exports.findAllPublished = (req, res) => {
  Entry.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving entries."
      });
    });
};

// Generate steps
exports.generateSteps = (req, res) => {
  const {num1, num2} = req.body;
  let carryString = '_';
  let sumString = '';
  let resultSteps = {};
  let carryValue = 0;

  // convert the numbers to arrays to work with individual digits
  const digits1 = num1.split('').reverse();
  const digits2 = num2.split('').reverse();

  const maxLength = Math.max(digits1.length, digits2.length);
  // add digits and update carry as needed
  for (let i = 0; i < maxLength; i++) {
    const digit1 = parseInt(digits1[i]) || 0;
    const digit2 = parseInt(digits2[i]) || 0;
    let sum = digit1 + digit2;
    if (carryValue) {
      sum += carryValue;
      carryValue = 0;
    }
    if (sum > 9) {
      carryValue = Math.floor(sum / 10);
      sumString = (sum % 10).toString() + sumString;
      carryString = carryValue.toString() + carryString;
    } else {
      sumString = sum.toString() + sumString;
      carryString = '0' + carryString;
    }
    resultSteps['step' + (i + 1)] = {
      carryString: carryString,
      sumString: sumString
    }
  }

  // add any remaining carry
  if (carryValue) {
    sumString = carryValue.toString() + sumString;
    resultSteps['step' + maxLength] = {
      carryString: carryString,
      sumString: sumString
    }
  }
  
  res.send(resultSteps);
}