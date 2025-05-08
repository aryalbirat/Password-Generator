import Password from '../models/Password.js';

// @desc    Create new password
// @route   POST /api/passwords
// @access  Private
export const createPassword = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Create password
    const password = await Password.create(req.body);

    // Remove actual password from response for security reasons
    // But include decrypted password for immediate use
    const decryptedPassword = password.getDecryptedPassword();
    
    res.status(201).json({
      success: true,
      data: {
        ...password.toObject(),
        decryptedPassword
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all passwords for user
// @route   GET /api/passwords
// @access  Private
export const getPasswords = async (req, res, next) => {
  try {
    const passwords = await Password.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: passwords.length,
      data: passwords
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single password
// @route   GET /api/passwords/:id
// @access  Private
export const getPassword = async (req, res, next) => {
  try {
    const password = await Password.findById(req.params.id);

    if (!password) {
      return res.status(404).json({
        success: false,
        message: 'Password not found'
      });
    }

    // Check ownership
    if (password.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this password'
      });
    }

    // Update last accessed time
    await password.updateLastAccessed();

    // Get decrypted password
    const decryptedPassword = password.getDecryptedPassword();

    res.status(200).json({
      success: true,
      data: {
        ...password.toObject(),
        decryptedPassword
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/passwords/:id
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    let password = await Password.findById(req.params.id);

    if (!password) {
      return res.status(404).json({
        success: false,
        message: 'Password not found'
      });
    }

    // Check ownership
    if (password.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this password'
      });
    }

    // Update password
    password = await Password.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    // Get decrypted password for immediate use
    const decryptedPassword = password.getDecryptedPassword();

    res.status(200).json({
      success: true,
      data: {
        ...password.toObject(),
        decryptedPassword
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete password
// @route   DELETE /api/passwords/:id
// @access  Private
export const deletePassword = async (req, res, next) => {
  try {
    const password = await Password.findById(req.params.id);

    if (!password) {
      return res.status(404).json({
        success: false,
        message: 'Password not found'
      });
    }

    // Check ownership
    if (password.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this password'
      });
    }

    await password.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
