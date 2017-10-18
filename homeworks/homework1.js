//A service where customers can make an appointment 
//and can write a feedback and rate stylists.
Customer = class{
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

}

Stylist = class{
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
   
}

Review = class{
    constructor(rating, comment, customer = "Anonymous"){
        this.customer = customer;
        this.rating = rating;
        this.comment = comment
    }

} 

Reservation = class{
    constructor(customer, datetime){
        this.customer = customer;
        this.datetime = datetime;
        this.completed = false
    }
    setCompleted(){this.completed = true;}
}


stylists = []; 
getStylistByName =name => stylists.find(function(o){return o.name == name;});

stylist1 = new Stylist('HD1', 13189, 'hairdresser');
stylist2 = new Stylist('HD2', 13189, 'hairdresser');
stylist3 = new Stylist('HD3', 13189, 'hairdresser');
stylists.push(stylist1);
stylists.push(stylist2);
stylists.push(stylist3);
customer1 = new Customer('Customer1','LastName','email@email.com');
customer2 = new Customer('Customer2','LastName1','email1@email.com');


stylist1 = getStylistByName("HD1")
customer1.writeFeedback(stylist1, 2.5, 'long waiting times');
customer1.writeFeedback(stylist1, 4.5, 'great today');
customer1.writeFeedback(stylist1, 3.5, 'ok');

console.log("There are "+stylists.length+" registered stylists.");
stylists.forEach(function(element) {
    console.log(element.name + " has "+ element.ratings.length +" ratings and avarage rating " + element.average_rating);
}, this);

date1 = new Date('2017-10-15 13:35');
customer1.requestReservation(stylist1, date1);
customer2.requestReservation(stylist1, date1);

