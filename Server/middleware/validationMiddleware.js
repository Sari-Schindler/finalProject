import {body, validationResult } from 'express-validator';

const validateUserData = [
    //body('name').isLength({ max: 45 }).withMessage('Name must be at most 45 characters'),
    body('username').isLength({ max: 64 }).withMessage('Username must be at most 64 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    //body('address').isObject().withMessage('Address must be an object'),
    //body('address.street').exists().withMessage('Street is required'),
    //body('address.city').exists().withMessage('City is required'),
    //body('address.zipcode').exists().withMessage('Zipcode is required'),
    //body('phone').matches(/^(?:0(?!([57]))(?:[23489] ?(?:\d ?){7}|\d ?(?:\d ?){7})|0([57])\d ?(?:\d ?){7}|(?:\+972|972|0)(?:\d ?(?:\d ?){7}|\d ?(?:\d ?){8}))$/).withMessage('Invalid phone number')
];

const validatePostData = [
    body('title').isLength({ max: 45 }).withMessage('Title must be at most 45 characters'),
    body('body').isLength({ max: 280 }).withMessage('Body must be at most 280 characters')
];

// const validateAlbumData = [
    
// ];

const validateTodoData = [
    body('title').isLength({ max: 45 }).withMessage('Title must be at most 45 characters'),
    body('completed').isBoolean().withMessage('Completed nust be boolean')
];


const validateCommentData = [
    body('name').isLength({ max: 45 }).withMessage('Name must be at most 45 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('body').isLength({ max: 280 }).withMessage('Body must be at most 280 characters')
];

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


export { validateUserData, validateTodoData, validatePostData, validateCommentData,validate };
