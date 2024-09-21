exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users: 'All users here',
    },
  });
};
exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  if (!id) {
    return res
      .status(404)
      .json({ success: 'failed', message: 'Invalid user Id' });
  }

  res.status(200).json({
    success: 'success',
    data: {
      user: 'Singel user here',
    },
  });
};

exports.createUser = (req, res) => {
  res.status(201).json({
    success: 'Success',
    data: {
      tour: 'Newely created user here',
    },
  });
};
exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  if (!id) {
    res.status(404).json({ status: 'failed', message: 'Invalid user Id' });
  }
  res.status(200).json({
    success: 'success',
    data: {
      tour: '<updated> user here...',
    },
  });
};
exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  if (!id) {
    res.status(404).json({ status: 'failed', message: 'Invalid user Id' });
  }
  res.status(204).json({
    success: 'success',
    data: null,
  });
};
