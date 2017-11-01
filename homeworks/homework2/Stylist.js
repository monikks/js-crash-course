
const Reservation = require('./Reservation.js');
const fs = require('fs');

module.exports = class Stylist{
    constructor(name, location, category){
        this.name = name;
        this.location = location;
        this.category = category; 
        this.ratings = [];
        this.average_rating = 0;
        this.sum = 0;
        this.num = 0;
        this.reservations = [];
    }

    receiveFeedback(rating){
        this.ratings.push(rating);
        this.sum = this.sum+rating.rating;
        this.num = this.num+1;
        this.average_rating = this.sum/this.num;
    };
    makeReservation(customer, datetime){
        if(this.reservations.find(function(o){return o.datetime == datetime;}) == undefined){
            this.reservations.push(new Reservation(customer, datetime)); 
            return true;
         }else
            return false;  
    }
   
    static async writeToDatabase(stylists_array){
        return new Promise((resolve, reject) =>{
            fs.writeFile('./Database/stylists.json', JSON.stringify(stylists_array), (err)=>{
                if(err) return reject(err);
                resolve('saved Stylists!');
            });
        });
    }

    static async getStylistsFromDatabase(){
        return new Promise((resolve, reject) => {
            fs.readFile('./Database/stylists.json', 'utf8', (err, contents) => {
                if(err) return reject(err);
                const data = JSON.parse(contents);            
                resolve(data);
              });
            });
        }

        
    static create(obj){
        const st = new Stylist(obj.name, obj.location, obj.category);
        st.ratings = obj.ratings;
        st.average_rating = obj.average_rating;
        st.sum = obj.sum;
        st.num = obj.num;
        st.reservations = obj.reservations; 
        return st;
        
    }    
        
    


}
