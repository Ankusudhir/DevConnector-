import multer from 'multer'



import { v4 as uuidv4 } from 'uuid';

const MINE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}
const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination : (req,file,cb) => {
      cb(null, '../frontend/public/images')
    },
    filename: (req,file,cb) => {
      const ext = MINE_TYPE_MAP[file.mimetype]
      //var  num = Math.floor(Math.random() * 10) + 1
      cb(null,uuid() + '.' + ext)
    }
  }),
  fileFilter: (req,file,cb) => {

    const isValid  = !!MINE_TYPE_MAP[file.mimetype]

    let error = isValid ? null : new Error('Invalid mime type')

    cb(error,isValid);
  }
})


export default fileUpload