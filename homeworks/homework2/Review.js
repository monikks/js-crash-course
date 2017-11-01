module.exports = class Review{
    constructor(rating, comment, customer = "Anonymous"){
        this.customer = customer;
        this.rating = rating;
        this.comment = comment
    }

} 