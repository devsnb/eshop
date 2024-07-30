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

function fileFilter(
	req: Request,
	file: Express.Multer.File,
	callback: multer.FileFilterCallback
) {
	const filetypes = /jpe?g|png|webp/
	const mimetypes = /image\/jpe?g|image\/png|image\/webp/

	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

	const mimetype = mimetypes.test(file.mimetype)

	if (extname && mimetype) {
		return callback(null, true)
	} else {
		callback(new Error('Only Image!'))
	}
}

const upload = multer({
	storage,
	fileFilter: fileFilter
})

const uploadSingleImage = upload.single('image')

const uploadRouter = express.Router()

uploadRouter.post('/', (req, res) => {
	uploadSingleImage(req, res, function (err) {
		if (err) {
			res.status(400).send({ message: err.message })
		}

		res.status(200).send({
			message: 'Image uploaded successfully',
			image: `/${req.file?.path}`
		})
	})
})

export default uploadRouter
