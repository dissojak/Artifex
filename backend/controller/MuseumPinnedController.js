const HttpError = require("../models/http-error");
const MuseumPinned = require("../models/museumPinned");

/**
 * @desc    Pins a museum to the user's profile for quick access in the future.
 * @route   POST /api/museum/pin
 * @params  museumId
 * @access  Private
 * @returns {Object} A success message indicating the museum has been pinned.
 */
exports.pinMuseum = async (req, res, next) => {
  const { museumId } = req.body;
  const userId = req.user._id;

  const existingPin = await MuseumPinned.findOne({
    museumId,
    userId,
  });
  if (existingPin) {
    return next(new HttpError("Museum is already pinned.", 422));
  }
  const newPin = new MuseumPinned({
    museumId,
    userId,
  });
  try {
    await newPin.save();
  } catch (err) {
    next(new HttpError("Pinning museum failed, please try again later.", 500));
  }
  res.status(200).json({ message: "Museum pinned successfully." });
};

/**
 * @desc    Removes a previously pinned museum from the user's profile.
 * @route   DELETE /api/museum/unpin
 * @params  museumId
 * @access  Private
 * @returns {Object} A success message indicating the museum has been unpinned.
 */
exports.unPinMuseum = async (req, res, next) => {
  const { museumId } = req.body;
  const userId = req.user._id;

  try {
    const pin = await MuseumPinned.findOneAndDelete({
      museumId,
      userId,
    });
    if (!pin) {
      return next(new HttpError("Museum not found, or was not pinned.", 404));
    }
  } catch (err) {
    next(
      new HttpError("Unpinning museum failed, please try again later.", 500)
    );
  }
  res.status(201).json({ message: "Museum unpinned successfully." });
};

/**
 * @desc    Fetches all museums pinned by the user.
 * @route   GET /api/museum/PinnedMuseums
 * @access  Private
 * @returns {Array} An array of objects containing details of pinned museums.
 */
exports.getPinnedMuseum = async (req, res, next) => {
  const userId = req.user._id;
  let pinnedMuseums;
  try {
    pinnedMuseums = await MuseumPinned.find({ userId }).populate(
      "museumId"
    );
  } catch (err) {
    next(
      new HttpError(
        "Fetching pinned museums failed, please try again later.",
        500
      )
    );
  }
  res.status(200).json({
    pinnedMuseums: pinnedMuseums.map((pin) => pin.toObject({ getters: true })),
  });
};
