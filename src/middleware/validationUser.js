const { request } = require("express");
const { check, oneOf, validationResult } = require("express-validator");
const user=require("../models/User");

class ValidationUser
{
    
    
    async checkValidUser(req,res,next)
    {
        await check('TenKH').isLength({ min: 1 }).withMessage("Name customer is not empty")
        .run(req);
        await check('CMND').isLength({ min: 1 }).withMessage("Identification is not empty")
        .run(req);
        await check('DiaChiKH').isLength({ min: 1 }).withMessage("Place is not empty")
        .run(req);
        await check('Email').isEmail().withMessage('must be email').isLength({ min: 1 }).withMessage("Email is not empty")
        .run(req);
        await check('MatKhau').isLength({ min: 6 })
        .withMessage('must be at least 5 chart long')
        .matches(/\d\w\W/)
        .withMessage('must be 1 number 1 word, 1 special character')
        .run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }
      
        next();
}
}

module.exports=new ValidationUser();