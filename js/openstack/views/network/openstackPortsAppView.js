/*!
 * (c) Copyright 2012-2013 Transcend Computing, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        'backbone',
        'views/resource/resourceAppView',
        'text!templates/openstack/network/openstackPortAppTemplate.html',
        '/js/openstack/models/network/openstackPort.js',
        '/js/openstack/collections/network/openstackPorts.js',
        '/js/openstack/views/network/openstackPortCreateView.js',
        'icanhaz',
        'common'
], function( $, _, Backbone, AppView, openstackPortAppTemplate, Port, Ports, OpenstackPortCreateView, ich, Common ) {
	'use strict';

	// Openstack Application View
	// ------------------------------

    /**
     * Openstack AppView is UI view list of cloud items.
     *
     * @name AppView
     * @constructor
     * @category Resources
     * @param {Object} initialization object.
     * @returns {Object} Returns an OpenstackAppView instance.
     */
	var OpenstackPortsAppView = AppView.extend({
	    template: _.template(openstackPortAppTemplate),
	    
        modelStringIdentifier: "id",
        
        columns: ["name", "id", "mac_address", "status"],
        
        idColumnNumber: 1,
        
        model: Port,
        
        collectionType: Ports,
        
        type: "network",
        
        subtype: "ports",
        
        CreateView: OpenstackPortCreateView,
        
        events: {
            'click .create_button': 'createNew',
            'click #action_menu ul li': 'performAction',
            'click #resource_table tr': "clickOne"
        },

        initialize: function(options) {
            if(options.cred_id) {
                this.credentialId = options.cred_id;
            }
            if(options.region) {
                this.region = options.region;
            }
            this.render();
            
            var portApp = this;
            Common.vent.on("portAppRefresh", function() {
                portApp.render();
            });
        },
        
        toggleActions: function(e) {
            //Disable any needed actions
        },
        
        performAction: function(event) {
            var port = this.collection.get(this.selectedId);
            
            switch(event.target.text)
            {
            case "Delete Port":
                port.destroy(this.credentialId);
                break;
            }
        }
	});
    
	return OpenstackPortsAppView;
});
