const fs = require('fs');
const Review = require('./Review.js')
module.exports = class Customer{
    constructor(first_name, last_name, email){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }

    requestReservation(stylist, datetime){
        if(stylist.makeReservation(this, datetime))
            console.log("Reservation was made for "+this.first_name +" at " + stylist.name);
         else 
            console.log("Requested date and time are not available!");
          
    }
    writeFeedback(stylist, rating, comment){
        stylist.receiveFeedback(new Review(rating, comment, this))
    }

    //static writeToDatabase(customers_array, cb){
    //    fs.writeFile('./Database/customers.json', JSON.stringify(customers_array), cb);
    //}

    static async writeToDatabase(customers_array){
        return new Promise((resolve, reject) =>{
            fs.writeFile('./Database/customers.json', JSON.stringify(customers_array), (err)=>{
                if(err) return reject(err);
                resolve('Saved Customers!');
            });
        });
    }

    static async getCustomersFromDatabase(){
        return new Promise((resolve, reject) => {
            fs.readFile('./Database/customers.json','utf8',
            (err, contents)=>{
                if(err) return reject(err);
                const data = JSON.parse(contents);            
                resolve(data);
            })
        })
    }

    static create(obj){
        return new Customer(obj.first_name, obj.last_name, obj.email);
    }    
}