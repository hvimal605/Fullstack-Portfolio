const Timeline = require("../models/timelineSchema")


exports.postTimeline = async (req, res) => {
    try {
      const { title, description, from, to } = req.body;
  
      
      if (!title || !description || !from || !to) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the details",
        });
      }
  
      const newTimeline = await Timeline.create({
        title,
        description,
        timeline: { from, to },
      });
  
      res.status(200).json({
        success: true,
        message: "Timeline Added!",
        newTimeline,
      });
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: "Something went wrong while adding the timeline",
      });
    }
  };
  

exports.deleteTimeline = async(req,res)=>{
    try{
        const { id } = req.params;
        let timeline = await Timeline.findById(id);
        if (!timeline) {
          return next(new ErrorHandler("Timeline not found", 404));
        }
        await timeline.deleteOne();
        res.status(200).json({
          success: true,
          message: "Timeline Deleted!",
        });
      
      
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went wrong while Delete the timeline '
        }) 
    }
}

exports.getAllTimeline = async(req,res)=>{
    try{
        const timelines = await Timeline.find();
        res.status(200).json({
          success: true,
          timelines,
        });
      
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went wrong while getAll the timeline '
        }) 
    }
}