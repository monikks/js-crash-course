//Stylist is a service where customers can make an appointment 
//and can write a feedback and rate the stylists.
const Stylist = require('./Stylist.js');
const Customer = require('./Customer.js');
const fs = require('fs');

const writeDatabase = async () => {
    
    const stylists = []; 
    const customers = [];
    //creating new stylists
    stylist1 = new Stylist('HD1', 13189, 'hairdresser');
    stylist2 = new Stylist('HD2', 13189, 'hairdresser');
    stylist3 = new Stylist('HD3', 13189, 'hairdresser');
    stylists.push(stylist1);
    stylists.push(stylist2);
    stylists.push(stylist3);
    //saving stylists to database
    const a = await Stylist.writeToDatabase(stylists);
    console.log(a);

    //creating new customers
    customer1 = new Customer('Customer1','LastName','email@email.com');
    customer2 = new Customer('Customer2','LastName1','email1@email.com');
    customers.push(customer1);
    customers.push(customer2);
    
    //writing customers to database
    const cust = await Customer.writeToDatabase(customers)
    console.log(cust);


}


const main = async () =>{
    writeDatabase();
    
    //getting the stylists from a database
    const stylistsFromDatabase = await Stylist.getStylistsFromDatabase();
    const loadedStylists = stylistsFromDatabase.map(stylist => Stylist.create(stylist))
    //console.log(loadedStylists);
    console.log("There are "+loadedStylists.length+" registered stylists.");
    

    //getting the customers from a database
    const customersFromDatabase = await Customer.getCustomersFromDatabase();
    const loadedCustomers = customersFromDatabase.map(customer => Customer.create(customer))
    //console.log(loadedCustomers);
    console.log("There are "+loadedCustomers.length+" registered customers.");
    
    current_customer = loadedCustomers[0];
    next_customer = loadedCustomers[1]
    selected_stylist = loadedStylists[0];
    //console.log(selected_stylist);
    current_customer.writeFeedback(selected_stylist, 2.5, 'long waiting times');
    current_customer.writeFeedback(selected_stylist, 4.5, 'great today');
    current_customer.writeFeedback(selected_stylist, 3.5, 'ok');
    
    date1 = new Date('2017-10-15 13:35');
    current_customer.requestReservation(stylist1, date1);
    next_customer.requestReservation(stylist1, date1);
}
main();
