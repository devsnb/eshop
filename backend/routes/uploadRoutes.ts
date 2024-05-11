import path from 'node:path'
import express, { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, 'uploads/')
	},
	filename(req, file, callback) {
		callback(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	}
})

function checkFileType(
	req: Request,
	file: Express.Multer.File,
	callback: multer.FileFilterCallback
) {
	const filetypes = /jpg|jpeg|png|webp/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)
	if (extname && mimetype) {
		return callback(null, true)
	} else {
		callback(new Error('Only Image!'))
	}
}

const upload = multer({
	storage,
	fileFilter: checkFileType
})

const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {
	res.send({
		message: 'Image Uploaded',
		image: `/${req.file?.path}`
	})
})

export default router
