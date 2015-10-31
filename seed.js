/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

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
            cat: 'jeans',
            subCat: ['slim_jeans', 'straight_jeans']
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
