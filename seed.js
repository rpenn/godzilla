var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
//var User = Promise.promisifyAll(mongoose.model('User'));
var Category = Promise.promisifyAll(mongoose.model('Category'));

var seedUsers = function () {

   var users = [
       {
           email: 'testing@fsa.com',
           password: 'password'
       },
       {
           email: 'obama@gmail.com',
           password: 'potus',
           group: 'admin'
       }
   ];

   return User.createAsync(users);

};

var seedCategory = function() {
   var categories = [
       {
           cat:'clothing',
           subCat:['blazers', 'casual_shirts', 'coats_jacket','jeans','suits','pants']
       },
       {
           cat: 'blazers',
           subCat: ['double_breasted_blazer', 'single_breasted_blazer', 'waistcoat']
       },
       {
           cat: 'casual_shirts',
           subCat: ['plain_shirts', 'checked_shirts', 'printed_shirts', 'striped_shirts', 'long_sleeved_shirts', 'short_sleeved_shirts']
       },
       {
           cat: 'coats_jacket',
           subCat: ['bomber_jackets', 'leather_jackets', 'winter_coats', 'raincoats', 'lightweight_jackets']
       },
       {
           cat: 'jeans',
           subCat: ['slim_jeans', 'straight_jeans']
       },
       {
           cat: 'suits',
           subCat: ['suits', 'suit_jackets', 'suit_trousers']
       },
       {
           cat: 'pants',
           subCat: ['casual_pants', 'formal_pants', 'chinos', 'cords']
       },
       {
           cat:'shoes',
           subCat: ['boat_shoes', 'boots', 'oxford_shoes', 'sandals']
       },
       {
           cat:'boots',
           subCat:['biker_boots', 'chelsea_boots', 'desert_boots', 'lace_up_boots', 'work_boots']
       },
       {
           cat: 'accessories',
           subCat: ['bags','belts', 'gloves', 'hats', 'ties', 'watches']
       },
       {
           cat: 'bags',
           subCat: ['backpacks', 'briefcases', 'holdalls', 'suit_carriers', 'totes', 'luggage']
       },
       {
           cat: 'belts',
           subCat: ['leather_belts', 'fabric_belts', 'woven_belts']
       },
       {
           cat: 'gloves',
           subCat: ['leather_gloves', 'knitted_gloves']
       },
       {
           cat: 'hats',
           subCat: ['beanies', 'caps', 'fedora', 'flat_cap']
       },
       {
           cat: 'ties',
           subCat: ['bow_ties', 'neck_ties', 'knitted_ties']
       },
       {
           cat: 'grooming',
           subCat: ['hair', 'face', 'body', 'shave']
       }
   ];

   return Category.createAsync(categories);
}

connectToDb.then(function () {
   //User.findAsync({}).then(function (users) {
   //    if (users.length === 0) {
   //        return seedUsers();
   //    } else {
   //        console.log(chalk.magenta('Seems to already be user data, exiting!'));
   //        process.kill(0);
   //    }
   //}).then(function () {
   //    console.log(chalk.green('Seed successful!'));
   //    process.kill(0);
   //}).catch(function (err) {
   //    console.error(err);
   //    process.kill(1);
   //});

   Category.findAsync({}).then(function (cats) {
       if (cats.length === 0) {
           return seedCategory();
       } else {
           console.log(chalk.magenta('Seems to already be Category data, exiting!'));
           process.kill(0);
       }
   }).then(function () {
       console.log(chalk.green('Seed successful!'));
       process.kill(0);
   }).catch(function (err) {
       console.error(err);
       process.kill(1);
   });
});