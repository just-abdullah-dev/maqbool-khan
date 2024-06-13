import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Gallery from "@/models/gallery";
import fileRemover from "@/utils/fileRemover";
import resError from "@/utils/resError";
import uploadFiles from "@/utils/uploadFiles";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params; 
    const data = await Gallery.find({ professorId: id });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return resError(error?.message);
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }

    const { id } = params;
    const formData = await req.formData();
    let body = formData.getAll("body")[0];
    body = JSON.parse(body);
    let { name, slug } = body;
    if (!name || !slug) {
      return resError("Please fill all fields.");
    }
    const uploadedFiles = await uploadFiles(formData);

    const gallery = await Gallery.create({
      countryName: name,
      slug,
      professorId: id,
      images: uploadedFiles,
    });

    return NextResponse.json(
      {
        success: true,
        message: `${gallery?.countryName} has been added.`,
        data: gallery,
      },
      { status: 201 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }

    const { id } = params;
    const formData = await req.formData();

    let body = formData.getAll("body")[0] ? formData.getAll("body")[0] : {};
    body = JSON.parse(body);
    let { name, slug, deletingImages } = body;

    const uploadedFiles = await uploadFiles(formData);

    let gallery = await Gallery.findOne({ _id: id });
    if (!gallery) {
      return resError(`${id} not found in database.`);
    }
    gallery.countryName = name || gallery.countryName;
    gallery.slug = slug || gallery.slug;

    if (uploadedFiles.length > 0) {
      gallery.images = gallery.images.concat(uploadedFiles);
    }

    //Now deleting Images on demand
    if (deletingImages) {
      if (deletingImages.length > 0) {
        deletingImages.map((image) => {
          fileRemover(image);
        });
      }
      gallery.images = gallery.images.filter(
        (item) => !deletingImages.includes(item)
      );
    }

    const updatedGallery = await gallery.save();

    return NextResponse.json(
      {
        success: true,
        message: `${updatedGallery?.countryName} has been updated.`,
        data: updatedGallery,
      },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }
    const { id } = params;
    const data = await Gallery.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    if (data.images.length > 0) {
      data.images.map((image) => {
        fileRemover(image);
      });
    }
    return NextResponse.json(
      {
        success: true,
        message: `${data?.countryName} gallery has been deleted.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
