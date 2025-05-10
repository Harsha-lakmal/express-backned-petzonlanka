const Vlog = require("../model/vlogModel.js");

const addVlog = async (req, res) => {
  try {
    const { desc, VlogerName } = req.body;

    if (!desc || !VlogerName) {
      return res.status(400).json({
        error: "All fields are required. Please try again.",
      });
    }

    const newVlog = new Vlog({
      desc,
      VlogerName,
    });

    const savedVlog = await newVlog.save();

    res.status(200).json({
      message: "Vlog is saved successfully.",
      vlogId: savedVlog.vlogId, // returning the newly created vlog's ID
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to save vlog.",
    });
  }
};



const updateVlog = async (req, res, next) => {
  try {
    const { vlogId, desc, VlogerName } = req.body;

    if (!vlogId) {
      res.status(400).json({
        error: "vlog is not found % Trt aagin latter ",
      });
    }

    const result = await Vlog.updateOne(
      { vlogId: vlogId },
      { $set: { desc, VlogerName } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Vlog is not found ",
      });
    }

    res.status(200).json({
      message: "Vlog update succesfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "error ",
    });
  }
};

const deleteVlog = async (req, res, next) => {
  try {
    const { vlogId } = req.body;

    if (!vlogId) {
      return res.status(404).json({
        error: "Vlog id is not fonud & Try Again latter ",
      });
    }

    const result = await Vlog.deleteOne({ vlogId: vlogId });

    if (result.deletedCount === 0) {
      return res.status(400).json({
        error: "Vlog is not found ",
      });
    }

    res.status(200).json({
      message: "Vlog delete SuccesFully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Not Delete Vlog ",
    });
  }
};

const getVlogs = async (req, res, next) => {
  try {
    const vlogs = await Vlog.find();

    res.status(200).json({
      message: "Vlogs : ",
      vlog: vlogs,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error ",
    });
  }
};


  
const uploadImage = async (req, res) => {
  try {
    const vlogId = req.params.vlogId;
    console.log("vlog id:", vlogId);

    if (!vlogId) {
      return res.status(400).json({ error: "Vlog ID is required" });
    }

    const vlog = await Vlog.findOne({ vlogId: Number(vlogId) });

    if (!vlog) {
      return res.status(404).json({ error: "Vlog not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    vlog.img = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await vlog.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Server error" });
  }
};


  
const getImage = async (req, res) => {
  try {
    const vlogId = req.params.vlogId;
    console.log("Fetching image for vlog id:", vlogId);

    if (!vlogId) {
      return res.status(400).json({ error: "Vlog ID is required" });
    }

    const vlog = await Vlog.findOne({ vlogId: Number(vlogId) });

    if (!vlog || !vlog.img || !vlog.img.data) {
      return res.status(404).json({ error: "Image not found for this vlog" });
    }

    res.set("Content-Type", vlog.img.contentType);
    res.send(vlog.img.data);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ error: "Server error" });
  }
};




exports.addVlog = addVlog;
exports.updateVlog = updateVlog;
exports.deleteVlog = deleteVlog;
exports.getVlogs = getVlogs;
exports.getImage  =  getImage  ; 
exports.uploadImage  =  uploadImage  ; 
