import { Request, Response } from "express";
import * as TourService from "./tour.service";

export const createTour = async (req: any, res: Response) => {
  const tour = await TourService.createTour(req.user.id, req.body);
  res.status(201).json(tour);
};

export const updateTour = async (req: any, res: Response) => {
  const tour = await TourService.updateTour(
    req.params.id,
    req.user.id,
    req.body
  );
  res.json(tour);
};

export const deactivateTour = async (req: any, res: Response) => {
  const tour = await TourService.deactivateTour(req.params.id, req.user.id);
  res.json(tour);
};

export const getTours = async (req: Request, res: Response) => {
  const result = await TourService.getTours(req.query);
  res.json(result);
};

export const getTourById = async (req: Request, res: Response) => {
  const tour = await TourService.getTourById(req.params.id);
  res.json(tour);
};
