import { Types } from "mongoose";
import { Tour } from "../../models/tour.model";

export const createTour = async (guideId: string, payload: any) => {
  return Tour.create({
    ...payload,
    guide: guideId,
  });
};

export const updateTour = async (
  tourId: string,
  guideId: string,
  payload: any
) => {
  const tour = await Tour.findOneAndUpdate(
    { _id: tourId, guide: guideId },
    payload,
    { new: true }
  );

  if (!tour) throw new Error("Tour not found or unauthorized");
  return tour;
};

export const deactivateTour = async (tourId: string, guideId: string) => {
  const tour = await Tour.findOneAndUpdate(
    { _id: tourId, guide: guideId },
    { isActive: false },
    { new: true }
  );

  if (!tour) throw new Error("Tour not found or unauthorized");
  return tour;
};

export const getTours = async (query: any) => {
  const {
    city,
    category,
    language,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = query;

  const filter: any = { isActive: true };

  if (city) filter.city = city;
  if (category) filter.category = category;
  if (language) filter.languages = language;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const tours = await Tour.find(filter)
    .populate("guide", "name rating languages")
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Tour.countDocuments(filter);

  return {
    data: tours,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
    },
  };
};

export const getTourById = async (id: string) => {
  const tour = await Tour.findById(id).populate(
    "guide",
    "name bio rating languages"
  );

  if (!tour || !tour.isActive) {
    throw new Error("Tour not found");
  }

  return tour;
};
