module.exports = class Reservation{
    constructor(customer, datetime){
        this.customer = customer;
        this.datetime = datetime;
        this.completed = false
    }
    setCompleted(){this.completed = true;}
}