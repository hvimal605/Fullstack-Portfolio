const message = require("../models/message");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary');
const mailSender = require("../utils/mailSender");



exports.register = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.json({
                message: "Avatar is required !"
            });
        }
        const { avatar, resume } = req.files;

        const {
            fullName,
            email,
            phone,
            aboutMe,
            password,
            portfolioURL,
            githubURL,
            instagramURL,
            twitterURL,
            facebookURL,
            linkedInURL,
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        //POSTING AVATAR
        const image = await uploadImageToCloudinary(
            avatar,
            process.env.FOLDER_NAME,
            1000,
            1000
        )



        //POSTING RESUME
        const Resume = await uploadImageToCloudinary(
            resume,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            fullName,
            email,
            phone,
            aboutMe,
            password: hashedPassword,
            portfolioURL,
            githubURL,
            instagramURL,
            twitterURL,
            facebookURL,
            linkedInURL,
            avatar: {
                public_id: image.public_id,
                url: image.secure_url,
            },
            resume: {
                public_id: Resume.public_id,
                url: Resume.secure_url,
            },

        });
        return res.status(200).json({
            success: true,
            message: "user is registered successfully",
            user,

        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered .please try again"
        })


    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",

            })
        }

        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered , please signup first"
            })
        }
        //generate JWT ,after password matching
        if (await bcrypt.compare(password, user.password)) {
          
            const payload = {
                email: user.email,
                id: user._id,

            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '10d'
            })
            user.token = token;
            user.password = undefined;


            //create cookie and send response
            const Options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite:"None",
                secure:true
            }

            res.cookie("token", token, Options).status(200).json({
                success: true,
                token,
                user,
                message: 'logged in successfully',
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }



    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Faliure ,Please try again',
        })
    }

}


exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite:"None",
            secure:true
        }).json({
            success: true,
            message: "Logged Out successfully"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Logout Faliure ,Please try again',
        })


    }
}


exports.user = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            user
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'error in fetching my Profile',

        })

    }
}

exports.updateuser = async (req, res) => {
    try {

        const newUserData = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            aboutMe: req.body.aboutMe,
            githubURL: req.body.githubURL,
            instagramURL: req.body.instagramURL,
            portfolioURL: req.body.portfolioURL,
            facebookURL: req.body.facebookURL,
            twitterURL: req.body.twitterURL,
            linkedInURL: req.body.linkedInURL,
        };
        if (req.files && req.files.avatar) {
            const avatar = req.files.avatar;
            const user = await User.findById(req.user.id);
            const profileImageId = user.avatar.public_id;
            await cloudinary.uploader.destroy(profileImageId);
            const newProfileImage = await uploadImageToCloudinary(
                avatar,
                process.env.FOLDER_NAME,
                1000,
                1000

            );
            newUserData.avatar = {
                public_id: newProfileImage.public_id,
                url: newProfileImage.secure_url,
            };
        }

        if (req.files && req.files.resume) {
            const resume = req.files.resume;
            const user = await User.findById(req.user.id);
            const resumeFileId = user.resume.public_id;
            if (resumeFileId) {
                await cloudinary.uploader.destroy(resumeFileId);
            }
            const newResume = await uploadImageToCloudinary(
                resume,
                process.env.FOLDER_NAME,
                1000,
                1000

            );
            newUserData.resume = {
                public_id: newResume.public_id,
                url: newResume.secure_url,
            };



        }
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Profile Updated!",
            user,
        });


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'error in update Profile',

        })


    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const user = await User.findById(req.user.id).select("+password");
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "please fill all the details"
            })
        }
        const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "incorrect password"
            });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(401).json({
                message: "New Password And Confirm New Password Do Not Match!"
            })


        }
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Password Updated!",
            updatedUserDetails
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'error in update Password',

        })

    }
};

exports.getUserForPortfolio = async (req, res) => {
    try {
        const id = Object('66813fd3428b504b50a6e749')
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'error in getUserForPortfolio',

        })

    }


}

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "your email is not registered with us"
            });
        }

        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true })
        //create url
        const url = `http://localhost:5173/password/reset/${token}`
        //send mail conataining the url
        await mailSender(email, 'Password Reset Link', `Password Reset Link : ${url}`)

        //return response
        return res.json({
            success: true,
            message: 'Email  sent successfully , please check email and change password'
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went wrong while reset Password'
        })

    }





}

//reset password

exports.resetPassword = async (req, res) => {
    try {

        const { password, confirmPassword } = req.body;
        const { token } = req.params;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password not matching'
            });
        }
        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'Token is invalid',
            })
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: 'Token in expired ,please regenerate your token'

            });


        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ token: token },
            { password: hashedPassword },
            { new: true },)

        

       return res.status(200).json({
            success: true,
            message: 'Password reset Successful'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went wrong while reset Password'
        })


    }
}