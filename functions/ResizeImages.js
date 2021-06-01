const { firestore } = require('firebase-admin');
const path = require('path');
const sharp = require('sharp');
const admin = require('./admin');

const supportedContentTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


const extractFileNameWithoutExtension = (filePath, ext) => path.basename(filePath, ext);


const ResizeImages = async (object) => {

  if (!object.contentType) {
    return;
  }
  if (!supportedContentTypes.includes(object.contentType)) {
    return;
  }
  if (object.metadata && object.metadata.resizedImage) {
    return;
  }
  if (!object.name) {
    return;
  }

  const bucket = admin.storage().bucket(object.bucket);
  const firestore = admin.firestore()
  const filePath = object.name;
  const dirName = path.dirname(filePath);

  const fileExtension = path.extname(filePath);
  const fileNameWithoutExtension = extractFileNameWithoutExtension(
    filePath,
    fileExtension
  );
  const resizeJobs = [];
  const metadata = getMetaData(object);

  const uploadFileName = `${fileNameWithoutExtension}-thumbnail.jpg`;
  const uploadFilePath = path.join(dirName, uploadFileName);
  console.log(`Writing ${uploadFileName} to Bucket at path ${uploadFilePath}`);

  const uploadStream = bucket.file(uploadFilePath).createWriteStream({ metadata });
  const pipeline = sharp();
  pipeline.rotate().resize(400, 400).toFormat("jpeg").pipe(uploadStream);
  bucket.file(filePath).createReadStream().pipe(pipeline);
  
  const uploadJob = new Promise((resolve, reject) => {
    uploadStream.on('finish', resolve).on('error', reject);
  });

  resizeJobs.push(uploadJob);
  
  try {
    await Promise.all(resizeJobs);
    console.log("All uploads completed");
    
  } catch (err) {
    console.log(`Upload failed with error ${err}`)
  } 

  console.log(filePath)
  const metadataDoc = await firestore.collection("social-feed").where("image", "==", filePath).get();
  if (metadataDoc.size > 1) {
    console.log(`More than one doc matches ${filePath}`)
  }

  const doc = metadataDoc.docs[0];
  doc.ref.set({
    thumbnailImage: uploadFilePath
  }, { merge: true })

  return;
}



const getMetaData = (objectMetadata) => {
  const metadata = {
    contentDisposition: objectMetadata.contentDisposition,
    contentEncoding: objectMetadata.contentEncoding,
    contentLanguage: objectMetadata.contentLanguage,
    contentType: "image/jpeg",
    metadata: objectMetadata.metadata || {},
  };
  metadata.metadata.resizedImage = true;
  metadata.cacheControl = "max-age=86400";
  return metadata;
}

module.exports = ResizeImages;