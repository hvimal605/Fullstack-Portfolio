const Project = require("../models/project");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require('cloudinary')

exports.addNewProject = async (req, res) => {
    try {
        // Check if the project banner image is included in the request
        if (!req.files || !req.files.projectBanner) {
            return res.status(400).json({
                success: false,
                message: "Project Banner Image Required!"
            });
        }

        const { projectBanner } = req.files;
        const {
            title,
            description,
            gitRepoLink,
            projectLink,
            stack,
            technologies,
            deployed,
        } = req.body;

        // Check if all required fields are provided
        if (
            !title ||
            !description ||
            !gitRepoLink ||
            !projectLink ||
            !stack ||
            !technologies ||
            !deployed
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details!"
            });
        }

        // Upload the project banner image to Cloudinary
        const image = await uploadImageToCloudinary(
            projectBanner,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        // Create a new project with the provided details
        const project = await Project.create({
            title,
            description,
            gitRepoLink,
            projectLink,
            stack,
            technologies,
            deployed,
            projectBanner: {
                public_id: image.public_id,
                url: image.secure_url,
            },
        });

        // Send a success response with the newly created project
        res.status(201).json({
            success: true,
            message: "New Project Added!",
            project,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while adding a Project'
        });
    }
};


exports.upadteProject = async (req, res) => {
    try {
        const newProjectData = {
            title: req.body.title,
            description: req.body.description,
            stack: req.body.stack,
            technologies: req.body.technologies,
            deployed: req.body.deployed,
            projectLink: req.body.projectLink,
            gitRepoLink: req.body.gitRepoLink,
        };
        if (req.files && req.files.projectBanner) {
            const projectBanner = req.files.projectBanner;
            const project = await Project.findById(req.params.id);
            const projectImageId = project.projectBanner.public_id;
            await cloudinary.uploader.destroy(projectImageId);
            const newProjectImage = await uploadImageToCloudinary(
                projectBanner,
                process.env.FOLDER_NAME,
                1000,
                1000
            );
            newProjectData.projectBanner = {
                public_id: newProjectImage.public_id,
                url: newProjectImage.secure_url,
            };
        }
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            newProjectData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
        res.status(200).json({
            success: true,
            message: "Project Updated!",
            project,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while update a Project'
        });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(402).josn({
                success: false,
                message: "Already Deleted!"
            })
        }
        const projectImageId = project.projectBanner.public_id;
        await cloudinary.uploader.destroy(projectImageId);
        await project.deleteOne();
        res.status(200).json({
            success: true,
            message: "Project Deleted!",
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while delete a Project'
        });
    }
};


exports.getAllProject = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            success: true,
            projects,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getAll  Project'
        });
    }
};


exports.getSingleProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        res.status(200).json({
            success: true,
            project,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getAll  Project'
        });
    }
};