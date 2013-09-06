/**
 * @class NGN.model.Email
 * Represents an email address and provides helper methods for managing it, such as
 * syntax validation.
 * @extends NGN.model.Model
 * @docauthor Corey Butler
 */
var Class = NGN.model.Model.extend({

	/**
	 * @constructor
	 */
	constructor: function( config ){
		var me = this;
		config = this.prepConfig(config);
		config.type = 'Email';
		config.idAttribute = 'address';
		config.fields = {

			/**
			 * @cfg {String} address (required)
			 * The email address (i.e. me@domain.com).
			 */
			/**
			 * @property {String} address
			 * The email address (i.e. me@domain.com).
			 */
			address: {
			    'default': 	config.address || null,
			    pattern:	NGN.pattern.email,
			    required:	true
			},

			/**
			 * @cfg {Boolean} [valid=false]
			 * Indicates the address is valid.
			 */
			/**
			 * @property {Boolean}
			 * Indicates the address is valid.
			 * @readonly
			 */
			valid: {
				'default':	NGN.coalesce(config.valid,false)
			},

			/**
			 * @property {String} [validationCode=null]
			 * The validation code assigned to this email address
	         * @readonly
			 */
			validationCode: {
                'default': 	config.validationCode || null
			},

			lastValidated: {
				'default':	config.lastValidated || null,
				type:		Date
			}
		};

		config.virtuals = {
			/**
			 * @property {Boolean}
			 * Indicates the address is valid syntax
			 * @readonly
			 */
			validSyntax: {
				enumerable:	true,
				get: function(){
					return NGN.pattern.isEmail(this.address);
				}
			}
		};

		Class.super.constructor.call( this, config );

    //return this.EXTENDEDMODEL;

	},

	/**
	 * @method
	 * Generates a validation code.
	 * @returns {String}
	 */
	createValidationCode: function() {
    this.validationCode = UTIL.uuid.v1().replace(/-/gi,'');
    return this.validationCode;
	}

});


// Create a module out of this.
module.exports = Class;
