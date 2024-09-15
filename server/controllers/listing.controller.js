import Listing from "../models/listing.model.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

// Get all listings of a user
export const getUserListings = async (req, res, next) => {
  try {
    if (req.user && req.user.id === req.params.id) {
      const listings = await Listing.find({ userRef: req.params.id });
      return res.status(200).json(listings);
    } else {
      return next(errorHandler(401, "You can only view your own listings!"));
    }
  } catch (error) {
    return next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById({_id:req.params.id});
  if (!listing) {
    return next(errorHandler(404, 'Listing not foundddddddddddd!'));
  }
  if (req.user.id !== listing.userRef.toString()) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete({_id:req.params.id});
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};
