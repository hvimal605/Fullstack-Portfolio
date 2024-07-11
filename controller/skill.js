const message = require('../models/message');
const Skill = require('../models/skill');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const cloudinary = require("cloudinary")

exports.addSkill = async (req, res) => {
    try {
        if (!req.files || !req.files.svg) {
            return res.status(400).json({
                success: false,
                message: "SVG is required!"
            });
        }

        const { svg } = req.files;
        const { title, proficiency } = req.body;

        if (!title || !proficiency) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details !"
            });
        }

        const image = await uploadImageToCloudinary(
            svg,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const SkillRes = await Skill.create({
            title,
            proficiency,
            svg: {
                public_id: image.public_id,
                url: image.secure_url,
            },
        });

        res.status(201).json({
            success: true,
            message: "New Skill Added!",
            SkillRes,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while adding a Skill'
        });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        let skillRes = await Skill.findById(id);
        if (!skillRes) {
            return res.status(400).json({
                success: false,
                message: "aleredy delete or not exist"
            });
        }
        const skillSvgId = skillRes.svg.public_id;
        await cloudinary.uploader.destroy(skillSvgId);
        await skillRes.deleteOne();
        res.status(200).json({
            success: true,
            message: "Skill Deleted!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while delteing skill'
        });

    }
}

exports.updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        let skill = await Skill.findById(id);
        if (!skill) {
            return res.status(400).json({
                success:false,
                message:"skill not found"
            });
        }
        const { proficiency } = req.body;
        skill = await Skill.findByIdAndUpdate(
            id,
            { proficiency },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
        res.status(200).json({
            success: true,
            message: "Skill Updated!",
            skill,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating skill'
        });
    }

  };

exports.getAllSkill = async(req,res)=>{
    try{
        const skills = await Skill.find();
        res.status(200).json({
          success: true,
          skills,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getting all skill'
        });

    }
}