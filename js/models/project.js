/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define([
        'jquery',
        'backbone'
], function( $, Backbone ) {
    'use strict';

    // Project Model
    // ----------

    /**
     * Our basic **Project** model has `name`, `projectId`, `owner`, `account`
     *
     * @name Project
     * @constructor
     * @category Projects
     * @param {Object} initialization object.
     * @returns {Object} Returns a Project instance.
     */
    var Project = Backbone.Model.extend({

        /** Default attributes for the project */
        defaults: {
            id: '1234567890',
            name: 'My New Project',
            description: 'Created in StackStudio',
            owner: '',
            account: '',
            versions: [],
            members: [],
            template: {
                "AWSTemplateFormatVersion" : "2010-09-09",
                "Description" : "New template created in StackStudio.",
                "Parameters" : {},
                "Mappings": {},
                "Resources": {},
                "Outputs": {}
            }
        },

	    /**
	     * Override the base Backbone set method, for debugging.
	     *
	     * @memberOf Project
	     * @category Internal
	     * @param {Object} hash of attribute values to set.
	     * @param {Object} (optional) options to tweak (see Backbone docs).
	     */
		set: function(attributes, options) {
		    Backbone.Model.prototype.set.apply(this, arguments);
		    //console.log("Setting attributes on model:", attributes);
		},
		
		template: function() {
		    return this.get('template');
		},
		
		addResource: function(resource) {
		    if (this.template().Resources === {}) {
		        $.extend(this.template().Resources, resource);
		    }
		}

    });

    return Project;
});
