import Book from "../models/Book.js";

export async function getBooks( req, res, next){
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send({message:'Failed to get books'})
    }
}

export async function createBook( req, res, next ){
    try {
        await Book.create(res.body);
        console.log(res.body);
        res.status(201).send({status:"success"})
    } catch (error) {
        res.status(500).send({message:"Failed to create book"})
    }
}

export async function showBook( req, res, next ){
    try {
        res.status(200).send(res.book);
    } catch (error) {
        res.status(500).send({message:"Failed to get book"})
    }
}

export async function updateBook( req, res, next ){
    try {
        await res.book.updateOne(req.body);
        res.status(200).send({"message":"Book updated"})
    } catch (error) {
        res.status(500).send({"message":"Failed to update book"})
    }
}

export async function deleteBook( req, res, next ){
    try {
        await res.book.deleteOne()
        res.status(200).send({"status":"success"});
    } catch (error) {
        res.status(500).send({"message":"Failed to delete book"})
    }
}

export async function getBookById( req, res, next ){

    try {
        let id = req.params.id;
        let book = await Book.findById(id);

        if( book === null ){
            return res.status(404).send({ message : "Book not found "})
        }

        res.book = book;
        return next();

    } catch (error) {
        return res.status(500).send({ message : 'Server Error. Please retry'})
    }
}


