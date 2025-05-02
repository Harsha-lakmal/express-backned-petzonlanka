const Vlog = require("../model/vlogModel.js");

const addVlog = async (req, res, next) => {
  try {
    const { desc, VlogerName } = req.body;

    if (!desc || !VlogerName) {
      return res.status(400).json({
        error: "All feild Not & Try Agian ",
      });
    }

    const newVlog = new Vlog({
      desc,
      VlogerName,
    });

    await newVlog, save();

    res.status(200).json({
      message: "Vlog is saved",
    });
  } catch (error) {
    res.status(500).json({
      error: "error not saved",
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

exports.addVlog = addVlog;
exports.updateVlog = updateVlog;
exports.deleteVlog = deleteVlog;
exports.getVlogs = getVlogs;
