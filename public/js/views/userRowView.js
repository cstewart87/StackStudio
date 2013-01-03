/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define([
        'jquery',
        'underscore',
        'backbone'
], function( $, _, Backbone ) {
	'use strict';

	// Instance View
	// --------------

	var InstanceView = Backbone.View.extend({

		// The DOM events specific to an item.
		events: {
			'dblclick label':	'edit'
		},

		// The InstanceView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Instance** and a **InstanceView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
			this.model.on( 'change', this.render, this );
			this.model.on( 'destroy', this.remove, this );
			this.model.on( 'visible', this.toggleVisible, this );
		},

		// Re-render the titles of the instance item.
		render: function() {
			var selector_i = "#instance-table tr:nth-child(";
			var selector_n = "#instance-table tr td:contains('";
			var row = $(selector_n+this.model.get("instanceId")+"')").parent();
		    console.log("Old row:", row);
		    // if there's an existing row, update it.
		    // otherwise; create a new row.
			var added = $('#instance-table').dataTable().
				fnAddData( [
				            this.model.get("name"),
				            this.model.get("instanceId"),
				            this.model.get("keyName"),
				            this.model.get("running")
				            ]
			);
			//this.setElement( $(v[0]) );
		    console.log("Rendering an instance view:" + added[0], this.model.get("name"));
		    console.log("Rendering an instance view:", $(selector_i+(added[0]+1)+')'));
			this.setElement( $(selector_i+(added[0]+1)+')') );
			return this;
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function() {
			this.model.destroy();
		}
	});

	return InstanceView;
});
