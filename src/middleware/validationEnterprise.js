const { request } = require("express");
const { check, oneOf, validationResult } = require("express-validator");
const user=require("../models/User");

class ValidationUser
{
    
    
    async checkValidenterprise(req,res,next)
    {
        await check('TenDoanhNghiep').isLength({ min: 1 }).withMessage("Name enterprise is not empty")
        .run(req);
        await check('MST').isLength({ min: 1 }).withMessage("Identification is not empty")
        .run(req);
        await check('SdtDN').isLength({ min: 1 }).withMessage("Phone number is not empty")
        .run(req);
        await check('NguoiDaiDien').isLength({ min: 1 }).withMessage("Representative is not empty")
        .run(req);
        // await check('Loaimathang').isLength({ min: 1 }).withMessage("Caterogry goods are not empty")
        // .run(req);
        await check('DiaChiDN').isLength({ min: 1 }).withMessage("Place is not empty")
        .run(req);
        await check('EmailDN').isEmail().withMessage('must be email').isLength({ min: 1 }).withMessage("Email is not empty")
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