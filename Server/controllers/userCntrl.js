import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating User");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User Registration Successful",
      user: user,
    });
  } else res.status(201).send({ message: "User already exists" });
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: "Already booked" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: {
            push: { id, date },
          },
        },
      });
    }
    res.send("Visit booked");
  } catch (err) {
    throw new Error(err.message);
  }
});

// To get all bookings for a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// To cancel booking for a user
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1){
      res.status(400).send("Visit not booked");
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: { bookedVisits: user.bookedVisits },
      });
    }
    res.send("Booking Cancelled Successfully");
  } catch (err) {
    throw new Error(err.message);
  }
});

// To add favourite for a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user.favResidencesID.includes(rid)){
      const updateUser = await prisma.user.update({
        where: { email },
        data: { favResidencesID: { set: user.favResidencesID.filter((id) => id !== rid) } },
      });
      res.send({message: "Removed from favourites", user: updateUser});
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: { favResidencesID: { push: rid } },
      });
      res.send({message: "Added to favourites",  user: updateUser});
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// To get all favourites for a user
export const allFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidencesID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});