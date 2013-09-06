/**
 * @class NGN.model.Person
 * Represents a human being/actor in the ecosystem.
 * This could be a system user, customers, administrators, or any other type of person.
 *
 * **Simple Person**
 * 	var person = new NGN.model.Person({
 * 		firstname: 	'John',
 * 		lastname:	'Doe',
 * 		gender:		'm'
 * 	});
 *
 * 	console.log('Hi '+person.firstName+'!'); // --> Hi John!
 *
 * This trivial example doesn't do much, but it represents how a person can be modeled and used throughout
 * application code. Of course, this becomes more powerful when using the built-in methods or combining with
 * other NGN.model.Model objects.
 *
 * @aside guide models
 * @extends NGN.model.Model
 * @docauthor Corey Butler
 */
var Class = NGN.model.Model.extend({

	constructor: function( config ){

	  var me = this;

		config = this.prepConfig(config);
		config.type = 'Person';

		config.fields = {

			/**
       * @datafield {String[]/NGN.model.Email[]} email
       * The email account(s) associated with the person.
       */
      email: new NGN.model.data.Association({
				model: NGN.model.Email,
				cardinality: '0:N'
			}),

       /**
       * @datafield {String} [image=null]
       * Represents a profile picture. This can be a path or URL.
       */
      image: {
      	'default': config.image || null
      },

      /**
       * @datafield {String} [displayName=null]
       * The name by which the person prefers to be referred to as.
       */
      displayname: {
          'default': config.displayname || null
      },

			/**
			 * @datafield {String} [firstName=Unknown]
			 * Given name.
			 */
			firstname: {
				'default': config.firstname || 'Unknown'
			},

			/**
			 * @datafield {String} [lastName=Unknown]
			 * Surname
			 */
			lastname: {
				'default': config.lastname || 'Unknown'
			},

			/**
			 * @datafield {String} [middleName=null]
			 * Middle name.
			 */
			middlename: {
				'default': config.middlename || null
			},

			/**
			 * @datafield {String} suffix
			 * Name suffix (i.e. III)
			 */
			suffix: {
				'default': config.suffix || null
			},

			/**
			 * @datafield [gender=null]
			 * Gender of the person
			 */
			gender: {
				'default': config.gender || null,
				pattern:	/m|f/
			},

			/**
			 * @datafield [dob=null]
			 * Date of Birth
			 */
			dob: {
				'default': config.dob || null
			},

			/**
			 * @datafield {NGN.model.Login} [login=null]
			 * The login used to authenticate the user.
			 */
			login: {
				'default': config.login || null
			}
    };

    config.virtuals = {
			/**
			 * @virtual {Number} age
			 * Generated using #dob
			 * @readonly
			 */
			age: function(){
				if (!me.dob)
					return null;

				var today = new Date(),
					age = today.getFullYear() - me.dob.getFullYear(),
			    m = today.getMonth() - me.dob.getMonth();

		    if (m < 0 || (m === 0 && today.getDate() < me.dob.getDate()))
		        age--;
		    return age;
			}
		};

		Class.super.constructor.call( this, config );

		return this.EXTENDEDMODEL;

	}

});

// Create a module out of this.
module.exports = Class;
