const bookModel = require("../models/booksModel")
// const reviewModel = require("../model/reviewModel")

const createBook = async (req, res) => {
    try {
        const {title , ISBN} = req.body
        const checkEmail=await bookModel.findOne({title:title})
        if(checkEmail) return res.status(400).send({msg :"Title Already Exist !"})

        const checkEMobile=await bookModel.findOne({ISBN:ISBN})
        if(checkEMobile) return res.status(400).send({msg :"ISBN Should be Unique !"})

        const result = await bookModel.create(req.body)
        res.status(201).send({ status: true, message: 'Success', data: result })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// const getBook = async (req, res) => {
//     try {
//         let data = req.query
//         data.isDeleted = false
//         let result = await bookModel.find(data).select({ ISBN: 0, subcategory: 0, deletedAt: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v:0 }).sort({title:1})
//         res.status(200).send({ status: true, message: 'Success', data: result })
//     } catch (err) {
//         res.status(500).send({ status: false, message: err.message })
//     }
// }


// const getBookById = async (req, res) => {
//     try {
//         let bookId = req.params.bookId;
//         let bookData = await bookModel.findById({_id : bookId}).lean()
//         //isDle true error
//         let reviewsData = await reviewModel.find({ bookId: bookId, isDeleted: false })
//         bookData.reviewsData = reviewsData
//         res.status(200).send({ status: true, message: 'Success', data: bookData })

//     } catch (err) {
//         res.status(500).send({ status: false, message: err.message })
//     }
// }


// const updateBook = async (req, res) => {
//     try {
//         let bookId = req.params.bookId;
//         let data = req.body;
//         let result = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: data }, { new: true })
//         res.status(200).send({ status: true, message: 'Success', data: result })
//     } catch (err) {
//         res.status(500).send({ status: false, message: err.message })
//     }
// }

// const deleteBook = async (req, res) => {
//     try {
//         let bookId = req.params.bookId;
//         let bookData = await bookModel.findById(bookId)
//         //already check delted or not
//         await bookModel.findByIdAndUpdate(bookId, { $set: { isDeleted: true, deletedAt: Date.now() } })
//         res.status(200).send({ status: true, message: "Deleted" })
//     } catch (err) {
//         res.status(500).send({ status: false, message: err.message })
//     }
// }
module.exports = { createBook}