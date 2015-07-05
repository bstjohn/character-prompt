'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	//User = mongoose.model('User'),
	Category = mongoose.model('Category');

/**
 * Globals
 */
var user, category;

/**
 * Unit tests
 */
describe('Category Model Unit Tests:', function() {
	//beforeEach(function(done) {
	//	user = new User({
	//		firstName: 'Full',
	//		lastName: 'Name',
	//		displayName: 'Full Name',
	//		email: 'test@test.com',
	//		username: 'username',
	//		password: 'password'
	//	});
    //
	//	user.save(function() {
	//		category = new Category({
	//			// Add model fields
	//			// ...
	//		});
    //
	//		done();
	//	});
	//});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			var category = new Category({
				name: 'Books',
				description: 'A description of books'
			});

			category.save(function(err, saved) {
				should.not.exist(err);
				done();
			});
		});

		it('should throw validation error when name is empty', function(done) {
			var category = new Category({
				description: 'Oops! Forgot to add a name.'
			});

			category.save(function(err) {
				should.exist(err);
				err.errors.name.message.should.equal('name cannot be blank');
				done();
			});
		});

		it('should throw validation error when name longer than 15 characters', function(done) {
			var category = new Category({
				name: 'Long name! 123456789101112131415'
			});

			category.save(function(err) {
				should.exist(err);
				err.errors.name.message.should.equal('name must be 15 characters or less in length');
				done();
			});
		});

		it('should throw validation error for a duplicate category name', function(done) {
			var category = new Category({
				name: 'Books'
			});

			category.save(function(err) {
				should.not.exist(err);

				var duplicate = new Category({
					name: 'Books'
				});

				duplicate.save(function(err) {
					err.err.indexOf('$name').should.not.equal(-1);
					err.err.indexOf('duplicate key error').should.not.equal(-1);
					should.exist(err);
					done();
				});
			});
		});
	});

	afterEach(function(done) { 
		Category.remove().exec();
		//User.remove().exec();

		done();
	});
});
